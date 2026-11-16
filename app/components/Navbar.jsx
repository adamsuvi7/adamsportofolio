"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { reducedMotion } from "../lib/motion";
import LanguageToggle from "./LanguageToggle";

const SECTIONS = ["profil", "keahlian", "proyek", "pengalaman", "kredensial", "kontak"];
const KEYS = ["profile", "skills", "projects", "experience", "credentials", "contact"];

export default function Navbar() {
    const { t } = useLanguage();
    const pathname = usePathname();
    const onHome = pathname === "/";
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("");
    const barRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 24);
            const max = document.documentElement.scrollHeight - window.innerHeight;
            if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Highlight the section currently under the nav.
    useEffect(() => {
        if (!onHome) return;
        const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: "-45% 0px -50% 0px" }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [onHome]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        if (open && menuRef.current && !reducedMotion()) {
            animate(menuRef.current.querySelectorAll("a"), { opacity: [0, 1], x: [-24, 0], duration: 600, ease: "outExpo", delay: stagger(50) });
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    // Light text while sitting on the dark hero, dark text on frosted glass after that.
    const onDark = onHome && !scrolled && !open;
    const href = (id) => (onHome ? `#${id}` : `/#${id}`);

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <a href="#konten" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
                {t.a11y.skip}
            </a>
            <div
                className={`transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
                    onDark ? "border-b border-transparent" : "border-b border-white/70 bg-airy/75 shadow-[0_8px_30px_-18px_rgba(42,38,114,.45)] backdrop-blur-xl"
                }`}
            >
                <nav className="page flex h-[var(--nav-h)] items-center justify-between gap-4" aria-label="Main">
                    <Link href={onHome ? "#top" : "/"} className={`group flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight ${onDark ? "text-white" : "text-ink"}`}>
                        <span className="flex h-8 w-8 items-end justify-center gap-[3px] rounded-lg bg-lavender-500 p-[7px]" aria-hidden="true">
                            <i className="block h-[45%] w-[4px] rounded-sm bg-white/70 transition-all duration-300 group-hover:h-[90%]" />
                            <i className="block h-[100%] w-[4px] rounded-sm bg-white transition-all duration-300 group-hover:h-[50%]" />
                            <i className="block h-[70%] w-[4px] rounded-sm bg-white/85 transition-all duration-300 group-hover:h-[100%]" />
                        </span>
                        Adam Suvi
                    </Link>

                    <div className="hidden items-center gap-1 lg:flex">
                        {SECTIONS.map((id, i) => (
                            <a
                                key={id}
                                href={href(id)}
                                aria-current={active === id ? "true" : undefined}
                                className={`rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors ${
                                    onDark
                                        ? "text-periwinkle-200 hover:text-white"
                                        : active === id
                                          ? "bg-lavender-500/10 text-lavender-700"
                                          : "text-ink-soft hover:text-ink"
                                }`}
                            >
                                {t.nav[KEYS[i]]}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <LanguageToggle onDark={onDark} />
                        <button
                            type="button"
                            onClick={() => setOpen((o) => !o)}
                            aria-expanded={open}
                            aria-label={open ? t.a11y.closeMenu : t.a11y.menu}
                            className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${onDark ? "text-white hover:bg-white/10" : "text-ink hover:bg-deep/5"}`}
                        >
                            {open ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </nav>
                <span ref={barRef} className="absolute inset-x-0 bottom-0 block h-[2px] origin-left scale-x-0 bg-gradient-to-r from-lavender-600 to-periwinkle-400" aria-hidden="true" />
            </div>

            {open && (
                <div ref={menuRef} className="h-[calc(100dvh-var(--nav-h))] overflow-y-auto bg-airy/95 backdrop-blur-xl lg:hidden">
                    <div className="page flex flex-col py-6">
                        {SECTIONS.map((id, i) => (
                            <a key={id} href={href(id)} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-deep/10 py-4">
                                <span className="font-mono text-xs text-lavender-700">0{i + 1}</span>
                                <span className="display text-3xl text-ink">{t.nav[KEYS[i]]}</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
