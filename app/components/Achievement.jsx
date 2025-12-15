"use client";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Achievement = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-sky font-medium tracking-wide uppercase mb-2">{t.achievement.section_title}</h2>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{t.achievement.heading}</h3>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-gradient-to-r from-royal/20 to-background dark:from-royal/20 dark:to-midnight border border-border rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-lg dark:shadow-none"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky to-transparent"></div>

                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        {t.achievement.image && (
                            <div className="w-full md:w-1/3 shrink-0">
                                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg shadow-sky/20 border border-border">
                                    <img
                                        src={t.achievement.image}
                                        alt={t.achievement.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex-1 text-center md:text-left">
                            <div className="w-16 h-16 bg-sky/20 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-6">
                                <Trophy size={32} className="text-sky" />
                            </div>

                            <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                                {t.achievement.title}
                            </h4>

                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {t.achievement.description}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Achievement;
