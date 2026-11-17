"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { site } from "../data/site";
import { brandPaths } from "../data/brandPaths";
import { Label, Words } from "./ui";

const Brand = ({ name }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={brandPaths[name]} />
    </svg>
);

export default function Contact() {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);

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
        <section id="kontak" className="dark cta" data-scene="cta">
            <div className="container">
                <Label>{t.contact.title}</Label>
                <h2 className="cta-title" data-words>
                    <Words text={t.contact.heading} />
                </h2>
                <p className="cta-text" data-reveal="up">
                    {t.contact.text}
                </p>
                <div className="cta-mail" data-reveal="up">
                    <a href={`mailto:${site.email}`} data-cursor="Email">
                        {site.email}
                    </a>
                    <button type="button" className="chip copy-btn" onClick={copyEmail} aria-live="polite">
                        {copied ? <Check size={13} /> : <Copy size={13} />}
                        {copied ? t.contact.copied : t.contact.copy}
                    </button>
                </div>
                <ul className="channels" data-reveal-group data-reveal-gap="60">
                    {channels.map((ch) => (
                        <li key={ch.name}>
                            <a className="channel glass" href={ch.href} target="_blank" rel="noopener noreferrer">
                                <Brand name={ch.icon} />
                                <span style={{ minWidth: 0 }}>
                                    <small>{ch.name}</small>
                                    <b>{ch.label}</b>
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
