"use client";
import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { tiltHandlers, useReveal } from "../lib/motion";
import { tools } from "../data/site";
import SectionHead from "./SectionHead";

function ToolCard({ item }) {
    const tool = tools[item.tool];
    return (
        <li>
            <div {...tiltHandlers} className="tilt frost group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-5 hover:border-lavender-400 hover:shadow-lift">
                <span className="tilt-glare pointer-events-none absolute inset-0" aria-hidden="true" />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-[0_6px_16px_-8px_rgba(42,38,114,.45)] ring-1 ring-periwinkle-200 [transform:translateZ(28px)]">
                    <img src={`/logos/${tool.logo}.svg`} alt="" width="34" height="34" loading="lazy" className="h-[34px] w-[34px] object-contain" />
                </span>
                <span className="relative [transform:translateZ(16px)]">
                    <span className="block font-display text-[1.08rem] font-semibold leading-tight text-ink">{tool.name}</span>
                    <span className="mt-1.5 block text-[0.85rem] leading-snug text-ink-soft">{item.detail}</span>
                </span>
            </div>
        </li>
    );
}

export default function Skills() {
    const { t } = useLanguage();
    const ref = useRef(null);
    useReveal(ref, []);

    return (
        <section id="keahlian" ref={ref} className="relative overflow-hidden bg-gradient-to-b from-periwinkle-100 via-periwinkle-200/70 to-airy pb-36 pt-24 md:pb-48 md:pt-32">
            {/* soft lavender light behind the glass cards */}
            <div className="pointer-events-none absolute -right-40 top-20 h-[34rem] w-[34rem] rounded-full bg-lavender-400/25 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-periwinkle-400/30 blur-3xl" aria-hidden="true" />

            <div className="page relative">
                <SectionHead index="02" title={t.skills.title} heading={t.skills.heading}>
                    <p className="text-[0.98rem] leading-relaxed">{t.skills.intro}</p>
                </SectionHead>

                <div className="space-y-10">
                    {t.skills.groups.map((group, g) => (
                        <div key={g} className="grid gap-4 md:grid-cols-12 md:gap-8">
                            <h3 data-reveal="left" className="md:col-span-3">
                                <span className="font-mono text-xs text-lavender-700">{String.fromCharCode(65 + g)}</span>
                                <span className="display mt-1 block text-2xl text-ink">{group.name}</span>
                            </h3>
                            <ul data-reveal-group data-reveal-gap="60" className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:col-span-9 md:gap-4">
                                {group.items.map((item) => (
                                    <ToolCard key={item.tool} item={item} />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 grid gap-8 border-t border-deep/10 pt-12 md:grid-cols-12">
                    <div className="md:col-span-8">
                        <h3 data-reveal="fade" className="kicker text-ink-faint">{t.skills.methodsTitle}</h3>
                        <ul data-reveal-group data-reveal-gap="28" className="mt-5 flex flex-wrap gap-2">
                            {t.skills.methods.map((m) => (
                                <li key={m} className="chip border-deep/10 bg-white/70 text-ink transition-colors hover:border-lavender-500 hover:bg-lavender-500 hover:text-white">
                                    {m}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:col-span-4">
                        <h3 data-reveal="fade" className="kicker text-ink-faint">{t.skills.languagesTitle}</h3>
                        <ul data-reveal-group className="mt-5 space-y-3">
                            {t.skills.languages.map((l) => (
                                <li key={l.name} className="frost rounded-xl px-4 py-3">
                                    <span className="block font-semibold text-ink">{l.name}</span>
                                    <span className="block text-sm text-ink-soft">{l.level}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
