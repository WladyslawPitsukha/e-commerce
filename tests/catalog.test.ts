import { describe, expect, it } from "vitest";
import { calculateCartTotal, filterCatalogProducts, paginateCatalogProducts, sortCatalogProducts } from "@/utils/catalogUtils";
import { catalogProducts, getProductForRoute, getProductSlug, getProductsForCategory } from "@/utils/productRoutes";
import { getBrandNameFromSlug } from "@/utils/getBrandNameFromSlug";

describe("catalog utilities", () => {
    it("converts brand and product slugs", () => {
        expect(getBrandNameFromSlug("tommyHilfiger-jeans")).toBe("Tommy Hilfiger Jeans");
        const catalogProduct = catalogProducts[0];
        if (!catalogProduct) throw new Error("Expected catalog products");
        expect(getProductSlug(catalogProduct.product)).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    });

    it("resolves category aliases and products by id or slug", () => {
        const products = getProductsForCategory("casual");
        expect(products?.length).toBeGreaterThan(0);
        const product = products?.[0];
        if (!product) throw new Error("Expected casual products");
        expect(getProductForRoute("casualwear", String(product.id))).toEqual(product);
        expect(getProductForRoute("casual", getProductSlug(product))).toEqual(product);
        expect(getProductsForCategory("unknown")).toBeUndefined();
    });

    it("filters, sorts, paginates, and totals catalog data", () => {
        const filtered = filterCatalogProducts(catalogProducts, {
            query: "",
            minPrice: 0,
            maxPrice: Number.MAX_SAFE_INTEGER,
            categories: ["casualwear"],
            colors: [],
            sizes: [],
        });
        expect(filtered).toHaveLength(getProductsForCategory("casualwear")!.length);
        const ascending = sortCatalogProducts(filtered, "price-asc");
        const firstProduct = ascending[0];
        const lastProduct = ascending.at(-1);
        if (!firstProduct || !lastProduct) throw new Error("Expected filtered products");
        expect(firstProduct.product.price.mainPrice).toBeLessThanOrEqual(lastProduct.product.price.mainPrice);
        const page = paginateCatalogProducts(ascending, 99, 2);
        expect(page.currentPage).toBe(page.totalPages);
        expect(page.products.length).toBeLessThanOrEqual(2);
        expect(calculateCartTotal([{ unitPrice: 25, quantity: 2 }, { unitPrice: 10, quantity: 3 }])).toBe(80);
    });
});