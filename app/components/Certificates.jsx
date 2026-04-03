"use client";
import { motion } from "framer-motion";
import { Award, FileText } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import dynamic from 'next/dynamic';

const PdfThumbnail = dynamic(() => import('./PdfThumbnail'), {
    ssr: false,
    loading: () => <div className="aspect-[4/3] bg-muted rounded-xl animate-pulse" />
});

const Certificates = () => {
    const { t } = useLanguage();

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
                    <h2 className="text-sky font-medium tracking-wide uppercase mb-2">{t.certificates.section_title}</h2>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{t.certificates.heading}</h3>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {t.certificates.items.map((cert, index) => {
                        const Container = cert.link ? 'a' : 'div';
                        const containerProps = cert.link ? {
                            href: cert.link,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "block h-full cursor-pointer"
                        } : {
                            className: "h-full"
                        };

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="h-full"
                            >
                                <Container
                                    {...containerProps}
                                >
                                    <div className={`bg-gradient-to-br from-card to-background border border-border p-8 rounded-2xl transition-all group h-full ${cert.link ? 'hover:border-sky/50 hover:shadow-lg hover:shadow-sky/5' : 'hover:border-sky/30'}`}>
                                        <div className="mb-6 flex items-center justify-between">
                                            {cert.logo ? (
                                                <div className="bg-white p-2 rounded-lg h-12 w-auto min-w-[48px] flex items-center justify-center">
                                                    <Image
                                                        src={cert.logo}
                                                        alt={cert.issuer}
                                                        width={100}
                                                        height={100}
                                                        className="h-full w-auto object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                <Award className="text-sky group-hover:scale-110 transition-transform" size={40} />
                                            )}
                                            <span className="text-muted-foreground text-sm font-mono">{cert.date}</span>
                                        </div>

                                        <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-sky transition-colors">{cert.title}</h4>
                                        <p className="text-sky font-medium mb-4">{cert.issuer}</p>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {cert.description}
                                        </p>
                                    </div>
                                </Container>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <div className="mt-20">
                    <motion.h4
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold text-foreground mb-8 text-center border-b border-border pb-4"
                    >
                        {t.certificates.all_certs || "All Certificates"}
                    </motion.h4>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {(t.certificates.all_list || []).map((fileName, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <PdfThumbnail fileName={fileName} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Certificates;
