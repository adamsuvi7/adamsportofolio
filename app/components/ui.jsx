"use client";
import { useEffect, useRef } from "react";
import { reducedMotion } from "../lib/motion";

/** Text split into words; each word rises into place when the parent [data-words] is revealed. */
export const Words = ({ text }) =>
    text.split(" ").map((word, i) => (
        <span key={i}>
            <span className="w">
                <span>{word}</span>
            </span>{" "}
        </span>
    ));

/** Pulls its child a little toward the cursor. */
export function Magnetic({ children, strength = 0.3 }) {
    const ref = useRef(null);
    const move = (e) => {
        if (e.pointerType === "touch" || reducedMotion()) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    const leave = () => (ref.current.style.transform = "");
    return (
        <span className="magnetic" ref={ref} onPointerMove={move} onPointerLeave={leave}>
            {children}
        </span>
    );
}

const Arrow = ({ down }) => (
    <svg viewBox="0 0 16 16" aria-hidden="true" style={down ? { rotate: "90deg" } : undefined}>
        <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
);

export function Button({ children, variant = "light", href, down = false, ...rest }) {
    return (
        <Magnetic>
            <a className={`btn btn-${variant}`} href={href} {...rest}>
                <span>{children}</span>
                <i className="btn-arrow">
                    <Arrow down={down} />
                    <Arrow down={down} />
                </i>
            </a>
        </Magnetic>
    );
}

export const Label = ({ children }) => (
    <p className="label" data-reveal="fade">
        {children}
    </p>
);

/** Words light up one by one as the block scrolls through the viewport. */
export function ScrollText({ text }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        const words = [...el.querySelectorAll("span")];
        if (reducedMotion()) {
            words.forEach((w) => (w.style.opacity = 1));
            return;
        }
        const onScroll = () => {
            const r = el.getBoundingClientRect();
            const vh = window.innerHeight;
            const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
            const lit = p * words.length;
            words.forEach((w, i) => (w.style.opacity = 0.16 + Math.min(1, Math.max(0, lit - i)) * 0.84));
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [text]);
    return (
        <p className="scroll-text" ref={ref}>
            {text.split(" ").map((word, i) => (
                <span key={i}>{word} </span>
            ))}
        </p>
    );
}
