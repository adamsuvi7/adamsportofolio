"use client";
import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { playViz, prepViz, reducedMotion } from "../lib/motion";
import { tools } from "../data/site";
import ProjectViz from "./ProjectViz";
import { Label, Words } from "./ui";

// Draws the chart inside `ref` each time `trigger` changes.
function useDrawChart(ref, trigger, active = true) {
    useEffect(() => {
        const el = ref.current;
        if (!el || !active || reducedMotion()) return;
        prepViz(el);
        playViz(el);
    }, [ref, trigger, active]);
}

function InlineChart({ project, open }) {
    const ref = useRef(null);
    useDrawChart(ref, open, open);
    return (
        <div className="work-inline-viz glass" ref={ref}>
            <ProjectViz kind={project.key} />
            <p>{project.vizCaption}</p>
        </div>
    );
}

export default function Projects() {
    const { t } = useLanguage();
    const p = t.projects;
    const [open, setOpen] = useState(0);
    const [hover, setHover] = useState(-1);
    const preview = useRef(null);
    const chart = useRef(null);

    // The preview card trails the cursor.
    useEffect(() => {
        if (!window.matchMedia("(min-width: 980px) and (pointer: fine)").matches) return;
        let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
        const move = (e) => {
            tx = e.clientX;
            ty = e.clientY;
        };
        const loop = () => {
            x += (tx - x) * 0.12;
            y += (ty - y) * 0.12;
            if (preview.current) preview.current.style.transform = `translate(${x + 30}px, ${y}px) translateY(-50%)`;
            raf = requestAnimationFrame(loop);
        };
        window.addEventListener("pointermove", move, { passive: true });
        loop();
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", move);
        };
    }, []);

    useDrawChart(chart, hover, hover > -1);
    const shown = p.items[hover > -1 ? hover : 0];

    return (
        <section id="proyek" className="dark" data-scene="work">
            <div className="container">
                <Label>{p.title}</Label>
                <h2 className="h2" data-words style={{ maxWidth: "15em", marginBottom: "clamp(18px, 2.6vw, 30px)" }}>
                    <Words text={p.heading} />
                </h2>
                <ul className={`work-list ${hover > -1 ? "has-hover" : ""}`} onPointerLeave={() => setHover(-1)} data-reveal-group data-reveal-gap="80">
                    {p.items.map((project, i) => {
                        const isOpen = open === i;
                        return (
                            <li key={project.key} className={`${isOpen ? "is-open" : ""} ${hover === i ? "is-hover" : ""}`} onPointerEnter={(e) => e.pointerType !== "touch" && setHover(i)}>
                                <button type="button" className="work-row" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`proyek-${project.key}`} data-cursor={isOpen ? t.ui.close : t.ui.details}>
                                    <span className="work-idx">0{i + 1}</span>
                                    <span className="work-name">{project.title}</span>
                                    <span className="work-plus" aria-hidden="true">
                                        <Plus size={14} />
                                    </span>
                                    <span className="work-meta">
                                        {project.context} · {project.period}
                                    </span>
                                </button>
                                <div className="work-body" id={`proyek-${project.key}`} inert={isOpen ? undefined : ""}>
                                    <div>
                                        <div className="work-detail">
                                            <ul>
                                                {project.points.map((point, k) => (
                                                    <li key={k}>{point}</li>
                                                ))}
                                            </ul>
                                            <div className="work-tags">
                                                <span className="chip" style={project.ongoing ? { borderColor: "var(--accent)", color: "var(--accent)" } : undefined}>
                                                    {project.ongoing ? p.ongoing : p.done}
                                                </span>
                                                {project.tools?.map((key) => (
                                                    <span key={key} className="chip">
                                                        <img src={`/logos/${tools[key].logo}.svg`} alt="" width="14" height="14" loading="lazy" />
                                                        {tools[key].short || tools[key].name}
                                                    </span>
                                                ))}
                                                {project.tags?.map((tag) => (
                                                    <span key={tag} className="chip muted">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            {(project.link || project.key === "pos" || project.key === "kinetz") && (
                                                <p className="work-links">
                                                    {(project.key === "pos" || project.key === "kinetz") && (
                                                        <a className="text-link" href="#aplikasi" onClick={() => window.dispatchEvent(new CustomEvent("apps:open", { detail: project.key }))}>
                                                            {t.ui.preview} ↓
                                                        </a>
                                                    )}
                                                    {(project.link || project.key === "pos") && (
                                                        <a className="text-link" href="#dokumen" onClick={() => window.dispatchEvent(new CustomEvent("viewer:open", { detail: project.key }))}>
                                                            {project.link ? project.link.label : t.apps.deck} ↓
                                                        </a>
                                                    )}
                                                </p>
                                            )}
                                            <InlineChart project={project} open={isOpen} />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className={`work-preview glass ${hover > -1 ? "is-on" : ""}`} ref={preview} aria-hidden="true">
                <div ref={chart} key={shown.key}>
                    <ProjectViz kind={shown.key} />
                </div>
                <p>{shown.vizCaption}</p>
            </div>
        </section>
    );
}
