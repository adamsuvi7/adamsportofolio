"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const Hero = () => {
    const { t } = useLanguage();
    const [loopKey, setLoopKey] = useState(0);

    useEffect(() => {
        const textLength = t.hero.quote.length;
        const duration = textLength * 30 + 5000; // 30ms per char + 5s pause for readability

        const interval = setInterval(() => {
            setLoopKey(prev => prev + 1);
        }, duration);

        return () => clearInterval(interval);
    }, [t.hero.quote]);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">


            {/* Background Gradient Blob */}
            <motion.div
                className="hidden md:block absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-royal/30 rounded-full blur-[100px] opacity-50 pointer-events-none"
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="hidden md:block absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-sky/20 rounded-full blur-[100px] opacity-50 pointer-events-none"
                animate={{
                    x: [0, -30, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    <motion.h2
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                        className="text-sky font-medium text-lg mb-4 tracking-wide uppercase"
                    >
                        {t.hero.greeting}
                    </motion.h2>
                    <motion.h1
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                        className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-6 tracking-tight"
                    >
                        Adam Suvi, S.Si., C.DA
                    </motion.h1>
                    <motion.h3
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                        className="text-2xl md:text-3xl text-softGray mb-8 font-light"
                    >
                        {t.hero.role}
                    </motion.h3>

                    <motion.div
                        className="max-w-2xl mx-auto mb-10 h-24" // Added fixed height to prevent layout shift during typing
                    >
                        <motion.p
                            key={`${t.hero.quote}-${loopKey}`}
                            variants={{
                                hidden: { opacity: 1 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.03,
                                    },
                                },
                            }}
                            initial="hidden"
                            animate="visible"
                            className="text-muted-foreground text-lg italic leading-relaxed"
                        >
                            {t.hero.quote.split("").map((char, index) => (
                                <motion.span
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 5 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="#about"
                            className="px-8 py-3 bg-sky hover:bg-blue-600 text-white rounded-full font-medium transition-all shadow-lg shadow-sky/25 flex items-center gap-2"
                        >
                            {t.hero.cta_portfolio} <ArrowRight size={20} />
                        </Link>
                        <a
                            href="https://docs.google.com/document/d/12Z0Wy7s-lJpRVjBSIYeHRB9XQKpN9XHm/edit?usp=sharing&ouid=115974012460813639436&rtpof=true&sd=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-transparent border border-gray-600 hover:border-sky text-softGray hover:text-sky rounded-full font-medium transition-all flex items-center gap-2"
                        >
                            {t.hero.cta_cv} <Download size={20} />
                        </a>
                        <Link
                            href="#contact"
                            className="px-8 py-3 bg-royal/20 hover:bg-royal/40 text-blue-300 rounded-full font-medium transition-all flex items-center gap-2"
                        >
                            {t.hero.cta_contact} <Mail size={20} />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
