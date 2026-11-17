"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { courseCertificates, links } from "../data/site";
import { Label, Words } from "./ui";

export default function Credentials() {
    const { t } = useLanguage();
    const c = t.credentials;
    const [flipped, setFlipped] = useState(false);
    const [pdf, setPdf] = useState(null);

    // Escape closes the certificate viewer.
    useEffect(() => {
        if (!pdf) return;
        const onKey = (e) => e.key === "Escape" && setPdf(null);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [pdf]);

    return (
        <section id="kredensial" className="light">
            <div className="container">
                <Label>{c.title}</Label>
                <h2 className="h2" data-words style={{ marginBottom: "clamp(18px, 2.6vw, 30px)" }}>
                    <Words text={c.heading} />
                </h2>

                <div className="bento" data-reveal-group data-reveal-gap="90">
                    {/* BNSP certificate: click to flip */}
                    <div className="bento-item paper-card">
                        <button type="button" className="flip" data-flipped={flipped} onClick={() => setFlipped((f) => !f)} aria-label={c.bnsp.flip} aria-pressed={flipped} data-cursor={t.ui.flip}>
                            <span className="flip-inner">
                                <img className="flip-face" src="/img/bnsp-front.webp" alt={c.bnsp.front} width="724" height="1024" loading="lazy" />
                                <img className="flip-face flip-back" src="/img/bnsp-back.webp" alt={c.bnsp.back} width="724" height="1024" loading="lazy" />
                            </span>
                        </button>
                        <span className="flip-hint">{c.bnsp.flip}</span>
                    </div>

                    {/* BNSP details and education */}
                    <div style={{ display: "grid", gap: 10 }}>
                        <div className="bento-item paper-card spot">
                            <p className="bento-kicker">{c.bnsp.kicker}</p>
                            <h3>{c.bnsp.title}</h3>
                            <div className="edu-row" style={{ margin: "10px 0" }}>
                                <img src="/img/logo-bnsp.webp" alt="" width="320" height="240" loading="lazy" style={{ height: 34 }} />
                                <p>
                                    <b style={{ fontWeight: 650 }}>{c.bnsp.issuer}</b>
                                    <br />
                                    <span className="mono" style={{ fontSize: 11, color: "var(--accent-ink)" }}>
                                        {c.bnsp.validity}
                                    </span>
                                </p>
                            </div>
                            <p className="muted">{c.bnsp.text}</p>
                            <p style={{ marginTop: 10 }}>
                                <a className="text-link" href={links.certBnsp} target="_blank" rel="noopener noreferrer">
                                    {c.bnsp.link} ↗
                                </a>
                            </p>
                        </div>
                        <div className="bento-item paper-card spot">
                            <p className="bento-kicker">{c.eduTitle}</p>
                            <div className="edu-row">
                                <img src="/img/unand.webp" alt="" width="160" height="195" loading="lazy" />
                                <div>
                                    <h3>{c.education.degree}</h3>
                                    <p className="muted">{c.education.school}</p>
                                </div>
                            </div>
                            <div className="kv">
                                <span className="chip mono">{c.education.period}</span>
                                <span className="chip mono" style={{ color: "var(--accent-ink)", borderColor: "var(--accent-ink)" }}>
                                    {c.education.gpa}
                                </span>
                            </div>
                            <p className="muted" style={{ marginTop: 10, fontSize: 12.5 }}>
                                <b style={{ color: "var(--ink)", fontWeight: 650 }}>{c.education.courseworkLabel}:</b> {c.education.coursework.join(", ")}.
                                <br />
                                <b style={{ color: "var(--ink)", fontWeight: 650 }}>{c.education.thesisLabel}:</b> <i>{c.education.thesis}</i>
                            </p>
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="bento-item paper-card">
                        <p className="bento-kicker">{c.certTitle}</p>
                        <div className="cert-list">
                            {c.certs.map((cert) => {
                                const Tag = cert.href ? "a" : "div";
                                const linkProps = cert.href ? { href: cert.href, target: "_blank", rel: "noopener noreferrer" } : {};
                                return (
                                    <Tag key={cert.title} className="cert" {...linkProps}>
                                        <span className="cert-logo">{cert.logo ? <img src={cert.logo} alt="" loading="lazy" /> : "TOEFL"}</span>
                                        <span>
                                            <b>{cert.title}</b>
                                            <small>
                                                {cert.issuer}
                                                {cert.note && <span style={{ color: "var(--accent-ink)", fontWeight: 650 }}> · {cert.note}</span>}
                                            </small>
                                        </span>
                                        <time>
                                            {cert.date}
                                            {cert.href && " ↗"}
                                        </time>
                                    </Tag>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Course certificates: one scrolling row, each opens in a viewer */}
                <div className="strip-head">
                    <h3>{c.galleryTitle}</h3>
                    <span>{c.galleryIntro}</span>
                </div>
                <div className="strip" data-reveal="up" data-lenis-prevent>
                    {courseCertificates.map((cert) => (
                        <button key={cert.file} type="button" onClick={() => setPdf(cert)} data-cursor={t.ui.view}>
                            <img src={`/certificates/thumbs/${cert.thumb}.webp`} alt="" width="550" height="425" loading="lazy" />
                            <span>
                                <small>{cert.by}</small>
                                {cert.title}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {pdf && (
                <div className="modal" role="dialog" aria-modal="true" aria-label={pdf.title} onClick={(e) => e.target === e.currentTarget && setPdf(null)}>
                    <div className="viewer-frame">
                        <div className="viewer-bar">
                            <span className="viewer-dots" aria-hidden="true">
                                <i />
                                <i />
                                <i />
                            </span>
                            <b>
                                {pdf.by} · {pdf.title}
                            </b>
                            <a href={`/certificates/${encodeURIComponent(pdf.file)}`} target="_blank" rel="noopener noreferrer">
                                {t.ui.viewPdf} ↗
                            </a>
                            <button type="button" className="modal-close" onClick={() => setPdf(null)} aria-label={t.ui.close} autoFocus>
                                <X size={13} />
                            </button>
                        </div>
                        {/* A full-size image rather than an embedded PDF: phones cannot show PDFs inline */}
                        <div className="cert-view" data-lenis-prevent>
                            <img src={`/certificates/full/${pdf.thumb}.webp`} alt={`${pdf.by}: ${pdf.title}`} width="1320" height="1020" />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
