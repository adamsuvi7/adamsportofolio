import Link from "next/link";

export default function NotFound() {
    return (
        <div className="hero flex min-h-screen flex-col items-center justify-center px-5 text-center text-white">
            <p className="kicker text-lavender-300">404</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">Halaman tidak ditemukan</h1>
            <p className="mt-4 text-periwinkle-200">Tautan ini tidak mengarah ke mana pun. / This link leads nowhere.</p>
            <Link href="/" className="btn btn-primary mt-8">
                Kembali ke beranda
            </Link>
        </div>
    );
}
