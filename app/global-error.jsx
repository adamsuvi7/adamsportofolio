'use client';

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body className="bg-midnight text-white">
                <div className="flex flex-col items-center justify-center min-h-screen p-4">
                    <h2 className="text-2xl font-bold mb-4 text-red-500">Something went wrong!</h2>
                    <p className="mb-4 text-gray-300">{error.message || "An unexpected global error occurred."}</p>
                    <button
                        onClick={() => reset()}
                        className="px-4 py-2 bg-sky hover:bg-blue-600 rounded-lg transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
