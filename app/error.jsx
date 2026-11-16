"use client";
import { useEffect } from "react";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="hero flex min-h-screen flex-col items-center justify-center px-5 text-center text-white">
            <h1 className="display text-4xl md:text-6xl">Terjadi kesalahan</h1>
            <p className="mt-4 text-periwinkle-200">Halaman gagal dimuat. Coba muat ulang.</p>
            <button type="button" onClick={() => reset()} className="btn btn-primary mt-8">
                Coba lagi
            </button>
        </div>
    );
}
