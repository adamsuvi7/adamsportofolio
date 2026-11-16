"use client";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useReveal } from "../lib/motion";
import SectionHead from "./SectionHead";

export default function Experience() {
    const { t } = useLanguage();
    const ref = useRef(null);
    useReveal(ref, []);
    const x = t.experience;

    return (
        <section id="pengalaman" ref={ref} className="relative -mt-px bg-airy py-24 md:py-32">
            <div className="page">
                <SectionHead index="04" title={x.title} heading={x.heading} />

                {/* Work */}
                <h3 data-reveal="fade" className="kicker text-ink-faint">{x.workTitle}</h3>
                <ol className="relative mt-6">
                    <span className="absolute bottom-3 left-[7px] top-3 w-px bg-gradient-to-b from-lavender-500 via-periwinkle-400 to-transparent md:left-[calc(25%+7px)]" aria-hidden="true" />
                    {x.jobs.map((job, i) => (
                        <li key={i} className="relative grid gap-3 pb-12 pl-9 last:pb-0 md:grid-cols-4 md:gap-0 md:pl-0">
                            <p data-reveal="left" className="font-mono text-[0.8rem] text-lavender-700 md:pr-8 md:pt-1 md:text-right">{job.period}</p>
                            <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-[3px] border-airy bg-lavender-500 shadow-[0_0_0_4px_rgba(155,108,255,.22)] md:left-1/4" aria-hidden="true" />
                            <div data-reveal="up" className="md:col-span-3 md:pl-12">
                                <h4 className="display text-[1.6rem] text-ink md:text-[2rem]">{job.role}</h4>
                                <p className="mt-1 font-semibold text-ink-soft">{job.org}</p>
                                <ul className="mt-4 space-y-3 leading-relaxed text-ink-soft">
                                    {job.points.map((point, k) => (
                                        <li key={k} className="relative pl-6">
                                            <span className="absolute left-0 top-[0.7em] h-px w-3.5 bg-lavender-500" aria-hidden="true" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                                {job.links && (
                                    <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                                        {job.links.map((l) => (
                                            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-arrow text-ink">
                                                {l.label} <ArrowUpRight size={17} />
                                            </a>
                                        ))}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ol>

                {/* Leadership */}
                <h3 data-reveal="fade" className="kicker mt-20 text-ink-faint md:mt-24">{x.leadTitle}</h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {x.leadership.map((item, i) => (
                        <article key={i} data-reveal="up" data-reveal-delay={i * 120} className="group overflow-hidden rounded-[1.75rem] border border-periwinkle-300/70 bg-airy-50 shadow-frost">
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img src={item.image} alt={item.alt} loading="lazy" width="1000" height="666" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-950/75 via-deep-950/10 to-transparent" aria-hidden="true" />
                                <p className="absolute bottom-4 left-5 font-mono text-[0.75rem] text-white">{item.period}</p>
                            </div>
                            <div className="p-6 md:p-7">
                                <h4 className="display text-[1.6rem] text-ink">{item.role}</h4>
                                <p className="mt-1 font-semibold text-lavender-700">{item.org}</p>
                                <p className="mt-4 leading-relaxed text-ink-soft">{item.text}</p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Other activities */}
                <h3 data-reveal="fade" className="kicker mt-14 text-ink-faint">{x.moreTitle}</h3>
                <ul data-reveal-group data-reveal-gap="100" className="mt-6 grid gap-4 sm:grid-cols-3">
                    {x.more.map((item, i) => (
                        <li key={i} className="flex gap-4 rounded-2xl border border-periwinkle-300/70 bg-airy-50 p-3 sm:flex-col sm:gap-0 sm:p-0 sm:overflow-hidden">
                            <img src={item.image} alt={item.alt} loading="lazy" width="1000" height="666" className="h-20 w-24 shrink-0 rounded-xl object-cover sm:h-36 sm:w-full sm:rounded-none" />
                            <div className="sm:p-5">
                                <h4 className="font-display text-[1.05rem] font-semibold leading-tight text-ink">{item.role}</h4>
                                <p className="mt-1.5 text-sm leading-snug text-ink-soft">{item.text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
