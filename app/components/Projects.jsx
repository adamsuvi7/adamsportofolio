"use client";
import { motion } from "framer-motion";
import { ExternalLink, BarChart2, Database, FileText } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Projects = () => {
    const { t } = useLanguage();

    const iconMap = {
        BarChart2,
        Database,
        FileText
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const getPreviewUrl = (url) => {
        if (!url) return "";
        if (url.includes("docs.google.com/presentation")) {
            return url.replace(/\/edit.*$/, "/preview");
        }
        if (url.includes("docs.google.com/spreadsheets")) {
            return url.replace(/\/edit.*$/, "/preview");
        }
        if (url.includes("drive.google.com/file")) {
            return url.replace(/\/view.*$/, "/preview");
        }
        return url;
    };

    return (
        <section className="py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-sky font-medium tracking-wide uppercase mb-2">{t.projects.section_title}</h2>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{t.projects.heading}</h3>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {t.projects.items.map((project, index) => {
                        const previewUrl = getPreviewUrl(project.link);

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-sky/50 transition-all duration-300 hover:shadow-xl hover:shadow-sky/10 flex flex-col"
                            >
                                {/* Preview Section */}
                                <div className="relative w-full aspect-video border-b border-border bg-muted overflow-hidden group-hover:opacity-100 transition-opacity">
                                    <iframe
                                        src={previewUrl}
                                        className="w-full h-full scrollbar-hide"
                                        title={project.title}
                                        loading="lazy"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                    />
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                                            <h4 className="text-2xl font-bold text-card-foreground hover:text-sky transition-colors">
                                                {project.title}
                                            </h4>
                                        </a>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors shrink-0 ml-4">
                                            <ExternalLink size={24} />
                                        </a>
                                    </div>

                                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tools.map((tool, i) => (
                                            <span key={i} className="px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-200 bg-blue-100 dark:bg-royal/20 rounded-full">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
