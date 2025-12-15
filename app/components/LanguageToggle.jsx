"use client";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="relative flex items-center bg-gray-800 rounded-full p-1 w-16 h-8 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky/50"
            aria-label="Toggle Language"
        >
            <motion.div
                className="absolute w-6 h-6 bg-sky rounded-full shadow-md z-10"
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                animate={{ x: language === 'en' ? 32 : 0 }}
            />
            <span className={`absolute left-2 text-[10px] font-bold z-0 transition-colors ${language === 'id' ? 'text-white' : 'text-gray-500'}`}>
                ID
            </span>
            <span className={`absolute right-2 text-[10px] font-bold z-0 transition-colors ${language === 'en' ? 'text-white' : 'text-gray-500'}`}>
                EN
            </span>
        </button>
    );
};

export default LanguageToggle;
