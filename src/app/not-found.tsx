import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50">404</p>
            <h1 className="text-3xl font-bold text-black">Page not found</h1>
            <p className="max-w-md text-black/60">
                The product, category, or brand you requested does not exist.
            </p>
            <Link href="/shop" className="rounded-full bg-black px-6 py-3 font-medium text-white">
                Browse the shop
            </Link>
        </main>
    );
}