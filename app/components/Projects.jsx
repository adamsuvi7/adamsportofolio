"use client";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { tiltHandlers, useReveal } from "../lib/motion";
import { tools } from "../data/site";
import ProjectViz from "./ProjectViz";
import SectionHead from "./SectionHead";

function Project({ project, index, labels }) {
    const flip = index % 2 === 1;
    return (
        <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
            {/* Chart panel */}
            <div data-reveal={flip ? "right" : "left"} className={`md:col-span-6 ${flip ? "md:order-2" : ""}`}>
                <div {...tiltHandlers} className="tilt relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-deep-600/70 via-deep-700/70 to-deep-900 p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)] md:p-7">
                    <span className="tilt-glare pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="dotgrid-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
                    <div className="relative flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.16em] text-periwinkle-400">
                        <span>fig. 0{index + 1}</span>
                        <span className="flex gap-1.5" aria-hidden="true">
                            <i className="h-1.5 w-1.5 rounded-full bg-periwinkle-400/50" />
                            <i className="h-1.5 w-1.5 rounded-full bg-periwinkle-400/50" />
                            <i className="h-1.5 w-1.5 rounded-full bg-lavender-400" />
                        </span>
                    </div>
                    <div data-viz className="relative mt-2">
                        <ProjectViz kind={project.key} />
                    </div>
                    <p className="relative mt-1 text-sm text-periwinkle-200">{project.vizCaption}</p>
                </div>
            </div>

            {/* Copy */}
            <div className={`md:col-span-6 ${flip ? "md:order-1" : ""}`}>
                <div data-reveal="up" className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.75rem] text-periwinkle-300">
                    <span className="text-lavender-300">0{index + 1}</span>
                    <span>{project.period}</span>
                    <span className={`chip py-0.5 ${project.ongoing ? "border-lavender-400/60 text-lavender-200" : "border-white/20 text-periwinkle-200"}`}>
                        {project.ongoing && <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-lavender-300" aria-hidden="true" />}
                        {project.ongoing ? labels.ongoing : labels.done}
                    </span>
                </div>
                <h3 data-reveal="rise" className="display mt-3 text-[clamp(1.9rem,4.2vw,3rem)] text-white">
                    {project.title}
                </h3>
                <p data-reveal="up" className="mt-2 text-periwinkle-300">{project.context}</p>

                <ul data-reveal-group data-reveal-gap="90" className="mt-6 space-y-4 text-[1rem] leading-relaxed text-periwinkle-100/90">
                    {project.points.map((point, i) => (
                        <li key={i} className="relative pl-6">
                            <span className="absolute left-0 top-[0.7em] h-px w-3.5 bg-lavender-400" aria-hidden="true" />
                            {point}
                        </li>
                    ))}
                </ul>

                <div data-reveal="up" className="mt-7 flex flex-wrap items-center gap-2">
                    {project.tools?.map((key) => (
                        <span key={key} className="chip border-white/15 bg-white/[0.07] py-1.5 text-white">
                            <img src={`/logos/${tools[key].logo}.svg`} alt="" width="16" height="16" loading="lazy" className="h-4 w-4 object-contain" />
                            {tools[key].short || tools[key].name}
                        </span>
                    ))}
                    {project.tags?.map((tag) => (
                        <span key={tag} className="chip border-white/15 text-periwinkle-200">
                            {tag}
                        </span>
                    ))}
                </div>

                {project.link && (
                    <a data-reveal="up" href={project.link.href} target="_blank" rel="noopener noreferrer" className="link-arrow mt-7 text-white">
                        {project.link.label} <ArrowUpRight size={18} />
                    </a>
                )}
            </div>
        </article>
    );
}

export default function Projects() {
    const { t } = useLanguage();
    const ref = useRef(null);
    useReveal(ref, []);

    return (
        <section id="proyek" ref={ref} className="grain relative isolate z-10 -mt-10 md:-mt-16 overflow-hidden rounded-t-[2.5rem] bg-deep-900 py-24 text-white md:rounded-t-[4rem] md:py-32">
            <div className="pointer-events-none absolute -left-52 top-40 -z-10 h-[40rem] w-[40rem] rounded-full bg-lavender-600/20 blur-[120px]" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-52 bottom-60 -z-10 h-[40rem] w-[40rem] rounded-full bg-periwinkle-500/15 blur-[120px]" aria-hidden="true" />

            <div className="page">
                <SectionHead index="03" title={t.projects.title} heading={t.projects.heading} dark />

                <div className="space-y-20 md:space-y-28">
                    {t.projects.items.map((project, i) => (
                        <Project key={project.key} project={project} index={i} labels={t.projects} />
                    ))}
                </div>

                {/* Earlier work, kept as a compact index */}
                <div className="mt-24 border-t border-white/10 pt-12 md:mt-32">
                    <h3 data-reveal="fade" className="kicker text-periwinkle-400">{t.projects.archiveTitle}</h3>
                    <ul data-reveal-group data-reveal-gap="60" className="mt-4">
                        {t.projects.archive.map((item) => (
                            <li key={item.href} className="border-b border-white/10">
                                <a href={item.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-5 transition-[padding] duration-300 hover:pl-3">
                                    <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-5">
                                        <span className="font-display text-xl font-semibold text-white transition-colors group-hover:text-lavender-300 md:text-2xl">{item.title}</span>
                                        <span className="font-mono text-xs text-periwinkle-400">{item.note}</span>
                                    </span>
                                    <ArrowUpRight size={22} className="shrink-0 text-periwinkle-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lavender-300" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
