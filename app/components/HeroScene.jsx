"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { animate, stagger } from "animejs";
import { reducedMotion } from "../lib/motion";

/*
  A field of 3D bars that reshapes itself into four datasets:
  a sales trend, a Pareto curve, a normal distribution, and raw noise.
  three.js draws it; anime.js moves every bar with a grid stagger.
*/

const LOW = new THREE.Color("#6A74E6"); // periwinkle, deepened so it reads on the dark hero
const MID = new THREE.Color("#9460FF"); // electric lavender
const HIGH = new THREE.Color("#D2BBFF");
const MAX_H = 4.2;
const LIFT = 1.2; // overall height multiplier

// Deterministic pseudo-random so the "raw data" set looks the same on every visit.
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
            const x = (i / (n - 1)) * 2 - 1; // -1..1
            const z = (j / (n - 1)) * 2 - 1;
            const u = (x + 1) / 2;
            // 0 · sales trend: climbs along x with a seasonal ripple
            sets[0][k] = 0.25 + 2.5 * Math.pow(u, 1.35) + 0.38 * Math.sin(u * 9 + z * 2.2) * (0.4 + u) + noise[k] * 0.18;
            // 1 · Pareto: a few very tall bars, then a long tail
            sets[1][k] = 0.12 + 3.4 * Math.exp(-3.1 * u) * (0.72 + 0.28 * noise[k]) * (1 - 0.25 * Math.abs(z));
            // 2 · normal distribution
            sets[2][k] = 0.1 + 3.3 * Math.exp(-(x * x + z * z) / (2 * 0.36 * 0.36));
            // 3 · raw data
            sets[3][k] = 0.15 + 2.7 * Math.pow(noise[(k * 7) % (n * n)], 1.6);
        }
    }
    return sets;
}

export default function HeroScene({ activeSet = 0, onReady }) {
    const mountRef = useRef(null);
    const apiRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        } catch {
            return; // No WebGL: the CSS gradient behind the canvas is the fallback.
        }

        const still = reducedMotion();
        const small = window.matchMedia("(max-width: 767px)").matches;
        const N = small ? 14 : 20;
        const GAP = small ? 0.66 : 0.6;
        const BAR = GAP * 0.62;
        const span = (N - 1) * GAP;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);
        renderer.domElement.style.cssText = "width:100%;height:100%;display:block;touch-action:pan-y;";

        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x14123a, 34, 70);

        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 80);
        const field = new THREE.Group();
        scene.add(field);

        scene.add(new THREE.HemisphereLight(0xc7ceff, 0x14123a, 1.15));
        const key = new THREE.DirectionalLight(0xffffff, 1.7);
        key.position.set(6, 12, 5);
        scene.add(key);
        const rim = new THREE.PointLight(0x9b6cff, 60, 30, 1.8);
        rim.position.set(-6, 5, -6);
        scene.add(rim);

        // ----- bars -----
        const geo = new THREE.BoxGeometry(BAR, 1, BAR);
        geo.translate(0, 0.5, 0); // scale from the base
        const mat = new THREE.MeshStandardMaterial({ roughness: 0.32, metalness: 0.15 });
        mat.onBeforeCompile = (shader) => {
            shader.vertexShader = shader.vertexShader
                .replace("#include <common>", "#include <common>\nvarying float vBarY;")
                .replace("#include <begin_vertex>", "#include <begin_vertex>\nvBarY = position.y;");
            shader.fragmentShader = shader.fragmentShader
                .replace("#include <common>", "#include <common>\nvarying float vBarY;")
                // darker at the base, glowing toward the top
                .replace("#include <color_fragment>", "#include <color_fragment>\ndiffuseColor.rgb *= mix(0.22, 1.0, smoothstep(0.0, 1.0, vBarY));")
                .replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\ntotalEmissiveRadiance += vColor.rgb * pow(vBarY, 3.0) * 0.32;");
        };
        const mesh = new THREE.InstancedMesh(geo, mat, N * N);
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        field.add(mesh);

        // ----- floor grid -----
        const grid = new THREE.GridHelper(span + GAP * 6, N + 6, 0x8792ee, 0x3a3596);
        grid.material.transparent = true;
        grid.material.opacity = 0.28;
        grid.position.y = -0.01;
        field.add(grid);

        // ----- drifting points above the field -----
        const P = small ? 90 : 220;
        const pPos = new Float32Array(P * 3);
        const pRand = seeded(77);
        for (let i = 0; i < P; i++) {
            pPos[i * 3] = (pRand() - 0.5) * span * 1.5;
            pPos[i * 3 + 1] = 0.6 + pRand() * 6;
            pPos[i * 3 + 2] = (pRand() - 0.5) * span * 1.5;
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
        const points = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xc7ceff, size: 0.045, transparent: true, opacity: 0.7, depthWrite: false }));
        field.add(points);

        // ----- data -----
        const sets = buildDatasets(N);
        const bars = Array.from({ length: N * N }, () => ({ h: 0.02 }));
        const dummy = new THREE.Object3D();
        const color = new THREE.Color();
        let current = -1;
        let running = null;

        const morph = (index, from = "center") => {
            if (index === current) return;
            current = index;
            const target = sets[index];
            if (running) running.pause();
            if (still) {
                bars.forEach((b, k) => (b.h = target[k]));
                return;
            }
            running = animate(bars, {
                h: (_, k) => target[k],
                duration: 1300,
                ease: "outElastic(1, .62)",
                delay: stagger(small ? 14 : 9, { grid: [N, N], from }),
            });
        };

        // ----- pointer: ripple under the cursor, drag to rotate -----
        const pointer = new THREE.Vector2(2, 2);
        const raycaster = new THREE.Raycaster();
        const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const hit = new THREE.Vector3();
        const local = new THREE.Vector3(999, 0, 999);
        let hover = 0; // eased 0..1
        let hovering = false;
        let dragging = false;
        let dragX = 0;
        const baseSpin = small ? 0.5 : 0.62;
        let dragSpin = 0; // added by dragging
        let rot = baseSpin - 0.6;

        const el = renderer.domElement;
        const onMove = (e) => {
            const r = el.getBoundingClientRect();
            pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
            hovering = e.pointerType !== "touch";
            if (dragging) {
                dragSpin += (e.clientX - dragX) * 0.006;
                dragX = e.clientX;
            }
        };
        const onDown = (e) => {
            dragging = true;
            dragX = e.clientX;
            el.style.cursor = "grabbing";
        };
        const onUp = () => {
            dragging = false;
            el.style.cursor = "grab";
        };
        const onLeave = () => {
            hovering = false;
        };
        el.style.cursor = "grab";
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerdown", onDown);
        window.addEventListener("pointerup", onUp);
        el.addEventListener("pointerleave", onLeave);

        // ----- sizing -----
        const resize = () => {
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            if (!w || !h) return;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            const wide = window.matchMedia("(min-width: 1024px)").matches;
            // From 1024px up the canvas fills the hero, so shift the field to the right of the text.
            // On phones the canvas is its own band and the field sits in the middle of it.
            if (wide) {
                camera.position.set(0, 10.5, 27.5);
                camera.lookAt(0, 1.1, 0);
                camera.setViewOffset(w, h, -w * 0.2, h * 0.02, w, h);
            } else {
                camera.position.set(0, 9.5, 23);
                camera.lookAt(0, 1.4, 0);
                camera.clearViewOffset();
            }
            camera.updateProjectionMatrix();
        };
        const ro = new ResizeObserver(resize);
        ro.observe(mount);
        resize();

        // ----- loop -----
        let raf = 0;
        let visible = true;
        const clock = new THREE.Clock();

        const frame = () => {
            raf = requestAnimationFrame(frame);
            if (!visible) return;
            const t = clock.getElapsedTime();

            // Sways slowly around a good viewing angle; dragging adds to it.
            const sway = still ? 0 : 0.22 * Math.sin(t * 0.18);
            rot += (baseSpin + dragSpin + sway - rot) * 0.06;
            field.rotation.y = rot;

            hover += ((hovering ? 1 : 0) - hover) * 0.08;
            if (hovering) {
                raycaster.setFromCamera(pointer, camera);
                if (raycaster.ray.intersectPlane(ground, hit)) {
                    local.copy(hit);
                    field.worldToLocal(local);
                }
            }

            for (let i = 0; i < N; i++) {
                for (let j = 0; j < N; j++) {
                    const k = i * N + j;
                    const x = i * GAP - span / 2;
                    const z = j * GAP - span / 2;
                    let h = bars[k].h * LIFT;
                    if (!still) h *= 1 + 0.035 * Math.sin(t * 1.4 + i * 0.45 + j * 0.3);
                    if (hover > 0.01) {
                        const dx = x - local.x;
                        const dz = z - local.z;
                        h += hover * 1.25 * Math.exp(-(dx * dx + dz * dz) / 1.3);
                    }
                    h = Math.max(h, 0.02);
                    dummy.position.set(x, 0, z);
                    dummy.scale.set(1, h, 1);
                    dummy.updateMatrix();
                    mesh.setMatrixAt(k, dummy.matrix);

                    const c = Math.min(h / MAX_H, 1);
                    if (c < 0.5) color.copy(LOW).lerp(MID, c * 2);
                    else color.copy(MID).lerp(HIGH, (c - 0.5) * 2);
                    mesh.setColorAt(k, color);
                }
            }
            mesh.instanceMatrix.needsUpdate = true;
            if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

            points.rotation.y = t * 0.02;
            points.position.y = Math.sin(t * 0.4) * 0.15;

            renderer.render(scene, camera);
        };

        const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
        io.observe(mount);
        const onVis = () => {
            if (document.hidden) cancelAnimationFrame(raf);
            else {
                cancelAnimationFrame(raf);
                raf = requestAnimationFrame(frame);
            }
        };
        document.addEventListener("visibilitychange", onVis);

        apiRef.current = { morph };
        morph(activeSet, "center");
        raf = requestAnimationFrame(frame);
        onReady?.();

        return () => {
            cancelAnimationFrame(raf);
            if (running) running.pause();
            io.disconnect();
            ro.disconnect();
            document.removeEventListener("visibilitychange", onVis);
            window.removeEventListener("pointerup", onUp);
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerdown", onDown);
            el.removeEventListener("pointerleave", onLeave);
            geo.dispose();
            mat.dispose();
            pGeo.dispose();
            points.material.dispose();
            grid.geometry.dispose();
            grid.material.dispose();
            renderer.dispose();
            if (el.parentNode === mount) mount.removeChild(el);
            apiRef.current = null;
        };
        // The scene is built once; dataset changes go through apiRef below.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const origins = ["first", "last", "center", "random"];
        apiRef.current?.morph(activeSet, origins[activeSet % origins.length]);
    }, [activeSet]);

    return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
