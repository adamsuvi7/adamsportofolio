import Certificates from "../components/Certificates";

export const metadata = {
    title: "Certificates | Adam Suvi",
    description: "Professional certificates and training completed by Adam Suvi.",
};

export default function CertificatePage() {
    return (
        <div className="pt-16">
            <Certificates />
        </div>
    );
}
