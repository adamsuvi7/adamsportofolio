'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-midnight text-white p-4">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Something went wrong!</h2>
            <p className="mb-4 text-gray-300">{error.message || "An unexpected error occurred."}</p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-sky hover:bg-blue-600 rounded-lg transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
