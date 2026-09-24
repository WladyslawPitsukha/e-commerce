import { notFound } from "next/navigation";
import React from "react";
import ProductTabs from "../../components/productTabs";
import { categoryAliases, getProductForRoute, getProductsForCategory, getProductSlug } from "@/utils/productRoutes";

type Props = {
    params: Promise<{
        category: string;
        product: string;
    }>;
};

export function generateStaticParams() {
    return Object.keys(categoryAliases).flatMap((category) => {
        const products = getProductsForCategory(category) ?? [];
        return products.map((product) => ({
            category,
            product: getProductSlug(product),
        }));
    });
}

export default async function ProductPage({ params }: Props) {
    const { category, product: productRoute } = await params;
    const product = getProductForRoute(category, productRoute);

    if (!product) {
        notFound();
    }

    return <ProductTabs product={product} category={category} />;
}