"use client";
import { useLanguage } from "../context/LanguageContext";
import { Label, Words } from "./ui";

export default function Stats() {
    const { t, language } = useLanguage();
    const s = t.stats;
    const locale = language === "en" ? "en-US" : "id-ID";

    return (
        <section className="dark" data-scene="stats">
            <div className="container">
                <Label>{s.title}</Label>
                <div className="split-head">
                    <h2 className="h2" data-words>
                        <Words text={s.heading} />
                    </h2>
                    <p className="muted" data-reveal="up">
                        {s.note}
                    </p>
                </div>
                <div className="stats-grid" data-reveal-group data-reveal-gap="60">
                    {s.items.map((item, i) => (
                        <div key={i} className="glass stat spot">
                            <span className="stat-idx">0{i + 1}</span>
                            <strong data-count={item.to} data-suffix={item.suffix}>
                                {item.to.toLocaleString(locale) + item.suffix}
                            </strong>
                            <span className="stat-label">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
