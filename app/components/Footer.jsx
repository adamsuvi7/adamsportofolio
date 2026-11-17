"use client";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();
    return (
        <footer className="footer">
            <div className="container">
                <span>© {new Date().getFullYear()} Adam Suvi · Jakarta, Indonesia</span>
                <span className="mono" style={{ fontSize: 11 }}>{t.footer.note}</span>
                <a href="#top">{t.footer.top} ↑</a>
            </div>
        </footer>
    );
}
