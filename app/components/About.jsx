"use client";
import { useEffect, useRef } from "react";
import { animate, onScroll } from "animejs";
import { useLanguage } from "../context/LanguageContext";
import { reducedMotion, useReveal } from "../lib/motion";
import SectionHead from "./SectionHead";

export default function About() {
    const { t } = useLanguage();
    const ref = useRef(null);
    useReveal(ref, []);

    // Scroll-linked parallax: the portrait and the dot grid behind it move at different speeds.
    useEffect(() => {
        const root = ref.current;
        if (!root || reducedMotion()) return;
        const figure = root.querySelector("[data-portrait]");
        const scroll = () => onScroll({ target: figure, enter: "bottom top", leave: "top bottom", sync: true });
        const a = animate(root.querySelector("[data-portrait-img]"), { y: ["-4%", "4%"], scale: [1.1, 1.1], ease: "linear", autoplay: scroll() });
        const b = animate(root.querySelector("[data-portrait-grid]"), { y: [40, -40], ease: "linear", autoplay: scroll() });
        return () => {
            a.revert();
            b.revert();
        };
    }, []);

    return (
        <section id="profil" ref={ref} className="relative py-24 md:py-32">
            <div className="page">
                <SectionHead index="01" title={t.about.title} heading={t.about.heading} />

                <div className="grid gap-12 md:grid-cols-12 md:gap-10">
                    {/* Portrait */}
                    <div className="md:col-span-5">
                        <figure data-reveal="scale" data-portrait className="relative mx-auto max-w-sm md:max-w-none">
                            <div data-portrait-grid className="dotgrid absolute -inset-x-5 -bottom-5 top-10 rounded-[2rem]" aria-hidden="true" />
                            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-deep-700 via-deep-800 to-deep-950 shadow-lift">
                                <div className="absolute inset-0 bg-[radial-gradient(28rem_22rem_at_70%_15%,rgba(155,108,255,.55),transparent_65%)]" aria-hidden="true" />
                                <img src="/img/adam-portrait.webp" alt={t.about.portraitAlt} width="819" height="1024" loading="lazy" data-portrait-img className="relative block aspect-[4/5] w-full object-cover object-top" />
                                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-deep-950 via-deep-950/70 to-transparent p-6 pt-16 text-white">
                                    <span>
                                        <span className="display block text-2xl">Adam Suvi</span>
                                        <span className="font-mono text-xs text-periwinkle-300">S.Si., C.DA</span>
                                    </span>
                                    <span className="rounded-full bg-lavender-500 px-3 py-1 font-mono text-[0.7rem] font-semibold uppercase tracking-wider">Data Analyst</span>
                                </figcaption>
                            </div>
                        </figure>
                    </div>

                    {/* Copy */}
                    <div className="md:col-span-7 md:pl-6">
                        <div className="space-y-5 text-[1.08rem] leading-[1.75] text-ink-soft">
                            {t.about.paragraphs.map((p, i) => (
                                <p key={i} data-reveal="up" data-reveal-delay={i * 90} className={i === 0 ? "text-[1.3rem] leading-[1.55] text-ink md:text-[1.45rem]" : ""}>
                                    {p}
                                </p>
                            ))}
                        </div>

                        <dl data-reveal-group className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-periwinkle-300/70 bg-periwinkle-300/70 sm:grid-cols-2">
                            {t.about.facts.map((f) => (
                                <div key={f.k} className="bg-airy-50 p-5">
                                    <dt className="kicker text-ink-faint">{f.k}</dt>
                                    <dd className="mt-1.5 font-semibold text-ink">{f.v}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}
