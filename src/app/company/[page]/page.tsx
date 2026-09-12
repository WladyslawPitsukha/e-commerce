import { notFound } from "next/navigation";

const companyPages = {
    about: {
        title: "About SHOP.COM",
        description: "SHOP.COM is a fashion storefront for discovering considered pieces and finding a style that feels like your own.",
    },
    features: {
        title: "Features",
        description: "Explore responsive collections, product search, filters, reviews, brand stories, and a persistent shopping cart.",
    },
    works: {
        title: "How it works",
        description: "Browse a collection, refine your choices, open a product detail page, and keep your selections ready in your cart.",
    },
    career: {
        title: "Careers",
        description: "We are building thoughtful commerce experiences. Career opportunities will be posted here as the team grows.",
    },
} as const;

type Props = { params: Promise<{ page: string }> };

export function generateStaticParams() {
    return Object.keys(companyPages).map((page) => ({ page }));
}

export default async function CompanyPage({ params }: Props) {
    const { page } = await params;
    const content = companyPages[page as keyof typeof companyPages];
    if (!content) notFound();

    return (
        <main className="page-gutter mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center gap-5 py-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/50">SHOP.COM</p>
            <h1 className="text-4xl font-bold text-black">{content.title}</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-black/60">{content.description}</p>
        </main>
    );
}