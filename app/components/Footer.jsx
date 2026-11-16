"use client";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="border-t border-white/10 bg-deep-950 py-7 text-periwinkle-300">
            <div className="page flex flex-col items-start justify-between gap-4 text-sm sm:flex-row sm:items-center">
                <p>
                    © {new Date().getFullYear()} Adam Suvi · Jakarta, Indonesia
                    <span className="mt-1 block font-mono text-[0.72rem] text-periwinkle-400/80">{t.footer.note}</span>
                </p>
                <a href="#top" className="chip border-white/20 py-2 text-white transition-colors hover:border-white/60 hover:bg-white/10">
                    {t.footer.top} <ArrowUp size={15} />
                </a>
            </div>
        </footer>
    );
}
