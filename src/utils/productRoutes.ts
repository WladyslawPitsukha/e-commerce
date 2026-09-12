import { categoryProducts } from "@/constants/category'/arrCategory";
import { ProductCardProps } from "@/types/typesProject";

export interface CatalogProduct {
    category: string;
    product: ProductCardProps;
}

export const categoryAliases: Record<string, keyof typeof categoryProducts> = {
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

export function getProductsForCategory(category: string): ProductCardProps[] | undefined {
    const categoryKey = categoryAliases[category.toLowerCase()];
    return categoryKey ? categoryProducts[categoryKey] : undefined;
}

export function getProductSlug(product: ProductCardProps): string {
    return product.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export function getProductForRoute(
    category: string,
    productRoute: string,
): ProductCardProps | undefined {
    const products = getProductsForCategory(category);
    if (!products) {
        return undefined;
    }

    return products.find(
        (product) => product.id.toString() === productRoute || getProductSlug(product) === productRoute,
    );
}

export const catalogProducts: CatalogProduct[] = Object.entries(categoryProducts).flatMap(
    ([category, products]) => products.map((product) => ({ category, product })),
);
