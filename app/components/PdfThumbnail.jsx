"use client";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfThumbnail = ({ fileName }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-sky/50 transition-all"
        >
            <a href={`/certificates/${fileName}`} target="_blank" rel="noopener noreferrer" className="block relative aspect-[4/3] overflow-hidden bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                    <Document
                        file={`/certificates/${fileName}`}
                        loading={<div className="animate-pulse w-full h-full bg-muted" />}
                        error={<div className="text-red-400 text-xs p-2">Failed to load PDF</div>}
                    >
                        <Page
                            pageNumber={1}
                            width={400}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="w-full h-full object-contain"
                        />
                    </Document>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-sky text-white rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        View PDF
                    </span>
                </div>
            </a>

            <div className="p-4 border-t border-border bg-card/80">
                <p className="text-muted-foreground text-sm font-medium truncate" title={fileName}>
                    {fileName.replace('.pdf', '')}
                </p>
            </div>
        </motion.div>
    );
};

export default PdfThumbnail;
