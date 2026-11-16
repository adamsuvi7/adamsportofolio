// CSS-built device frames. Sizes inside use container units (cqw), so a frame scales with its own width.

const StatusIcons = () => (
    <svg viewBox="0 0 58 12" aria-hidden="true">
        <path d="M1 9h2.4v2.5H1zM5 7h2.4v4.5H5zM9 4.6h2.4v6.9H9zM13 2h2.4v9.5H13z" fill="currentColor" />
        <path d="M27 3.2c2.3 0 4.3.9 5.8 2.4l-1.2 1.2A6.5 6.5 0 0 0 27 4.9c-1.8 0-3.4.7-4.6 1.9l-1.2-1.2A8.2 8.2 0 0 1 27 3.2zm0 3.3c1.4 0 2.6.5 3.5 1.4l-1.2 1.2a3.2 3.2 0 0 0-4.6 0l-1.2-1.2c.9-.9 2.1-1.4 3.5-1.4zm0 3.2 1.5 1.5-1.5 1.5-1.5-1.5z" fill="currentColor" />
        <rect x="38.5" y="1.5" width="16" height="9" rx="2.6" fill="none" stroke="currentColor" strokeOpacity=".5" />
        <rect x="40" y="3" width="13" height="6" rx="1.4" fill="currentColor" />
        <path d="M56 4.5v3c.8-.2 1.2-.8 1.2-1.500s-.4-1.300-1.200-1.500z" fill="currentColor" fillOpacity=".5" />
    </svg>
);

/** An iPhone Pro Max style frame around one screenshot. `bar` is the app's top-edge colour. */
export function Phone({ src, alt, bar = "#fff", dark = false }) {
    return (
        <div className="phone">
            <span className="phone-btn phone-btn-l1" aria-hidden="true" />
            <span className="phone-btn phone-btn-l2" aria-hidden="true" />
            <span className="phone-btn phone-btn-r" aria-hidden="true" />
            <div className="phone-body">
                <div className="phone-screen" style={{ background: bar, color: dark ? "#fff" : "#111" }}>
                    <div className="phone-status" aria-hidden="true">
                        <span>9:41</span>
                        <i className="phone-island" />
                        <StatusIcons />
                    </div>
                    <img key={src} src={src} alt={alt} width="660" height="1434" loading="lazy" className="screen-img" />
                    <i className="phone-home" style={{ background: dark ? "#fff" : "#111" }} aria-hidden="true" />
                </div>
            </div>
        </div>
    );
}

/** A MacBook style frame around one 16:10 screenshot. */
export function Laptop({ src, alt }) {
    return (
        <div className="laptop">
            <div className="laptop-lid">
                <i className="laptop-notch" aria-hidden="true" />
                <div className="laptop-screen">
                    <img key={src} src={src} alt={alt} width="1600" height="1000" loading="lazy" className="screen-img" />
                </div>
            </div>
            <div className="laptop-base" aria-hidden="true">
                <i />
            </div>
        </div>
    );
}
