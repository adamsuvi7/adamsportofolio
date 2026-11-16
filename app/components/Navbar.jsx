"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const SECTIONS = [
    ["profil", "profile"],
    ["keahlian", "skills"],
    ["proyek", "projects"],
    ["dokumen", "documents"],
    ["pengalaman", "experience"],
    ["kredensial", "credentials"],
    ["kontak", "contact"],
];

export default function Navbar() {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("");

    // Highlight the section currently in the middle of the screen.
    useEffect(() => {
        const els = SECTIONS.map(([id]) => document.getElementById(id)).filter(Boolean);
        const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
            rootMargin: "-45% 0px -50% 0px",
        });
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <a href="#konten" className="sr-only">
                {t.a11y.skip}
            </a>
            <header className="nav">
                <a href="#top" className="logo" onClick={() => setOpen(false)}>
                    /adamsuvi
                </a>
                <nav className="nav-pill" aria-label="Main">
                    {SECTIONS.map(([id, key]) => (
                        <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}>
                            {t.nav[key]}
                        </a>
                    ))}
                </nav>
                <div className="nav-right">
                    <LanguageToggle />
                    <button type="button" className="menu-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? t.a11y.closeMenu : t.a11y.menu}>
                        {open ? <X size={17} /> : <Menu size={17} />}
                    </button>
                </div>
            </header>
            {open && (
                <nav className="menu" aria-label="Menu">
                    {SECTIONS.map(([id, key], i) => (
                        <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                            <small>0{i + 1}</small>
                            {t.nav[key]}
                        </a>
                    ))}
                </nav>
            )}
        </>
    );
}
