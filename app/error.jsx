"use client";
import { useEffect } from "react";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
            <h1 className="h2">Terjadi kesalahan</h1>
            <p className="muted mt-3">Halaman gagal dimuat. Coba muat ulang.</p>
            <button type="button" onClick={() => reset()} className="btn btn-light mt-6" style={{ paddingRight: 18 }}>
                Coba lagi
            </button>
        </div>
    );
}
