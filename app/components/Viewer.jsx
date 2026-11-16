"use client";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { viewerDocs } from "../data/site";
import { Label, Words } from "./ui";

/** A framed, scrollable document. `data-lenis-prevent` lets the wheel scroll the document, not the page. */
function DocFrame({ name, embed, href, openLabel, waitLabel, load = true }) {
    return (
        <div className="viewer-frame">
            <div className="viewer-bar">
                <span className="viewer-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                </span>
                <b>{name}</b>
                <a href={href} target="_blank" rel="noopener noreferrer">
                    {openLabel} ↗
                </a>
            </div>
            <div className="viewer-screen" data-lenis-prevent>
                <p className="viewer-wait">{waitLabel}</p>
                {load && <iframe key={embed} src={embed} title={name} loading="lazy" allow="autoplay; fullscreen" allowFullScreen />}
            </div>
        </div>
    );
}

export default function Viewer() {
    const { t } = useLanguage();
    const v = t.viewer;
    const ref = useRef(null);
    const [active, setActive] = useState("deck");
    const [near, setNear] = useState(false);

    // The document only starts loading once the section is close to the screen.
    useEffect(() => {
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setNear(true);
                    io.disconnect();
                }
            },
            { rootMargin: "600px 0px" }
        );
        io.observe(ref.current);
        return () => io.disconnect();
    }, []);

    // Links elsewhere on the page can ask for a specific document with a "viewer:open" event.
    useEffect(() => {
        const pick = (e) => e.detail && viewerDocs[e.detail] && setActive(e.detail);
        window.addEventListener("viewer:open", pick);
        return () => window.removeEventListener("viewer:open", pick);
    }, []);

    const doc = v.docs.find((d) => d.key === active) || v.docs[0];

    return (
        <section id="dokumen" className="light" ref={ref}>
            <div className="container">
                <Label>{v.title}</Label>
                <div className="split-head">
                    <h2 className="h2" data-words>
                        <Words text={v.heading} />
                    </h2>
                    <p className="muted" data-reveal="up">
                        {v.intro}
                    </p>
                </div>
                <div className="viewer-tabs" role="tablist" aria-label={v.title} data-reveal="up">
                    {v.docs.map((d) => (
                        <button key={d.key} type="button" role="tab" aria-selected={active === d.key} className="viewer-tab" onClick={() => setActive(d.key)}>
                            {d.name}
                            <small>{d.kind}</small>
                        </button>
                    ))}
                </div>
                <div data-reveal="up" role="tabpanel">
                    <DocFrame name={doc.name} embed={viewerDocs[doc.key].embed} href={viewerDocs[doc.key].href} openLabel={v.open} waitLabel={v.loading} load={near} />
                </div>
            </div>
        </section>
    );
}
