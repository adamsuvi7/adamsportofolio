import Projects from "../components/Projects";

export const metadata = {
    title: "Projects | Adam Suvi",
    description: "Explore data analysis and visualization projects by Adam Suvi.",
};

export default function ProjectsPage() {
    return (
        <div className="pt-16">
            <Projects />
        </div>
    );
}
