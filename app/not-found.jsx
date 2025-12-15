import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-midnight text-white p-4">
            <h2 className="text-3xl font-bold mb-4 text-sky">404 - Not Found</h2>
            <p className="mb-8 text-gray-300">Could not find requested resource</p>
            <Link
                href="/"
                className="px-6 py-3 bg-sky hover:bg-blue-600 rounded-full transition-colors font-medium"
            >
                Return Home
            </Link>
        </div>
    );
}
