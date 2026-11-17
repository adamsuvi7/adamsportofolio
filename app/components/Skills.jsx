"use client";
import { useLanguage } from "../context/LanguageContext";
import { tools } from "../data/site";
import { Label, Words } from "./ui";

const GROUP_TAGS = ["SQL", "Code", "BI", "Report"];

export default function Skills() {
    const { t } = useLanguage();
    const s = t.skills;
    // One flat grid, in CV order; a small tag on each card says which group it belongs to.
    const items = s.groups.flatMap((group, g) => group.items.map((item) => ({ ...item, tag: GROUP_TAGS[g], group: group.name })));

    return (
        <section id="keahlian" className="light">
            <div className="container skills-grid">
                <div className="skills-side">
                    <Label>{s.title}</Label>
                    <h2 className="h2" data-words>
                        <Words text={s.heading} />
                    </h2>
                    <p data-reveal="up">{s.intro}</p>
                    <ul className="langs" data-reveal="up">
                        {s.languages.map((l) => (
                            <li key={l.name}>
                                <b>{l.name}</b>
                                <span className="muted">{l.level}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <ul className="tools" data-reveal-group data-reveal-gap="28">
                        {items.map((item) => {
                            const tool = tools[item.tool];
                            return (
                                <li key={item.tool}>
                                    <div className="tool paper-card spot" title={`${item.group}: ${item.detail}`}>
                                        <div className="tool-top">
                                            <img src={`/logos/${tool.logo}.svg`} alt="" width="26" height="26" loading="lazy" />
                                            <span className="tool-group">{item.tag}</span>
                                        </div>
                                        <div>
                                            <b>{tool.short || tool.name}</b>
                                            <small>{item.detail}</small>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <p className="methods-title" data-reveal="fade">
                        {s.methodsTitle}
                    </p>
                    <ul className="methods" data-reveal-group data-reveal-gap="16">
                        {s.methods.map((m) => (
                            <li key={m} className="chip">
                                {m}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
