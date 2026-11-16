"use client";
import { useLanguage } from "../context/LanguageContext";
import { Label, Words } from "./ui";

export default function Experience() {
    const { t } = useLanguage();
    const x = t.experience;
    const openDoc = (key) => () => window.dispatchEvent(new CustomEvent("viewer:open", { detail: key }));

    return (
        <section id="pengalaman" className="dark" data-scene="process">
            <div className="container process-grid">
                <div className="process-head">
                    <Label>{x.title}</Label>
                    <h2 className="h2" data-words>
                        <Words text={x.heading} />
                    </h2>
                </div>
                <div className="process-steps">
                    <p className="sub-label" style={{ marginTop: 0 }}>{x.workTitle}</p>
                    {x.jobs.map((job, i) => (
                        <article key={i} className="glass step spot" data-reveal="up">
                            <div className="step-top">
                                <span>{job.period}</span>
                                <span>0{i + 1}</span>
                            </div>
                            <div className="step-main">
                                <div>
                                    <h3>{job.role}</h3>
                                    <p>{job.org}</p>
                                    <ul>
                                        {job.points.map((point, k) => (
                                            <li key={k}>{point}</li>
                                        ))}
                                    </ul>
                                    {job.links && (
                                        <p className="step-links">
                                            <a className="text-link" href="#dokumen" onClick={openDoc("dki")}>
                                                {job.links[0].label} ↓
                                            </a>
                                            <a className="text-link" href="#dokumen" onClick={openDoc("eda")}>
                                                {job.links[1].label} ↓
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}

                    <p className="sub-label">{x.leadTitle}</p>
                    {x.leadership.map((item, i) => (
                        <article key={i} className="glass step spot" data-reveal="up">
                            <div className="step-top">
                                <span>{item.period}</span>
                                <span>0{i + 3}</span>
                            </div>
                            <div className="step-main has-img">
                                <div>
                                    <h3>{item.role}</h3>
                                    <p>{item.org}</p>
                                    <p className="step-text">{item.text}</p>
                                </div>
                                <img src={item.image} alt={item.alt} width="1000" height="666" loading="lazy" />
                            </div>
                        </article>
                    ))}

                    <p className="sub-label">{x.moreTitle}</p>
                    <ul className="more-list" data-reveal="up">
                        {x.more.map((item, i) => (
                            <li key={i}>
                                <b>{item.role}</b>
                                <span className="muted">{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
