import About from "../components/About";
import Skills from "../components/Skills";
import Organization from "../components/Organization";
import Achievement from "../components/Achievement";
import BnspCertificate from "../components/BnspCertificate";

export const metadata = {
    title: "About | Adam Suvi",
    description: "Learn more about Adam Suvi's background, skills, and experience.",
};

export default function AboutPage() {
    return (
        <div className="pt-16">
            <About />
            <Skills />
            <Organization />
            <Achievement />
            <BnspCertificate />
        </div>
    );
}
