import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { animate, stagger } from "animejs";

/*
  One 3D stage sits fixed behind the whole page. Its model is a block of data:
  a slab carrying a grid of bars. As the page scrolls, the model glides between
  the poses below (one per section marked with data-scene) and reshapes its bars
  into a different dataset. three.js renders; anime.js moves every bar.
*/

// x, y   model position          ry, rx  model rotation (radians)
// cam    camera distance         tint    0 warm/orange -> 1 cold/steel blue
// set    dataset: 0 sales trend, 1 Pareto, 2 normal distribution, 3 raw data
export const POSES = {
    hero:    { x: 1.75, y: -0.1,  ry: -0.62, rx: 0.52, cam: 7.4, tint: 0.05, set: 0 },
    profile: { x: 1.95, y: -0.25, ry: 0.4,   rx: 0.66, cam: 5.6, tint: 0.3,  set: 2 },
    work:    { x: 2.1,  y: -0.15, ry: 1.25,  rx: 0.48, cam: 6.8, tint: 0.45, set: 1 },
    apps:    { x: -3.6, y: -1.9,  ry: 1.9,   rx: 0.5,  cam: 10.5, tint: 0.2, set: 2 },
    process: { x: -2.25, y: -0.95, ry: 2.5,  rx: 0.5,  cam: 7.4, tint: 1.0,  set: 3 },
    stats:   { x: 0.0,  y: -1.45, ry: 3.9,   rx: 0.34, cam: 8.6, tint: 0.6,  set: 0 },
    cta:     { x: 1.85, y: -0.2,  ry: 5.66,  rx: 0.52, cam: 6.2, tint: 0.1,  set: 2 },
};
const KEYS = ["x", "y", "ry", "rx", "cam", "tint"];

const WARM = new THREE.Color("#ff6b1a");
const COLD = new THREE.Color("#5b9bd5");
// Bar colour by height, for the warm and the cold mood.
const RAMP = {
    warm: [new THREE.Color("#4a1c05"), new THREE.Color("#e8540c"), new THREE.Color("#ff9440")],
    cold: [new THREE.Color("#14283f"), new THREE.Color("#3f7fbf"), new THREE.Color("#8fc1ee")],
};

const damp = THREE.MathUtils.damp;
const smooth = (t) => t * t * (3 - 2 * t);
const MAX_H = 1.55;

function seeded(seed) {
    let s = seed;
    return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

function buildDatasets(n) {
    const rand = seeded(20260916);
    const noise = Array.from({ length: n * n }, () => rand());
    const sets = [[], [], [], []];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const k = i * n + j;
            const x = (i / (n - 1)) * 2 - 1;
            const z = (j / (n - 1)) * 2 - 1;
            const u = (x + 1) / 2;
            // 0 sales trend: climbs along x with a seasonal ripple
            sets[0][k] = 0.1 + 1.05 * Math.pow(u, 1.35) + 0.16 * Math.sin(u * 9 + z * 2.2) * (0.4 + u) + noise[k] * 0.08;
            // 1 Pareto: a few very tall bars, then a long tail
            sets[1][k] = 0.05 + 1.45 * Math.exp(-3.1 * u) * (0.72 + 0.28 * noise[k]) * (1 - 0.25 * Math.abs(z));
            // 2 normal distribution
            sets[2][k] = 0.04 + 1.45 * Math.exp(-(x * x + z * z) / (2 * 0.36 * 0.36));
            // 3 raw data
            sets[3][k] = 0.06 + 1.2 * Math.pow(noise[(k * 7) % (n * n)], 1.6);
        }
    }
    return sets;
}

export class Stage {
    constructor(canvas, { reducedMotion = false } = {}) {
        this.canvas = canvas;
        this.still = reducedMotion;
        this.mobile = window.innerWidth < 768;
        this.pose = { ...POSES.hero };
        this.anchors = [];
        this.mouse = new THREE.Vector2();
        this.pointer = { nx: 0, ny: 0, active: false };
        this.hover = 0;
        this.local = new THREE.Vector3(99, 0, 99);
        this.currentSet = -1;
        this.morphing = null;

        const renderer = (this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" }));
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.mobile ? 1.5 : 2));
        renderer.setClearColor(0x0b0b0e, 1);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.95;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
        this.camera.position.set(0, 0, 8);

        const pmrem = new THREE.PMREMGenerator(renderer);
        this.envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        this.scene.environment = this.envTexture;
        pmrem.dispose();

        this.initLights();
        this.initBackdrop();
        this.initModel();
        // Bloom is skipped on phones: it costs more than it adds on a small screen.
        if (!this.mobile) this.initPost();
        // Through the bloom chain the clear colour is tone-mapped like everything else,
        // so it needs this much darker value to come out as the page's #0B0B0E.
        if (this.composer) renderer.setClearColor(new THREE.Color().setRGB(0.001, 0.001, 0.00125), 1);

        this.ray = new THREE.Raycaster();
        this.lightPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -1.6);
        this.fieldPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.45);
        this.localRay = new THREE.Ray();
        this.inverse = new THREE.Matrix4();

        this.clock = new THREE.Clock();
        this.resize();
        window.addEventListener("resize", this.resize);
        window.addEventListener("pointermove", this.onPointerMove, { passive: true });
        window.addEventListener("pointerdown", this.onPointerDown, { passive: true });
        document.addEventListener("pointerleave", this.onPointerLeave);
        this.ro = new ResizeObserver(this.measure);
        this.ro.observe(document.body);
        renderer.setAnimationLoop(this.tick);
    }

    initLights() {
        this.hemi = new THREE.HemisphereLight(0x3a3a48, 0x050505, 0.55);
        this.key = new THREE.DirectionalLight(0xffe2c8, 1.5);
        this.key.position.set(3, 5, 5);
        this.rimL = new THREE.DirectionalLight(COLD, 1.5);
        this.rimL.position.set(-5, 2.5, -4);
        this.rimR = new THREE.DirectionalLight(WARM, 2.6);
        this.rimR.position.set(5, 1, -4);
        // Follows the cursor, so the visitor lights the model.
        this.cursorLight = new THREE.PointLight(0xff8a3d, 6, 6, 1.6);
        this.scene.add(this.hemi, this.key, this.rimL, this.rimR, this.cursorLight);
    }

    initBackdrop() {
        // Soft glow behind the model, tinted with the section mood.
        this.halo = new THREE.Mesh(
            new THREE.PlaneGeometry(14, 14),
            new THREE.ShaderMaterial({
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                uniforms: { uColor: { value: WARM.clone() }, uStrength: { value: 0.085 } },
                vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
                fragmentShader:
                    "uniform vec3 uColor; uniform float uStrength; varying vec2 vUv; void main(){ float d = distance(vUv, vec2(0.5)); float a = smoothstep(0.5, 0.0, d); gl_FragColor = vec4(uColor * a * a * uStrength, 1.0); }",
            })
        );
        this.halo.position.z = -4;
        this.scene.add(this.halo);

        // Drifting dust for depth.
        const count = this.mobile ? 260 : 620;
        const rand = seeded(77);
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (rand() - 0.5) * 16;
            pos[i * 3 + 1] = (rand() - 0.5) * 10;
            pos[i * 3 + 2] = (rand() - 0.5) * 8 - 1;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        this.dust = new THREE.Points(
            geo,
            new THREE.PointsMaterial({ size: 0.02, color: 0xfff1e0, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending })
        );
        this.scene.add(this.dust);
    }

    initModel() {
        const N = (this.N = this.mobile ? 12 : 16);
        const GAP = (this.GAP = 3.2 / (N - 1));
        const BAR = GAP * 0.64;
        const span = (this.span = (N - 1) * GAP);

        this.model = new THREE.Group();
        this.model.scale.setScalar(0.62);
        this.scene.add(this.model);

        // The slab the bars stand on.
        const slabSize = span + GAP * 2.2;
        const slabGeo = new THREE.BoxGeometry(slabSize, 0.18, slabSize);
        this.slab = new THREE.Mesh(slabGeo, new THREE.MeshStandardMaterial({ color: 0x17171c, roughness: 0.3, metalness: 0.75, envMapIntensity: 0.5 }));
        this.slab.position.y = -0.09;
        this.edges = new THREE.LineSegments(new THREE.EdgesGeometry(slabGeo), new THREE.LineBasicMaterial({ color: WARM.clone(), transparent: true, opacity: 0.9 }));
        this.edges.position.y = -0.09;
        this.model.add(this.slab, this.edges);

        // The bars.
        const geo = new THREE.BoxGeometry(BAR, 1, BAR);
        geo.translate(0, 0.5, 0); // scale from the base
        const mat = new THREE.MeshStandardMaterial({ roughness: 0.4, metalness: 0.15, envMapIntensity: 0.45 });
        mat.onBeforeCompile = (shader) => {
            shader.vertexShader = shader.vertexShader
                .replace("#include <common>", "#include <common>\nvarying float vBarY;")
                .replace("#include <begin_vertex>", "#include <begin_vertex>\nvBarY = position.y;");
            shader.fragmentShader = shader.fragmentShader
                .replace("#include <common>", "#include <common>\nvarying float vBarY;")
                // darker at the base, glowing toward the top
                .replace("#include <color_fragment>", "#include <color_fragment>\ndiffuseColor.rgb *= mix(0.25, 1.0, smoothstep(0.0, 1.0, vBarY));")
                .replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\ntotalEmissiveRadiance += vColor.rgb * pow(vBarY, 3.0) * 0.3;");
        };
        this.bars = new THREE.InstancedMesh(geo, mat, N * N);
        this.bars.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.bars.frustumCulled = false;
        this.model.add(this.bars);

        this.sets = buildDatasets(N);
        // h: height from the dataset, k: extra height from a click pulse
        this.state = Array.from({ length: N * N }, () => ({ h: 0.01, k: 0 }));
        this.dummy = new THREE.Object3D();
        this.color = new THREE.Color();
        this.cA = new THREE.Color();
        this.cB = new THREE.Color();
        this.morph(0, "center");
    }

    initPost() {
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.3, 0.5, 0.9);
        this.composer.addPass(this.bloom);
        this.composer.addPass(new OutputPass());
    }

    morph(index, from = "center") {
        if (index === this.currentSet) return;
        this.currentSet = index;
        const target = this.sets[index];
        if (this.morphing) this.morphing.pause();
        if (this.still) {
            this.state.forEach((b, k) => (b.h = target[k]));
            return;
        }
        this.morphing = animate(this.state, {
            h: (_, k) => target[k],
            duration: 1200,
            ease: "outElastic(1, .62)",
            delay: stagger(this.mobile ? 9 : 6, { grid: [this.N, this.N], from }),
        });
    }

    // A click sends a ripple through the bars from wherever the cursor is.
    pulse() {
        if (this.still) return;
        const { N, GAP, span, local } = this;
        const i = Math.round((local.x + span / 2) / GAP);
        const j = Math.round((local.z + span / 2) / GAP);
        const inside = i >= 0 && i < N && j >= 0 && j < N;
        animate(this.state, {
            k: [
                { to: 0.42, duration: 160, ease: "outQuad" },
                { to: 0, duration: 700, ease: "outElastic(1, .5)" },
            ],
            delay: stagger(14, { grid: [N, N], from: inside ? i * N + j : "center" }),
        });
        this.flash = 1;
    }

    onPointerMove = (e) => {
        this.pointer.nx = (e.clientX / window.innerWidth) * 2 - 1;
        this.pointer.ny = -((e.clientY / window.innerHeight) * 2 - 1);
        this.pointer.active = e.pointerType !== "touch";
    };
    onPointerDown = (e) => {
        if (e.pointerType !== "touch") this.pulse();
    };
    onPointerLeave = () => {
        this.pointer.active = false;
    };

    // Scroll positions at which each section's pose is fully reached.
    measure = () => {
        const vh = window.innerHeight;
        this.anchors = [...document.querySelectorAll("[data-scene]")]
            .map((el) => {
                const r = el.getBoundingClientRect();
                const name = el.dataset.scene;
                const pose = { ...POSES[name] };
                if (this.mobile) {
                    // Phones: centre the model and pull back; in the hero it sits below the text.
                    pose.x *= 0.12;
                    pose.cam += 3.2;
                    pose.y = name === "hero" ? -1.25 : pose.y - 0.2;
                }
                return { at: r.top + window.scrollY + r.height / 2 - vh / 2, pose };
            })
            .sort((a, b) => a.at - b.at);
    };

    sample() {
        const a = this.anchors;
        if (!a.length) return POSES.hero;
        const y = window.scrollY;
        if (y <= a[0].at) return a[0].pose;
        if (y >= a[a.length - 1].at) return a[a.length - 1].pose;
        let i = 0;
        while (y > a[i + 1].at) i++;
        const t = smooth((y - a[i].at) / (a[i + 1].at - a[i].at));
        const out = { set: t < 0.5 ? a[i].pose.set : a[i + 1].pose.set };
        for (const k of KEYS) out[k] = a[i].pose[k] + (a[i + 1].pose[k] - a[i].pose[k]) * t;
        return out;
    }

    resize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.renderer.setSize(w, h, false);
        if (this.composer) {
            this.composer.setSize(w, h);
            this.bloom.resolution.set(w, h);
        }
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.measure();
    };

    tick = () => {
        const dt = Math.min(this.clock.getDelta(), 0.05);
        const t = this.clock.elapsedTime;
        const { N, GAP, span, state, dummy, color } = this;

        const target = this.sample();
        for (const k of KEYS) this.pose[k] = this.still ? target[k] : damp(this.pose[k], target[k], 3.5, dt);
        if (target.set !== undefined) this.morph(target.set, ["first", "last", "center", "random"][target.set]);
        const p = this.pose;

        this.mouse.x = damp(this.mouse.x, this.pointer.nx, 6, dt);
        this.mouse.y = damp(this.mouse.y, this.pointer.ny, 6, dt);
        const mx = this.still ? 0 : this.mouse.x;
        const my = this.still ? 0 : this.mouse.y;

        this.model.position.set(p.x + mx * 0.12, p.y + (this.still ? 0 : Math.sin(t * 1.1) * 0.04), 0);
        this.model.rotation.set(p.rx - my * 0.07, p.ry + mx * 0.26 + (this.still ? 0 : Math.sin(t * 0.4) * 0.04), 0);
        this.model.updateMatrixWorld(true);

        this.camera.position.set(mx * 0.3, my * 0.18, p.cam);
        this.camera.lookAt(0, 0, 0);
        this.camera.updateMatrixWorld();

        // Where the cursor meets the field, in the model's own coordinates.
        this.ray.setFromCamera(this.mouse, this.camera);
        this.ray.ray.intersectPlane(this.lightPlane, this.cursorLight.position);
        this.hover = damp(this.hover, this.pointer.active ? 1 : 0, 5, dt);
        if (this.pointer.active) {
            this.inverse.copy(this.model.matrixWorld).invert();
            this.localRay.copy(this.ray.ray).applyMatrix4(this.inverse);
            const hit = this.localRay.intersectPlane(this.fieldPlane, this.local);
            if (!hit) this.local.set(99, 0, 99);
        }

        // Section mood: blend bar colours, lights, halo and slab edge.
        const tint = p.tint;
        const [wl, wm, wh] = RAMP.warm;
        const [cl, cm, ch] = RAMP.cold;
        const low = this.cA.copy(wl).lerp(cl, tint);
        const mid = this.cB.copy(wm).lerp(cm, tint);
        this.key.color.setRGB(1, 0.88 - tint * 0.06, 0.78 + tint * 0.2);
        this.rimL.intensity = 1.2 + tint * 2.6;
        this.rimR.intensity = 2.6 - tint * 2;
        this.halo.material.uniforms.uColor.value.copy(WARM).lerp(COLD, tint);
        this.halo.position.set(p.x * 0.7, p.y * 0.5 + 0.5, -4);
        this.edges.material.color.copy(WARM).lerp(COLD, tint);
        this.cursorLight.color.copy(WARM).lerp(COLD, tint * 0.7);
        this.flash = damp(this.flash || 0, 0, 3, dt);
        this.cursorLight.intensity = 6 + this.flash * 20;

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                const k = i * N + j;
                const x = i * GAP - span / 2;
                const z = j * GAP - span / 2;
                let h = state[k].h + state[k].k;
                if (!this.still) h *= 1 + 0.035 * Math.sin(t * 1.4 + i * 0.45 + j * 0.3);
                if (this.hover > 0.01) {
                    const dx = x - this.local.x;
                    const dz = z - this.local.z;
                    h += this.hover * 0.42 * Math.exp(-(dx * dx + dz * dz) / 0.22);
                }
                h = Math.max(h, 0.01);
                dummy.position.set(x, 0, z);
                dummy.scale.set(1, h, 1);
                dummy.updateMatrix();
                this.bars.setMatrixAt(k, dummy.matrix);

                const c = Math.min(h / MAX_H, 1);
                if (c < 0.5) color.copy(low).lerp(mid, c * 2);
                else color.copy(mid).lerp(wh, (c - 0.5) * 2).lerp(ch, tint * (c - 0.5) * 2);
                this.bars.setColorAt(k, color);
            }
        }
        this.bars.instanceMatrix.needsUpdate = true;
        if (this.bars.instanceColor) this.bars.instanceColor.needsUpdate = true;

        this.dust.rotation.y = t * 0.015 + mx * 0.08;
        this.dust.rotation.x = -my * 0.05;
        this.dust.position.y = (window.scrollY * 0.0008) % 2;

        if (this.composer) this.composer.render();
        else this.renderer.render(this.scene, this.camera);
    };

    dispose() {
        this.renderer.setAnimationLoop(null);
        if (this.morphing) this.morphing.pause();
        window.removeEventListener("resize", this.resize);
        window.removeEventListener("pointermove", this.onPointerMove);
        window.removeEventListener("pointerdown", this.onPointerDown);
        document.removeEventListener("pointerleave", this.onPointerLeave);
        this.ro.disconnect();
        this.scene.traverse((o) => {
            o.geometry?.dispose?.();
            const m = o.material;
            if (Array.isArray(m)) m.forEach((x) => x.dispose());
            else m?.dispose?.();
        });
        this.envTexture?.dispose();
        this.composer?.dispose?.();
        this.renderer.dispose();
    }
}
