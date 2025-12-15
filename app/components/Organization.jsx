"use client";
import { motion } from "framer-motion";
import { Briefcase, Users, Mic } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Organization = () => {
    const { t } = useLanguage();

    const icons = [Users, Briefcase, Mic];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
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
                    <h2 className="text-sky font-medium tracking-wide uppercase mb-2">{t.organization.section_title}</h2>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{t.organization.heading}</h3>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative container mx-auto px-6 flex flex-col space-y-8"
                >
                    <div className="absolute z-0 w-1 h-full bg-slate-300 dark:bg-border left-9 md:left-1/2 transform -translate-x-1/2"></div>

                    {t.organization.roles.map((exp, index) => {
                        const Icon = icons[index % icons.length];
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`relative z-10 flex items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="order-1 w-12 h-12 bg-sky rounded-full shadow-lg shadow-sky/40 flex items-center justify-center border-4 border-background z-20 md:mx-auto absolute left-3 md:relative md:left-0">
                                    <Icon size={20} className="text-white" />
                                </div>

                                <div className={`order-1 bg-card backdrop-blur-sm border border-border rounded-xl p-6 w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                                    {exp.image && (
                                        <div className="mb-4 overflow-hidden rounded-lg">
                                            <img
                                                src={exp.image}
                                                alt={exp.org}
                                                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}
                                    <h4 className="font-bold text-xl text-foreground mb-1">{exp.role}</h4>
                                    <p className="text-sky font-medium mb-4">{exp.org}</p>
                                    <ul className="space-y-2">
                                        {exp.details.map((detail, i) => (
                                            <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                                                <span className="w-1.5 h-1.5 bg-sky rounded-full mt-1.5 shrink-0"></span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Organization;
