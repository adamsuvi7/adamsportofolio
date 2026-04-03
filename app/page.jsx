import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import FeaturedProject from "./components/FeaturedProject";
import Organization from "./components/Organization";
import Achievement from "./components/Achievement";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import BnspCertificate from "./components/BnspCertificate";

import dynamic from 'next/dynamic';

const ThreeBackground = dynamic(() => import('./components/ThreeBackground'), { ssr: false });

export default function Home() {
    return (
        <>
            <ThreeBackground />
            <section id="home">
                <Hero />
            </section>
            <section id="about">
                <About />
                <BnspCertificate />
                <Skills />
                <FeaturedProject />
                <Organization />
                <Achievement />
            </section>
            <section id="projects">
                <Projects />
            </section>
            <section id="certificate">
                <Certificates />
            </section>
            <section id="contact">
                <Contact />
            </section>
        </>
    );
}
