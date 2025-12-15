"use client";
import { motion } from "framer-motion";
import { ExternalLink, BarChart2, Database, FileText } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Projects = () => {
    const { t } = useLanguage();

    const projectIcons = [BarChart2, BarChart2, Database, FileText];
    const projectTools = [
        ["Python", "Pandas", "SQL"],
        ["Python", "ANN", "TensorFlow"],
        ["Excel", "Canva"],
        ["Power BI", "Power Query", "Pivot Table"]
    ];
    const projectLinks = [
        "https://docs.google.com/presentation/d/1OhkWJtOviRRaek3CUG8PeWmw73GwBmWE/edit?usp=sharing&ouid=115974012460813639436&rtpof=true&sd=true",
        "https://docs.google.com/presentation/d/10yzplBokg8Egs4yhYrM-CcIheQgH2lmv/edit?usp=sharing&ouid=115974012460813639436&rtpof=true&sd=true",
        "https://docs.google.com/spreadsheets/d/1yutTtek2XKtyA8UvRoHOnVKXrh9VTgNN/edit?usp=sharing&ouid=115974012460813639436&rtpof=true&sd=true",
        "https://drive.google.com/file/d/1Lz0gB_dI838XXy2kTRsmHHXItyzEbhOi/view?usp=sharing"
    ];

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
                        const Icon = projectIcons[index];
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-sky/50 transition-all duration-300 hover:shadow-xl hover:shadow-sky/10"
                            >
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-royal/20 rounded-lg text-sky">
                                            <Icon size={28} />
                                        </div>
                                        <a href={projectLinks[index]} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                            <ExternalLink size={24} />
                                        </a>
                                    </div>

                                    <a href={projectLinks[index]} target="_blank" rel="noopener noreferrer" className="block">
                                        <h4 className="text-2xl font-bold text-card-foreground mb-3 group-hover:text-sky transition-colors">
                                            {project.title}
                                        </h4>
                                    </a>
                                    <p className="text-muted-foreground mb-6 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {projectTools[index].map((tool, i) => (
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
