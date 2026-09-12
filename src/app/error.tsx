"use client";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
            <h1 className="text-3xl font-bold text-black">Something went wrong</h1>
            <p className="max-w-md text-black/60">
                We could not load this page. Please try again.
            </p>
            <button
                type="button"
                onClick={() => reset()}
                className="rounded-full bg-black px-6 py-3 font-medium text-white"
            >
                Try again
            </button>
        </main>
    );
}