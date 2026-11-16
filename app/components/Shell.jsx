"use client";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { reducedMotion, useReveal } from "../lib/motion";

/*
  Everything that sits around the content: the fixed 3D canvas, film grain,
  loading screen, custom cursor, smooth scrolling, and the scroll reveals.
*/

function Loader({ pctRef, ringRef, done }) {
    return (
        <div className={`loader ${done ? "is-done" : ""}`} aria-hidden="true">
            <div className="loader-ring">
                <svg viewBox="0 0 100 100">
                    <circle ref={ringRef} cx="50" cy="50" r="48" style={{ strokeDashoffset: 302 }} />
                </svg>
                <span className="logo">/adamsuvi</span>
            </div>
            <p className="loader-pct" ref={pctRef}>
                0%
            </p>
        </div>
    );
}

// Dot follows the pointer exactly, the ring trails. Over links the ring grows;
// over elements with data-cursor="Label" it fills and shows that label.
function Cursor() {
    const dot = useRef(null);
    const ring = useRef(null);
    const label = useRef(null);

    useEffect(() => {
        if (!window.matchMedia("(pointer: fine)").matches || reducedMotion()) return;
        const root = document.documentElement;
        root.classList.add("has-cursor");
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let rx = x;
        let ry = y;
        let raf = 0;
        const loop = () => {
            rx += (x - rx) * 0.16;
            ry += (y - ry) * 0.16;
            dot.current.style.transform = `translate(${x}px, ${y}px)`;
            ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
            raf = requestAnimationFrame(loop);
        };
        loop();

        const move = (e) => {
            x = e.clientX;
            y = e.clientY;
        };
        const over = (e) => {
            const el = e.target.closest?.("a, button, [data-cursor]");
            const text = el?.dataset.cursor || "";
            ring.current.classList.toggle("is-hover", !!el);
            ring.current.classList.toggle("has-label", !!text);
            label.current.textContent = text;
            // The pointer disappears into embedded documents, so hide ours there.
            root.classList.toggle("cursor-frame", !!e.target.closest?.("iframe"));
        };
        const down = () => ring.current.classList.add("is-down");
        const up = () => ring.current.classList.remove("is-down");
        const leave = () => root.classList.add("cursor-out");
        const enter = () => root.classList.remove("cursor-out");

        window.addEventListener("pointermove", move, { passive: true });
        document.addEventListener("pointerover", over);
        window.addEventListener("pointerdown", down);
        window.addEventListener("pointerup", up);
        document.addEventListener("mouseleave", leave);
        document.addEventListener("mouseenter", enter);
        return () => {
            cancelAnimationFrame(raf);
            root.classList.remove("has-cursor", "cursor-out", "cursor-frame");
            window.removeEventListener("pointermove", move);
            document.removeEventListener("pointerover", over);
            window.removeEventListener("pointerdown", down);
            window.removeEventListener("pointerup", up);
            document.removeEventListener("mouseleave", leave);
            document.removeEventListener("mouseenter", enter);
        };
    }, []);

    return (
        <>
            <div className="cursor-dot" ref={dot} aria-hidden="true" />
            <div className="cursor-ring" ref={ring} aria-hidden="true">
                <span ref={label} />
            </div>
        </>
    );
}

export default function Shell({ children }) {
    const canvas = useRef(null);
    const root = useRef(null);
    const pctRef = useRef(null);
    const ringRef = useRef(null);
    const [ready, setReady] = useState(false);

    // Build the 3D stage, and run the loading ring until it and the fonts are in.
    useEffect(() => {
        let stage;
        let cancelled = false;
        const still = reducedMotion();
        const progress = { v: 0 };
        const paint = () => {
            if (ringRef.current) ringRef.current.style.strokeDashoffset = 302 - 302 * progress.v;
            if (pctRef.current) pctRef.current.textContent = `${Math.round(progress.v * 100)}%`;
        };
        const creep = animate(progress, { v: 0.85, duration: 1400, ease: "outQuad", onUpdate: paint });

        let finished = false;
        const finish = () => {
            if (cancelled || finished) return;
            finished = true;
            creep.pause();
            if (still) {
                setReady(true);
                return;
            }
            animate(progress, {
                v: 1,
                duration: 450,
                ease: "outQuad",
                onUpdate: paint,
                onComplete: () => !cancelled && setReady(true),
            });
        };
        // Whatever happens to the 3D scene or the fonts, the page opens within a few seconds.
        const failsafe = setTimeout(() => {
            finished = true;
            if (!cancelled) setReady(true);
        }, 6000);

        Promise.all([
            import("../lib/stage")
                .then(({ Stage }) => {
                    if (!cancelled) stage = new Stage(canvas.current, { reducedMotion: still });
                })
                .catch(() => document.documentElement.classList.add("no-webgl")),
            document.fonts?.ready ?? Promise.resolve(),
            // Keep the ring up long enough to be read as a loader, not a flash.
            new Promise((resolve) => setTimeout(resolve, still ? 0 : 900)),
        ]).then(finish);

        return () => {
            cancelled = true;
            clearTimeout(failsafe);
            creep.pause();
            stage?.dispose();
        };
    }, []);

    // Smooth scrolling and the card spotlight start once the page is revealed.
    useEffect(() => {
        if (!ready) return;
        document.body.classList.add("is-ready");
        let lenis;
        let raf = 0;
        let cancelled = false;

        if (!reducedMotion()) {
            import("lenis").then(({ default: Lenis }) => {
                if (cancelled) return;
                lenis = new Lenis({ lerp: 0.09 });
                const loop = (t) => {
                    lenis.raf(t);
                    raf = requestAnimationFrame(loop);
                };
                raf = requestAnimationFrame(loop);
            });
        }

        const onClick = (e) => {
            const a = e.target.closest?.('a[href^="#"]');
            if (!a || !lenis) return;
            const target = a.getAttribute("href");
            if (target.length < 2 || !document.querySelector(target)) return;
            e.preventDefault();
            lenis.scrollTo(target, { duration: 1.4, offset: target === "#top" ? 0 : -56 });
        };
        document.addEventListener("click", onClick);

        const onMove = (e) => {
            const el = e.target.closest?.(".spot");
            if (!el) return;
            const r = el.getBoundingClientRect();
            el.style.setProperty("--mx", `${e.clientX - r.left}px`);
            el.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        document.addEventListener("pointermove", onMove, { passive: true });

        return () => {
            cancelled = true;
            cancelAnimationFrame(raf);
            lenis?.destroy();
            document.removeEventListener("click", onClick);
            document.removeEventListener("pointermove", onMove);
        };
    }, [ready]);

    useReveal(root, [ready], ready);

    return (
        <div ref={root}>
            <canvas className="webgl" ref={canvas} aria-hidden="true" />
            <div className="grain" aria-hidden="true" />
            <Loader pctRef={pctRef} ringRef={ringRef} done={ready} />
            <Cursor />
            {children}
        </div>
    );
}
