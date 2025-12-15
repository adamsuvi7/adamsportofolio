"use client";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-midnight border-t border-gray-800 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-softGray">
                    &copy; {new Date().getFullYear()} Adam Suvi. {t.footer.rights}
                </p>
                <div className="mt-4 flex justify-center space-x-6">
                    <a href="https://linkedin.com/in/adam-suvi7" target="_blank" rel="noopener noreferrer" className="text-softGray hover:text-sky transition-colors">
                        LinkedIn
                    </a>
                    <a href="mailto:adamsuvi7@gmail.com" className="text-softGray hover:text-sky transition-colors">
                        Email
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
