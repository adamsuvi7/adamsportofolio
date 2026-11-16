import Projects from "../components/Projects";

export const metadata = {
    title: "Proyek",
    description: "Proyek analisis data dan pengembangan oleh Adam Suvi.",
};

export default function ProjectsPage() {
    return (
        <div className="bg-deep-900 pt-[var(--nav-h)]">
            <Projects />
        </div>
    );
}
