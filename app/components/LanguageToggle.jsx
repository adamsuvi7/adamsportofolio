"use client";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle() {
    const { language, toggleLanguage, t } = useLanguage();
    return (
        <button type="button" className="lang" onClick={toggleLanguage} aria-label={t.a11y.language}>
            <i style={{ transform: language === "en" ? "translateX(32px)" : "none" }} aria-hidden="true" />
            <span className={language === "id" ? "on" : ""}>ID</span>
            <span className={language === "en" ? "on" : ""}>EN</span>
        </button>
    );
}
