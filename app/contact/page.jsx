import Contact from "../components/Contact";

export const metadata = {
    title: "Contact | Adam Suvi",
    description: "Get in touch with Adam Suvi for data analysis opportunities.",
};

export default function ContactPage() {
    return (
        <div className="pt-16">
            <Contact />
        </div>
    );
}
