"use client";
import { useLanguage } from "../context/LanguageContext";
import { Label, ScrollText } from "./ui";

export default function Profile() {
    const { t } = useLanguage();
    return (
        <section id="profil" className="dark" data-scene="profile">
            <div className="container">
                <Label>{t.profile.title}</Label>
                <ScrollText text={t.profile.scroll} />
                <div className="profile-row" data-reveal="up">
                    <div className="portrait">
                        <img src="/img/adam-portrait.webp" alt={t.about.portraitAlt} width="819" height="1024" loading="lazy" />
                    </div>
                    <dl className="facts">
                        {t.about.facts.map((f) => (
                            <div key={f.k}>
                                <dt>{f.k}</dt>
                                <dd>{f.v}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
