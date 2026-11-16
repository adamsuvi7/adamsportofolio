"use client";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle({ onDark = false }) {
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t.a11y.language}
            className={`relative flex h-9 items-center rounded-full border p-1 font-mono text-[0.72rem] font-semibold transition-colors ${
                onDark ? "border-white/25 text-white" : "border-deep/15 text-ink"
            }`}
        >
            <span
                className="absolute left-1 top-1 h-[calc(100%-0.5rem)] w-9 rounded-full bg-lavender-500 transition-transform duration-300 ease-out"
                style={{ transform: language === "en" ? "translateX(2.25rem)" : "translateX(0)" }}
                aria-hidden="true"
            />
            <span className={`relative z-10 w-9 text-center transition-colors ${language === "id" ? "text-white" : ""}`}>ID</span>
            <span className={`relative z-10 w-9 text-center transition-colors ${language === "en" ? "text-white" : ""}`}>EN</span>
        </button>
    );
}
