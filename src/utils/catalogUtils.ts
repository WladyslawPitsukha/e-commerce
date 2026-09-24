import { CatalogProduct } from "@/utils/productRoutes";

export type CatalogSortOption = "popular" | "price-asc" | "price-desc" | "rating" | "newest";

export interface CatalogFilters {
    query: string;
    minPrice: number;
    maxPrice: number;
    categories: string[];
    colors: string[];
    sizes: string[];
}

export function filterCatalogProducts(products: CatalogProduct[], filters: CatalogFilters) {
    const query = filters.query.trim().toLowerCase();
    return products.filter(({ category, product }) => {
        const matchesQuery = !query || `${product.title} ${product.description}`.toLowerCase().includes(query);
        const matchesPrice = product.price.mainPrice >= filters.minPrice && product.price.mainPrice <= filters.maxPrice;
        const matchesCategory = filters.categories.length === 0 || filters.categories.includes(category);
        const matchesColor = filters.colors.length === 0 || product.details.colors.some((color) => filters.colors.includes(color.title));
        const matchesSize = filters.sizes.length === 0 || product.details.sizes.some((size) => filters.sizes.includes(size.title));
        return matchesQuery && matchesPrice && matchesCategory && matchesColor && matchesSize;
    });
}

export function sortCatalogProducts(products: CatalogProduct[], sort: CatalogSortOption) {
    return [...products].sort((left, right) => {
        if (sort === "price-asc") return left.product.price.mainPrice - right.product.price.mainPrice;
        if (sort === "price-desc") return right.product.price.mainPrice - left.product.price.mainPrice;
        if (sort === "rating" || sort === "popular") return right.product.grade - left.product.grade;
        return right.product.id - left.product.id;
    });
}

export function paginateCatalogProducts<T>(products: T[], page: number, pageSize: number) {
    const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    return {
        currentPage,
        totalPages,
        products: products.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    };
}

export function calculateCartTotal(items: Array<{ unitPrice: number; quantity: number }>) {
    return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
}