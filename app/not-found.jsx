import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
            <p className="label">404</p>
            <h1 className="h2">Halaman tidak ditemukan</h1>
            <p className="muted mt-3">Tautan ini tidak mengarah ke mana pun. / This link leads nowhere.</p>
            <Link href="/" className="btn btn-light mt-6" style={{ paddingRight: 18 }}>
                Kembali ke beranda
            </Link>
        </div>
    );
}
