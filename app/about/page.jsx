import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";

export const metadata = {
    title: "Profil",
    description: "Latar belakang, keahlian, dan pengalaman Adam Suvi sebagai Data Analyst.",
};

export default function AboutPage() {
    return (
        <div className="pt-[var(--nav-h)]">
            <About />
            <Skills />
            <Experience />
        </div>
    );
}
