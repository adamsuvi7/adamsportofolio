"use client";
import { motion } from "framer-motion";
import { Presentation } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const FeaturedProject = () => {
    const { t } = useLanguage();

    return (
        <section id="featured-project" className="py-12 md:py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 text-center"
                >
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Presentation className="text-sky h-6 w-6" />
                        <h2 className="text-sky font-medium tracking-wide uppercase">{t.featured_project?.section_title || "Featured Project"}</h2>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-heading font-bold text-foreground">{t.featured_project?.heading || "One-Stop Data Analyst Portfolio"}</h3>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        {t.featured_project?.description || "A comprehensive showcase of my data analysis capabilities, projects, and certifications in a single interactive presentation."}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative w-full max-w-5xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden border border-border shadow-2xl bg-card"
                >
                    <iframe
                        src="https://drive.google.com/file/d/1j3Fh-_j168q1GVOYvQ6VWE5KWZJxDWsN/preview"
                        width="100%"
                        height="100%"
                        allow="autoplay"
                        className="w-full h-full"
                        title="Featured Project Portfolio"
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedProject;
