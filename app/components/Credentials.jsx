"use client";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { ArrowUpRight, ChevronDown, RotateCw } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { reducedMotion, useReveal } from "../lib/motion";
import { courseCertificates, links } from "../data/site";
import SectionHead from "./SectionHead";

const PREVIEW = 6;

export default function Credentials() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const [flipped, setFlipped] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const galleryRef = useRef(null);
    useReveal(ref, []);

    // Cards added by "show all" fade in as a staggered batch.
    useEffect(() => {
        if (!showAll || !galleryRef.current || reducedMotion()) return;
        const added = Array.from(galleryRef.current.children).slice(PREVIEW);
        animate(added, { opacity: [0, 1], y: [24, 0], duration: 700, ease: "outExpo", delay: stagger(45) });
    }, [showAll]);
    const c = t.credentials;
    const visible = showAll ? courseCertificates : courseCertificates.slice(0, PREVIEW);

    return (
        <section id="kredensial" ref={ref} className="relative overflow-hidden bg-gradient-to-b from-airy via-periwinkle-100 to-periwinkle-200/80 pb-36 pt-24 md:pb-48 md:pt-32">
            <div className="pointer-events-none absolute -left-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-lavender-400/20 blur-3xl" aria-hidden="true" />
            <div className="page relative">
                <SectionHead index="05" title={c.title} heading={c.heading} />

                {/* BNSP: the headline credential */}
                <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
                    <div data-reveal="scale" className="md:col-span-5">
                        <button
                            type="button"
                            onClick={() => setFlipped((f) => !f)}
                            data-flipped={flipped}
                            aria-label={c.bnsp.flip}
                            aria-pressed={flipped}
                            className="flip group relative mx-auto block w-full max-w-[22rem]"
                        >
                            <span className="absolute inset-6 rounded-3xl bg-lavender-500/40 blur-3xl transition-opacity group-hover:opacity-80" aria-hidden="true" />
                            <span className="flip-inner relative block aspect-[724/1024]">
                                <img src="/img/bnsp-front.webp" alt={c.bnsp.front} width="724" height="1024" loading="lazy" className="flip-face absolute inset-0 h-full w-full rounded-2xl border border-white object-cover shadow-lift" />
                                <img src="/img/bnsp-back.webp" alt={c.bnsp.back} width="724" height="1024" loading="lazy" className="flip-face flip-back absolute inset-0 h-full w-full rounded-2xl border border-white object-cover shadow-lift" />
                            </span>
                            <span className="relative mt-4 flex items-center justify-center gap-2 font-mono text-[0.75rem] text-ink-soft">
                                <RotateCw size={14} className="transition-transform duration-500 group-hover:rotate-180" /> {c.bnsp.flip}
                            </span>
                        </button>
                    </div>

                    <div className="md:col-span-7">
                        <p data-reveal="fade" className="kicker text-lavender-700">{c.bnsp.kicker}</p>
                        <h3 data-reveal="rise" className="display mt-3 text-[clamp(2rem,4.6vw,3.4rem)] text-ink">{c.bnsp.title}</h3>
                        <div data-reveal="up" className="frost mt-6 flex items-center gap-4 rounded-2xl p-4">
                            <img src="/img/logo-bnsp.webp" alt="" width="320" height="240" loading="lazy" className="h-12 w-auto" />
                            <div>
                                <p className="font-semibold text-ink">{c.bnsp.issuer}</p>
                                <p className="font-mono text-[0.78rem] text-lavender-700">{c.bnsp.validity}</p>
                            </div>
                        </div>
                        <p data-reveal="up" className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">{c.bnsp.text}</p>
                        <a data-reveal="up" href={links.certBnsp} target="_blank" rel="noopener noreferrer" className="link-arrow mt-6 text-ink">
                            {c.bnsp.link} <ArrowUpRight size={18} />
                        </a>
                    </div>
                </div>

                {/* Education + certifications */}
                <div className="mt-20 grid gap-6 md:mt-24 md:grid-cols-12">
                    <div data-reveal="up" className="frost rounded-[1.75rem] p-7 md:col-span-5 md:p-8">
                        <h3 className="kicker text-ink-faint">{c.eduTitle}</h3>
                        <div className="mt-6 flex items-start gap-4">
                            <img src="/img/unand.webp" alt="" width="160" height="195" loading="lazy" className="h-16 w-auto shrink-0" />
                            <div>
                                <p className="display text-[1.7rem] text-ink">{c.education.degree}</p>
                                <p className="mt-1 font-semibold text-ink-soft">{c.education.school}</p>
                            </div>
                        </div>
                        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-periwinkle-300/70 text-sm">
                            <div className="bg-white/80 p-4">
                                <dt className="sr-only">Period</dt>
                                <dd className="font-mono text-[0.8rem] text-ink">{c.education.period}</dd>
                            </div>
                            <div className="bg-white/80 p-4">
                                <dt className="sr-only">GPA</dt>
                                <dd className="font-mono text-[0.8rem] font-semibold text-lavender-700">{c.education.gpa}</dd>
                            </div>
                        </dl>
                        <p className="kicker mt-6 text-ink-faint">{c.education.courseworkLabel}</p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {c.education.coursework.map((course) => (
                                <li key={course} className="chip border-deep/10 bg-white/70 text-ink">{course}</li>
                            ))}
                        </ul>
                        <p className="kicker mt-6 text-ink-faint">{c.education.thesisLabel}</p>
                        <p className="mt-2 italic leading-snug text-ink-soft">{c.education.thesis}</p>
                    </div>

                    <div className="md:col-span-7">
                        <h3 data-reveal="fade" className="kicker px-1 text-ink-faint">{c.certTitle}</h3>
                        <ul data-reveal-group data-reveal-gap="90" className="mt-4 space-y-3">
                            {c.certs.map((cert) => {
                                const Tag = cert.href ? "a" : "div";
                                const linkProps = cert.href ? { href: cert.href, target: "_blank", rel: "noopener noreferrer" } : {};
                                return (
                                    <li key={cert.title}>
                                        <Tag {...linkProps} className={`frost group flex items-center gap-4 rounded-2xl p-4 md:p-5 ${cert.href ? "transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-lavender-400 hover:shadow-lift" : ""}`}>
                                            <span className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-white p-2 ring-1 ring-periwinkle-200">
                                                {cert.logo ? (
                                                    <img src={cert.logo} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
                                                ) : (
                                                    <span className="font-mono text-[0.7rem] font-semibold text-lavender-700">TOEFL</span>
                                                )}
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block font-display text-[1.08rem] font-semibold leading-tight text-ink">{cert.title}</span>
                                                <span className="mt-1 block text-sm text-ink-soft">
                                                    {cert.issuer}
                                                    {cert.note && <span className="font-semibold text-lavender-700"> · {cert.note}</span>}
                                                </span>
                                            </span>
                                            <span className="shrink-0 text-right font-mono text-[0.75rem] text-ink-faint">
                                                {cert.date}
                                                {cert.href && <ArrowUpRight size={16} className="ml-auto mt-1 text-lavender-700 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                                            </span>
                                        </Tag>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Course certificates */}
                <div className="mt-20 md:mt-24">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <h3 data-reveal="fade" className="kicker text-ink-faint">{c.galleryTitle}</h3>
                            <p data-reveal="up" className="display mt-2 max-w-xl text-2xl text-ink md:text-3xl">{c.galleryIntro}</p>
                        </div>
                    </div>
                    <ul ref={galleryRef} data-reveal-group data-reveal-gap="50" className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
                        {visible.map((cert) => (
                            <li key={cert.file}>
                                <a href={`/certificates/${encodeURIComponent(cert.file)}`} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-frost transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-lavender-400 hover:shadow-lift">
                                    <span className="block overflow-hidden bg-white">
                                        <img src={`/certificates/thumbs/${cert.thumb}.webp`} alt="" width="550" height="425" loading="lazy" className="aspect-[550/425] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                                    </span>
                                    <span className="block p-3 md:p-4">
                                        <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-lavender-700">{cert.by}</span>
                                        <span className="mt-1 block text-[0.86rem] font-semibold leading-snug text-ink md:text-[0.95rem]">{cert.title}</span>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 flex justify-center">
                        <button type="button" onClick={() => setShowAll((s) => !s)} aria-expanded={showAll} className="btn btn-ghost bg-white/60">
                            {showAll ? c.showLess : c.showAll}
                            <ChevronDown size={18} className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
