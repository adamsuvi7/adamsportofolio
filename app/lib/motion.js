"use client";
import { useEffect } from "react";
import { animate, stagger, svg, utils } from "animejs";

export const reducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const EASE = "outExpo";

// What each reveal style does once its element scrolls into view.
const presets = {
    up: (el, delay) => animate(el, { opacity: [0, 1], y: [28, 0], duration: 900, ease: EASE, delay }),
    fade: (el, delay) => animate(el, { opacity: [0, 1], duration: 900, ease: "outQuad", delay }),
    left: (el, delay) => animate(el, { opacity: [0, 1], x: [-36, 0], duration: 1000, ease: EASE, delay }),
    right: (el, delay) => animate(el, { opacity: [0, 1], x: [36, 0], duration: 1000, ease: EASE, delay }),
    scale: (el, delay) => animate(el, { opacity: [0, 1], scale: [0.94, 1], duration: 1000, ease: EASE, delay }),
    // Heading that rises into place
    rise: (el, delay) => animate(el, { opacity: [0, 1], y: ["0.6em", 0], duration: 1100, ease: EASE, delay }),
};

function playGroup(el, delay) {
    const kids = Array.from(el.children);
    const gap = Number(el.dataset.revealGap || 70);
    kids.forEach((k) => (k.style.opacity = "0"));
    animate(kids, {
        opacity: [0, 1],
        y: [22, 0],
        scale: [0.97, 1],
        duration: 800,
        ease: EASE,
        delay: stagger(gap, { start: delay }),
    });
}

// Chart pieces inside an element marked data-viz: bars grow, lines draw, dots pop.
export function playViz(root) {
    const bars = root.querySelectorAll("[data-bar]");
    const lines = root.querySelectorAll("[data-line]");
    const dots = root.querySelectorAll("[data-dot]");
    const fades = root.querySelectorAll("[data-fade]");
    if (bars.length) {
        animate(bars, { scaleY: [0, 1], duration: 900, ease: "outElastic(1, .7)", delay: stagger(55) });
    }
    if (lines.length) {
        const drawables = svg.createDrawable(lines);
        utils.set(drawables, { draw: "0 0" });
        lines.forEach((l) => (l.style.opacity = "1"));
        animate(drawables, { draw: ["0 0", "0 1"], duration: 1600, ease: "inOutQuart", delay: stagger(220, { start: 350 }) });
    }
    if (dots.length) {
        animate(dots, { scale: [0, 1], opacity: [0, 1], duration: 600, ease: "outBack(2)", delay: stagger(110, { start: 1100 }) });
    }
    if (fades.length) {
        animate(fades, { opacity: [0, 1], duration: 700, ease: "outQuad", delay: stagger(120, { start: 900 }) });
    }
}

export function prepViz(root) {
    root.querySelectorAll("[data-bar]").forEach((b) => (b.style.transform = "scaleY(0)"));
    root.querySelectorAll("[data-dot], [data-fade], [data-line]").forEach((d) => (d.style.opacity = "0"));
}

// Heading words rise out of their clipped lines, one after another.
function playWords(el, delay) {
    const words = el.querySelectorAll(".w > span");
    words.forEach((w) => (w.style.transform = "translateY(110%)"));
    animate(words, {
        y: ["110%", "0%"],
        duration: 950,
        ease: EASE,
        delay: stagger(42, { start: delay }),
    });
}

function countUp(el) {
    const end = Number(el.dataset.count);
    const locale = document.documentElement.lang === "en" ? "en-US" : "id-ID";
    const suffix = el.dataset.suffix || "";
    const state = { v: 0 };
    animate(state, {
        v: end,
        duration: 1800,
        ease: "outExpo",
        onUpdate: () => {
            // Write into React's own text node so later re-renders still land.
            const text = Math.round(state.v).toLocaleString(locale) + suffix;
            if (el.firstChild) el.firstChild.nodeValue = text;
            else el.textContent = text;
        },
    });
}

/**
 * Wires up every [data-reveal], [data-reveal-group], [data-words], [data-viz] and [data-count]
 * under `rootRef`. Each plays once, the first time it enters the viewport.
 */
export function useReveal(rootRef, deps = [], enabled = true) {
    useEffect(() => {
        const root = rootRef.current;
        if (!root || !enabled) return;
        const nodes = root.querySelectorAll(
            "[data-reveal]:not(.is-in), [data-reveal-group]:not(.is-in), [data-viz]:not(.is-in), [data-count]:not(.is-in), [data-words]:not(.is-in)"
        );
        if (!nodes.length) return;

        if (reducedMotion() || !("IntersectionObserver" in window)) {
            nodes.forEach((n) => n.classList.add("is-in"));
            return;
        }

        nodes.forEach((n) => n.hasAttribute("data-viz") && prepViz(n));

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    io.unobserve(el);
                    const delay = Number(el.dataset.revealDelay || 0);
                    if (el.hasAttribute("data-reveal-group")) playGroup(el, delay);
                    else if (el.hasAttribute("data-reveal")) {
                        el.style.opacity = "0";
                        (presets[el.dataset.reveal] || presets.up)(el, delay);
                    }
                    if (el.hasAttribute("data-words")) playWords(el, delay);
                    if (el.hasAttribute("data-viz")) playViz(el);
                    if (el.hasAttribute("data-count")) countUp(el);
                    el.classList.add("is-in");
                });
            },
            { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
        );
        nodes.forEach((n) => io.observe(n));
        return () => io.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
