"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { content } from "../data/content";

const LanguageContext = createContext({ language: "id", t: content.id, toggleLanguage: () => {} });
const STORAGE_KEY = "adam-portfolio-lang";

export function LanguageProvider({ children }) {
    // Indonesian is what gets prerendered; a saved preference is applied after mount.
    const [language, setLanguage] = useState("id");

    useEffect(() => {
        try {
            const saved = window.localStorage.getItem(STORAGE_KEY);
            if (saved === "en" || saved === "id") setLanguage(saved);
        } catch {}
    }, []);

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = useCallback(() => {
        setLanguage((prev) => {
            const next = prev === "id" ? "en" : "id";
            try {
                window.localStorage.setItem(STORAGE_KEY, next);
            } catch {}
            return next;
        });
    }, []);

    const value = useMemo(() => ({ language, toggleLanguage, t: content[language] }), [language, toggleLanguage]);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
