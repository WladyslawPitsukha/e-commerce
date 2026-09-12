import { notFound } from "next/navigation";
import Link from "next/link";
import ClothesCard from "@/components/mainPage/clothesCard";
import { categoryAliases, getProductsForCategory, getProductSlug } from "@/utils/productRoutes";

type Props = {
    params: Promise<{ category: string }>;
};

export function generateStaticParams() {
    return Object.keys(categoryAliases).map((category) => ({ category }));
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;
    const products = getProductsForCategory(category);

    if (!products?.length) {
        notFound();
    }

    return (
        <main className="flex w-full flex-col gap-8 px-[var(--page-gutter)] py-8 sm:py-12">
            <div className="flex items-center gap-2 text-sm text-black/60">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>{category}</span>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold capitalize text-black sm:text-4xl">{category} products</h1>
                <p className="text-black/60">Choose a product to view its details, reviews, and FAQs.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/shop/${category}/${getProductSlug(product)}`}
                        className="rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    >
                        <ClothesCard {...product} />
                    </Link>
                ))}
            </div>
        </main>
    );
}