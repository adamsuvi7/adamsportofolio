"use client";
import { motion } from "framer-motion";
import { Award, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

const BnspCertificate = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-gradient-to-b from-background to-card relative z-10 border-t border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Certificate Image - Large Display */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative group cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-sky/20 blur-2xl rounded-xl group-hover:bg-sky/30 transition-all duration-500"></div>
                        <div className="relative rounded-2xl overflow-hidden border-2 border-sky/20 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
                            <Image
                                src="/images/certificates/bnsp_front.jpg"
                                alt="Sertifikasi BNSP - Data Analyst"
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                            {/* Overlay hint */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                <span className="text-white font-medium px-4 py-2 bg-black/60 rounded-full backdrop-blur-sm border border-white/20">
                                    View Full Certificate
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Award className="text-sky h-8 w-8" />
                            <h2 className="text-sky font-medium tracking-wide uppercase">Professional Certification</h2>
                        </div>

                        <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
                            Certified
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky to-blue-600 block mt-2">Data Analyst</span>
                        </h3>

                        <div className="flex items-center gap-3 text-muted-foreground bg-accent/50 px-5 py-3 rounded-full w-fit border border-border">
                            <Image src="/images/logos/bnsp.png" alt="BNSP Logo" width={80} height={50} className="object-contain h-10 w-auto" />
                            <span className="text-sm font-medium">Badan Nasional Sertifikasi Profesi (BNSP)</span>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed pt-2">
                            <strong className="text-foreground">Sertifikasi BNSP – Data Analyst</strong> membuktikan kompetensi dalam pengelolaan data, analisis data, business intelligence, serta penyusunan laporan analisis sesuai standar nasional.
                        </p>

                        <ul className="space-y-3 pt-4">
                            {[
                                "Pengelolaan Data & Database",
                                "Analisis Data & Business Intelligence",
                                "Penyusunan Laporan Analisis",
                                "Validasi & Kualitas Data"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-foreground/80">
                                    <CheckCircle className="text-sky h-5 w-5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BnspCertificate;
