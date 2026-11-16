import Credentials from "../components/Credentials";

export const metadata = {
    title: "Kredensial",
    description: "Pendidikan, sertifikasi BNSP, dan sertifikat kursus Adam Suvi.",
};

export default function CertificatePage() {
    return (
        <div className="pt-[var(--nav-h)]">
            <Credentials />
        </div>
    );
}
