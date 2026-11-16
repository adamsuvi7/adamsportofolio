import Shell from "./components/Shell";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Viewer from "./components/Viewer";
import Experience from "./components/Experience";
import Stats from "./components/Stats";
import Credentials from "./components/Credentials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Sections marked `dark` are transparent, so the 3D stage shows through them;
// `light` sections are frosted cream glass laid over it.
export default function Home() {
    return (
        <Shell>
            <Navbar />
            <main id="konten">
                <Hero />
                <Profile />
                <Skills />
                <Projects />
                <Viewer />
                <Experience />
                <Stats />
                <Credentials />
                <Contact />
            </main>
            <Footer />
        </Shell>
    );
}
