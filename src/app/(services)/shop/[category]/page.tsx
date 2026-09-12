import { notFound } from "next/navigation";
import { categoryProducts } from "@/constants/category'/arrCategory";
import ProductTabs from "../components/productTabs";

const categoryAliases: Record<string, keyof typeof categoryProducts> = {
    active: "activewear",
    activewear: "activewear",
    casual: "casualwear",
    casualwear: "casualwear",
    formal: "officewear",
    office: "officewear",
    officewear: "officewear",
    party: "partywear",
    partywear: "partywear",
    summer: "summerwear",
    summerwear: "summerwear",
    winter: "winterwear",
    winterwear: "winterwear",
    gym: "activewear",
};

type Props = {
    params: Promise<{ category: string }>;
};

export function generateStaticParams() {
    return Object.keys(categoryAliases).map((category) => ({ category }));
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;
    const categoryKey = categoryAliases[category.toLowerCase()];
    const products = categoryKey ? categoryProducts[categoryKey] : undefined;

    if (!products?.length) {
        notFound();
    }

    return <ProductTabs product={products[0]!} />;
}