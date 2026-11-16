// Shared section opener: mono index, section name, and a large heading.
export default function SectionHead({ index, title, heading, dark = false, children }) {
    return (
        <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
                <p data-reveal="fade" className={`kicker flex items-center gap-3 ${dark ? "text-lavender-300" : "text-lavender-700"}`}>
                    <span>{index}</span>
                    <span className={`h-px w-10 ${dark ? "bg-lavender-300/50" : "bg-lavender-700/40"}`} aria-hidden="true" />
                    <span>{title}</span>
                </p>
                <h2 data-reveal="rise" className={`display mt-4 text-[clamp(2.2rem,6vw,4.25rem)] ${dark ? "text-white" : "text-ink"}`}>
                    {heading}
                </h2>
            </div>
            {children && (
                <div data-reveal="up" data-reveal-delay="120" className={`md:col-span-4 ${dark ? "text-periwinkle-200/85" : "text-ink-soft"}`}>
                    {children}
                </div>
            )}
        </header>
    );
}
