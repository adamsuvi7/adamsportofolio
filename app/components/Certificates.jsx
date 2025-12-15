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

    const certDetails = [
        { issuer: "Coursera", date: "2025", link: "https://drive.google.com/file/d/14tTx-6vFko1_ytB_pHZlpKBJkUkJfFts/view?usp=sharing", logo: "/images/logos/google.png" },
        { issuer: "Harisenin.com", date: "2025", logo: "/images/logos/harisenin.png" },
        { issuer: "Coursera", date: "2025", link: "https://drive.google.com/file/d/1mnwMZgoMKqZDESQxj8YW4E1PtdI131LA/view?usp=sharing", logo: "/images/logos/meta.png" },
        { issuer: "Syntaxnesia", date: "2025", link: "https://drive.google.com/file/d/1I3eoumEZpdAZxgMhvDbDA8x8VzNAA9PO/view?usp=sharing", logo: "/images/logos/syntaxnesia.png" }
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
                        const Container = certDetails[index]?.link ? 'a' : 'div';
                        const containerProps = certDetails[index]?.link ? {
                            href: certDetails[index].link,
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
                                    <div className={`bg-gradient-to-br from-card to-background border border-border p-8 rounded-2xl transition-all group h-full ${certDetails[index]?.link ? 'hover:border-sky/50 hover:shadow-lg hover:shadow-sky/5' : 'hover:border-sky/30'}`}>
                                        <div className="mb-6 flex items-center justify-between">
                                            {certDetails[index].logo ? (
                                                <div className="bg-white p-2 rounded-lg h-12 w-auto min-w-[48px] flex items-center justify-center">
                                                    <Image
                                                        src={certDetails[index].logo}
                                                        alt={certDetails[index].issuer}
                                                        width={100}
                                                        height={100}
                                                        className="h-full w-auto object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                <Award className="text-sky group-hover:scale-110 transition-transform" size={40} />
                                            )}
                                            <span className="text-muted-foreground text-sm font-mono">{certDetails[index].date}</span>
                                        </div>

                                        <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-sky transition-colors">{cert.title}</h4>
                                        <p className="text-sky font-medium mb-4">{certDetails[index].issuer}</p>
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
                        {[
                            "Coursera 4H7XIYGCL5U9.pdf", "Coursera 677FP4197JD1.pdf", "Coursera B6X8ZEXQ39SV.pdf",
                            "Coursera BC16M9BJS8Y2.pdf", "Coursera F0HU5TFM1C57.pdf", "Coursera GCZN5DKUT9NP.pdf",
                            "Coursera HY2BP9S3I96P.pdf", "Coursera KR4G69WZTYUC.pdf", "Coursera PVUV5YU90F8U.pdf",
                            "Coursera Q1NJ7YDEFRHI.pdf", "Coursera Q4PJK8GK4Y0B.pdf", "Coursera SXWIYT0PW7AB.pdf",
                            "Coursera TK9DF11ZVPI9.pdf", "Coursera X88K1F494A87.pdf", "GOOGLE- DATA DRIVEN.pdf",
                            "META CERTIFICATE.pdf", "MICROSOFT CERTIFICATE.pdf", "SERTIFIKAT COURSERA GOOGLE.pdf",
                            "SERTIFIKAT COURSSERA DATA ANLYST.pdf"
                        ].map((fileName, index) => (
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
