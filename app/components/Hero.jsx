"use client";
import { useLanguage } from "../context/LanguageContext";
import { site } from "../data/site";
import { Button } from "./ui";

export default function Hero() {
    const { t } = useLanguage();
    return (
        <section id="top" className="hero dark" data-scene="hero">
            <div className="hero-copy">
                <p className="label" data-reveal="fade">
                    {t.hero.eyebrow}
                </p>
                <h1 data-words aria-label="Adam Suvi">
                    <span aria-hidden="true">
                        <span className="w">
                            <span>Adam</span>
                        </span>{" "}
                        <span className="w">
                            <span>
                                <em>Suvi</em>
                            </span>
                        </span>
                    </span>
                </h1>
                <p className="hero-lede" data-reveal="up" data-reveal-delay="250">
                    {t.hero.lede}
                </p>
                <div className="hero-ctas" data-reveal="up" data-reveal-delay="380">
                    <Button href="#proyek">{t.hero.ctaProjects}</Button>
                    <Button href={site.cv} variant="ghost" down download>
                        {t.hero.ctaCv}
                    </Button>
                </div>
            </div>
            <p className="hero-side" data-reveal="fade" data-reveal-delay="600">
                <b>{t.hero.certified}</b>
                {t.hero.hint}
            </p>
        </section>
    );
}
