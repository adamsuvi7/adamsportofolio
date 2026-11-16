"use client";
import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useReveal } from "../lib/motion";
import { site } from "../data/site";
import { brandPaths } from "../data/brandPaths";

const Brand = ({ name }) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d={brandPaths[name]} />
    </svg>
);

export default function Contact() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const [copied, setCopied] = useState(false);
    useReveal(ref, []);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(site.email);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {}
    };

    const channels = [
        { icon: "whatsapp", name: "WhatsApp", label: site.phoneDisplay, href: site.whatsapp },
        { icon: "linkedin", name: "LinkedIn", label: site.linkedinLabel, href: site.linkedin },
        { icon: "github", name: "GitHub", label: site.githubLabel, href: site.github },
        { icon: "instagram", name: "Instagram", label: site.instagramLabel, href: site.instagram },
    ];

    return (
        <section id="kontak" ref={ref} className="hero grain relative isolate z-10 -mt-10 md:-mt-16 overflow-hidden rounded-t-[2.5rem] pt-24 text-white md:rounded-t-[4rem] md:pt-32">
            <div className="page">
                <div className="grid gap-10 md:grid-cols-12">
                    <div className="pb-16 md:col-span-8 md:pb-28">
                        <p data-reveal="fade" className="kicker flex items-center gap-3 text-lavender-300">
                            <span>06</span>
                            <span className="h-px w-10 bg-lavender-300/50" aria-hidden="true" />
                            <span>{t.contact.title}</span>
                        </p>
                        <h2 data-reveal="rise" className="display mt-4 text-[clamp(2.6rem,8vw,6rem)] leading-[0.95]">
                            {t.contact.heading}
                        </h2>
                        <p data-reveal="up" className="mt-6 max-w-xl text-lg leading-relaxed text-periwinkle-100/90">{t.contact.text}</p>

                        {/* Email, the main call to action */}
                        <div data-reveal="up" className="mt-10">
                            <p className="kicker text-periwinkle-400">{t.contact.emailLabel}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
                                <a href={`mailto:${site.email}`} className="display break-all text-[clamp(1.5rem,5vw,3.1rem)] text-white underline decoration-lavender-500 decoration-[3px] underline-offset-[0.18em] transition-colors hover:text-lavender-300">
                                    {site.email}
                                </a>
                                <button type="button" onClick={copyEmail} className="chip border-white/25 py-2 text-white transition-colors hover:border-white/60 hover:bg-white/10" aria-live="polite">
                                    {copied ? <Check size={15} /> : <Copy size={15} />}
                                    {copied ? t.contact.copied : t.contact.copy}
                                </button>
                            </div>
                        </div>

                        <ul data-reveal-group data-reveal-gap="80" className="mt-12 grid gap-3 sm:grid-cols-2">
                            {channels.map((ch) => (
                                <li key={ch.name}>
                                    <a href={ch.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.06] p-4 backdrop-blur-sm transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-lavender-400/70 hover:bg-white/[0.11]">
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lavender-500/25 text-lavender-200 transition-colors group-hover:bg-lavender-500 group-hover:text-white">
                                            <Brand name={ch.icon} />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block font-mono text-[0.7rem] uppercase tracking-wider text-periwinkle-400">{ch.name}</span>
                                            <span className="block truncate font-semibold text-white">{ch.label}</span>
                                        </span>
                                        <ArrowUpRight size={18} className="shrink-0 text-periwinkle-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div data-reveal="up" className="relative hidden self-end md:col-span-4 md:block">
                        <div className="absolute inset-x-4 bottom-0 top-1/4 rounded-t-full bg-lavender-500/30 blur-2xl" aria-hidden="true" />
                        <img src="/img/adam-suit.webp" alt={t.contact.portraitAlt} width="819" height="1024" loading="lazy" className="relative block w-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}
