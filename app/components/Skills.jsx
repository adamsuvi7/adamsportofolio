"use client";
import { motion } from "framer-motion";
import { Database, Code, BarChart2, FileSpreadsheet, Brain, Users, MessageSquare, Clock, Award } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Skills = () => {
    const { t } = useLanguage();

    const technicalSkills = [
        { name: "SQL", icon: Database },
        { name: "Python (Pandas, NumPy)", icon: Code },
        { name: "Power BI", icon: BarChart2 },
        { name: "Tableau", icon: BarChart2 },
        { name: "Excel (Pivot, XLOOKUP)", icon: FileSpreadsheet },
        { name: "Data Cleaning", icon: Database },
        { name: "EDA", icon: BarChart2 },
        { name: "Data Visualization", icon: BarChart2 },
    ];

    const softSkills = [
        { name: t.skills.soft_skills.analytical, icon: Brain },
        { name: t.skills.soft_skills.problem_solving, icon: Brain },
        { name: t.skills.soft_skills.communication, icon: MessageSquare },
        { name: t.skills.soft_skills.time_mgmt, icon: Clock },
        { name: t.skills.soft_skills.detail, icon: Brain },
        { name: t.skills.soft_skills.collaboration, icon: Users },
    ];

    const courses = [
        "Google Data Analytics – Coursera",
        "Harisenin.com – Bootcamp Data Analyst",
        "Meta Data Analyst – Coursera",
        "Syntaxnesia Training Centre – Data Analyst"
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
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
                    <h2 className="text-sky font-medium tracking-wide uppercase mb-2">{t.skills.section_title}</h2>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{t.skills.heading}</h3>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                    {/* Technical Skills */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <motion.h4 variants={itemVariants} className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <Code className="text-sky" /> {t.skills.technical}
                        </motion.h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                            {technicalSkills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="p-4 bg-card border border-border rounded-xl hover:bg-muted transition-colors flex flex-col items-center text-center gap-3"
                                >
                                    <skill.icon className="text-sky" size={28} />
                                    <span className="text-sm text-muted-foreground font-medium">{skill.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Soft Skills & Courses */}
                    <div className="space-y-12">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <motion.h4 variants={itemVariants} className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                <Users className="text-sky" /> {t.skills.soft}
                            </motion.h4>
                            <div className="grid grid-cols-2 gap-4">
                                {softSkills.map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="p-3 bg-muted border border-border rounded-lg flex items-center gap-3"
                                    >
                                        <skill.icon className="text-sky/70" size={20} />
                                        <span className="text-sm text-muted-foreground">{skill.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <motion.h4 variants={itemVariants} className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                <Award className="text-sky" /> {t.skills.courses}
                            </motion.h4>
                            <div className="space-y-3">
                                {courses.map((course, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="p-4 bg-gradient-to-r from-muted to-transparent border-l-4 border-sky rounded-r-lg"
                                    >
                                        <p className="text-foreground font-medium">{course}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="hidden lg:block relative"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-sky/30 shadow-2xl shadow-sky/20">
                            <img
                                src="/images/profile_red_v3.png"
                                alt="Adam Suvi"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-sky/20 rounded-full blur-2xl -z-0"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-royal/30 rounded-full blur-2xl -z-0"></div>
                    </motion.div>
                </div>
            </div>
        </section >
    );
};

export default Skills;
