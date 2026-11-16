"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { animate, createTimeline, onScroll, stagger } from "animejs";
import { ArrowUpRight, Download } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { reducedMotion, useReveal } from "../lib/motion";
import { site } from "../data/site";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const NAME = ["Adam", "Suvi"];
const CYCLE_MS = 6500;

export default function Hero() {
    const { t, language } = useLanguage();
    const rootRef = useRef(null);
    const labelRef = useRef(null);
    const [activeSet, setActiveSet] = useState(0);
    const [auto, setAuto] = useState(true);

    useReveal(rootRef, []);

    // Entrance: the name drops in letter by letter, then the rest follows.
    useEffect(() => {
        const root = rootRef.current;
        if (!root || reducedMotion()) return;
        const tl = createTimeline({ defaults: { ease: "outExpo" } });
        tl.add(root.querySelectorAll(".hero-name .ch"), {
            y: ["110%", "0%"],
            rotate: [8, 0],
            duration: 1100,
            delay: stagger(55),
        })
            .add(root.querySelectorAll("[data-hero-in]"), { opacity: [0, 1], y: [24, 0], duration: 900, delay: stagger(90) }, "-=750")
            .add(root.querySelectorAll("[data-hero-line]"), { scaleX: [0, 1], duration: 1200 }, "-=900");
        // Scroll-linked: the text column drifts up and dims as the hero leaves the screen.
        const drift = animate(root.querySelector("[data-hero-copy]"), {
            y: [0, -90],
            opacity: [1, 0.15],
            ease: "linear",
            autoplay: onScroll({ target: root, enter: "top top", leave: "top bottom", sync: true }),
        });
        return () => {
            tl.pause();
            drift.revert();
        };
    }, []);

    // The chart cycles through its datasets until the visitor picks one.
    useEffect(() => {
        if (!auto || reducedMotion()) return;
        const id = window.setInterval(() => setActiveSet((s) => (s + 1) % 4), CYCLE_MS);
        return () => window.clearInterval(id);
    }, [auto]);

    // Dataset label slides when it changes.
    useEffect(() => {
        const el = labelRef.current;
        if (!el || reducedMotion()) return;
        animate(el, { opacity: [0, 1], y: [10, 0], duration: 500, ease: "outQuad" });
    }, [activeSet, language]);

    const pick = (i) => {
        setAuto(false);
        setActiveSet(i);
    };

    return (
        <section id="top" ref={rootRef} className="hero grain relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white">
            <div className="page pointer-events-none relative z-10 flex flex-col pt-[calc(var(--nav-h)+2.5rem)] lg:flex-1 lg:justify-center lg:pb-10 lg:pt-[var(--nav-h)]">
                <div data-hero-copy className="max-w-[40rem]">
                    <p data-hero-in className="kicker flex items-center gap-3 text-periwinkle-300">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lavender-400 opacity-70" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-lavender-400" />
                        </span>
                        {t.hero.eyebrow}
                    </p>

                    <h1 className="hero-name display mt-5 text-[clamp(4rem,17vw,10.5rem)] leading-[0.86]" aria-label="Adam Suvi">
                        {NAME.map((word, w) => (
                            <span key={word} className="block overflow-hidden pb-[0.08em]" aria-hidden="true">
                                {word.split("").map((ch, i) => (
                                    <span key={i} className={`ch ${w === 1 ? "text-lavender-300" : ""}`}>
                                        {ch}
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <p data-hero-in className="mt-6 max-w-[34rem] text-[1.05rem] leading-relaxed text-periwinkle-100/90 md:text-lg">
                        {t.hero.lede}
                    </p>

                    <div data-hero-in className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
                        <a href="#proyek" className="btn btn-primary">
                            {t.hero.ctaProjects} <ArrowUpRight size={18} />
                        </a>
                        <a href={site.cv} download className="btn btn-ghost-dark">
                            {t.hero.ctaCv} <Download size={17} />
                        </a>
                    </div>

                    <p data-hero-in className="mt-6 font-mono text-[0.78rem] tracking-wide text-periwinkle-300/80">
                        {t.hero.certified}
                    </p>
                </div>
            </div>

            {/* The 3D chart: its own band on phones and tablets, the full backdrop on wider screens */}
            <div className="relative z-0 -mt-4 min-h-[21rem] flex-1 md:min-h-[26rem] lg:absolute lg:inset-0 lg:mt-0 lg:min-h-0">
                <HeroScene activeSet={activeSet} />
                {/* keeps the text column readable where the chart runs behind it */}
                <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-deep-950/80 via-deep-950/25 to-transparent lg:block" />
            </div>

            {/* Chart control */}
            <div className="page pointer-events-none relative z-10 -mt-[4.5rem] flex justify-end pb-4 lg:absolute lg:inset-x-0 lg:bottom-[8.5rem] lg:mt-0">
                <div data-hero-in className="pointer-events-auto w-full rounded-2xl border border-white/15 bg-deep-900/55 p-3 backdrop-blur-md sm:max-w-[19rem]">
                    <div className="flex items-baseline justify-between gap-3 px-1">
                        <span className="kicker text-periwinkle-400">{t.hero.scene.label}</span>
                        <span className="font-mono text-[0.72rem] text-periwinkle-400">0{activeSet + 1} / 04</span>
                    </div>
                    <p ref={labelRef} className="display mt-1 px-1 text-xl text-white">
                        {t.hero.scene.sets[activeSet]}
                    </p>
                    <div className="mt-3 grid grid-cols-4 gap-1.5" role="group" aria-label={t.hero.scene.label}>
                        {t.hero.scene.sets.map((name, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => pick(i)}
                                aria-label={name}
                                aria-pressed={activeSet === i}
                                className="group h-7 rounded-lg px-1"
                            >
                                <span className={`block h-1.5 rounded-full transition-colors ${activeSet === i ? "bg-lavender-400" : "bg-white/20 group-hover:bg-white/45"}`} />
                            </button>
                        ))}
                    </div>
                    <p className="hidden px-1 text-[0.72rem] leading-snug text-periwinkle-300/70 lg:block">{t.hero.scene.hint}</p>
                </div>
            </div>

            {/* Figures from the CV */}
            <div className="relative z-10 border-t border-white/10 bg-deep-950/45 backdrop-blur-md">
                <span data-hero-line className="absolute inset-x-0 top-0 block h-px origin-left bg-gradient-to-r from-lavender-500 via-periwinkle-300 to-transparent" />
                <dl className="page grid grid-cols-2 gap-x-6 gap-y-5 py-6 md:grid-cols-4 md:py-7">
                    {t.hero.stats.map((s, i) => (
                        <div key={i} className="flex flex-col-reverse gap-1">
                            <dt className="text-[0.82rem] leading-snug text-periwinkle-300/85">{s.label}</dt>
                            <dd className="display text-[2rem] tabular-nums text-white md:text-[2.6rem]" data-count={s.value} data-suffix={s.suffix}>
                                {s.value.toLocaleString(language === "en" ? "en-US" : "id-ID") + s.suffix}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>

        </section>
    );
}
