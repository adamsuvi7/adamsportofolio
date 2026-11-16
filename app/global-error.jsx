"use client";

// Replaces the root layout when it fails, so it carries its own minimal styles.
export default function GlobalError({ reset }) {
    return (
        <html lang="id">
            <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#0B0B0E", color: "#fff", fontFamily: "system-ui, sans-serif", textAlign: "center", padding: "1.25rem" }}>
                <div>
                    <h1 style={{ fontSize: "2rem", margin: 0 }}>Terjadi kesalahan</h1>
                    <p style={{ color: "rgba(242,238,228,.64)" }}>Halaman gagal dimuat. Coba muat ulang.</p>
                    <button type="button" onClick={() => reset()} style={{ marginTop: "1rem", padding: "0.75rem 1.5rem", borderRadius: "999px", border: 0, background: "#FF6B1A", color: "#000", fontWeight: 600, cursor: "pointer" }}>
                        Coba lagi
                    </button>
                </div>
            </body>
        </html>
    );
}
