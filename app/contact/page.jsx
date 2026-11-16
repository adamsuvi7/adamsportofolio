import Contact from "../components/Contact";

export const metadata = {
    title: "Kontak",
    description: "Hubungi Adam Suvi untuk peluang Data Analyst dan proyek lepas.",
};

export default function ContactPage() {
    return (
        <div className="bg-airy pt-[calc(var(--nav-h)+2rem)]">
            <Contact />
        </div>
    );
}
