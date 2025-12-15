"use client";
import { motion } from "framer-motion";
import { User, MapPin, Calendar } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const About = () => {
    const { t } = useLanguage();

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
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    {/* Left Column: Image or Visual */}
                    <motion.div variants={itemVariants} className="relative">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-royal to-background border border-border flex items-center justify-center shadow-2xl relative">
                            <img
                                src="/profile.png"
                                alt="Adam Suvi"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-sky p-6 rounded-xl shadow-lg z-10">
                            <p className="text-white font-bold text-xl">{t.about.role_badge}</p>
                            <p className="text-blue-100 text-sm">{t.about.focus_badge}</p>
                        </div>
                    </motion.div>

                    {/* Right Column: Content */}
                    <motion.div variants={containerVariants} className="space-y-6">
                        <motion.div variants={itemVariants}>
                            <h2 className="text-sky font-medium tracking-wide uppercase">{t.about.title}</h2>
                            <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                                {t.about.heading}
                            </h3>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed">
                            {t.about.description}
                        </motion.p>

                        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 pt-4">
                            <div className="flex items-center gap-3 p-4 bg-royal/10 rounded-lg border border-royal/20">
                                <MapPin className="text-sky" size={24} />
                                <div>
                                    <p className="text-muted-foreground text-xs">{t.about.location}</p>
                                    <p className="text-foreground font-medium">Padang, Indonesia</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-royal/10 rounded-lg border border-royal/20">
                                <Calendar className="text-sky" size={24} />
                                <div>
                                    <p className="text-muted-foreground text-xs">{t.about.experience}</p>
                                    <p className="text-foreground font-medium">{t.about.exp_text}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Education Section */}
                        <motion.div variants={itemVariants} className="pt-8 border-t border-gray-800 mt-8">
                            <h4 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <span className="w-8 h-1 bg-sky rounded-full"></span>
                                {t.about.education.title}
                            </h4>
                            <div className="bg-card border border-border rounded-xl p-6 hover:border-sky/30 transition-colors flex items-start gap-4">
                                <div className="w-16 h-16 shrink-0 bg-white/5 rounded-lg p-2 flex items-center justify-center">
                                    <img
                                        src="/images/unand_logo.png"
                                        alt="Universitas Andalas Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div>
                                    <h5 className="text-lg font-bold text-foreground mb-1">{t.about.education.university}</h5>
                                    <p className="text-sky font-medium mb-3">{t.about.education.degree}</p>
                                    <p className="text-muted-foreground text-sm mb-2 italic">{t.about.education.thesis}</p>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{t.about.education.coursework}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
