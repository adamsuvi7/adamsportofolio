"use client";
import { motion } from "framer-motion";
import { Mail, Linkedin, Send, Phone, Instagram } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `mailto:adamsuvi7@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}`;
    };

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
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
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
                    <h2 className="text-sky font-medium tracking-wide uppercase mb-2">{t.contact.section_title}</h2>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{t.contact.heading}</h3>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
                    {/* Contact Info */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants}>
                            <h4 className="text-2xl font-bold text-foreground">{t.contact.connect_title}</h4>
                            <p className="text-muted-foreground leading-relaxed">
                                {t.contact.connect_desc}
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            <motion.a
                                variants={itemVariants}
                                href="mailto:adamsuvi7@gmail.com"
                                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-sky/50 transition-all group"
                            >
                                <div className="w-12 h-12 bg-royal/20 rounded-full flex items-center justify-center text-sky group-hover:bg-sky group-hover:text-white transition-colors">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{t.contact.form.email}</p>
                                    <p className="text-foreground font-medium">adamsuvi7@gmail.com</p>
                                </div>
                            </motion.a>

                            <motion.a
                                variants={itemVariants}
                                href="https://linkedin.com/in/adam-suvi7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-sky/50 transition-all group"
                            >
                                <div className="w-12 h-12 bg-royal/20 rounded-full flex items-center justify-center text-sky group-hover:bg-sky group-hover:text-white transition-colors">
                                    <Linkedin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                                    <p className="text-foreground font-medium">linkedin.com/in/adam-suvi7</p>
                                </div>
                            </motion.a>

                            <motion.a
                                variants={itemVariants}
                                href="https://wa.me/6282171625816"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-sky/50 transition-all group"
                            >
                                <div className="w-12 h-12 bg-royal/20 rounded-full flex items-center justify-center text-sky group-hover:bg-sky group-hover:text-white transition-colors">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                                    <p className="text-foreground font-medium">0821-7162-5816</p>
                                </div>
                            </motion.a>

                            <motion.a
                                variants={itemVariants}
                                href="https://instagram.com/adam_suvi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-sky/50 transition-all group"
                            >
                                <div className="w-12 h-12 bg-royal/20 rounded-full flex items-center justify-center text-sky group-hover:bg-sky group-hover:text-white transition-colors">
                                    <Instagram size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Instagram</p>
                                    <p className="text-foreground font-medium">@adam_suvi</p>
                                </div>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Contact Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-sky/30 shadow-2xl shadow-sky/20">
                            <img
                                src="/images/contact_profile.png"
                                alt="Contact Adam"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-sky/20 rounded-full blur-2xl -z-0"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-royal/30 rounded-full blur-2xl -z-0"></div>
                    </motion.div>
                </div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto bg-card border border-border p-8 rounded-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">{t.contact.form.name}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-sky focus:ring-1 focus:ring-sky transition-colors"
                                    placeholder={t.contact.form.placeholder_name}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">{t.contact.form.email}</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-sky focus:ring-1 focus:ring-sky transition-colors"
                                    placeholder={t.contact.form.placeholder_email}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">{t.contact.form.message}</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-sky focus:ring-1 focus:ring-sky transition-colors"
                                placeholder={t.contact.form.placeholder_msg}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-sky hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            {t.contact.form.send} <Send size={18} />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
