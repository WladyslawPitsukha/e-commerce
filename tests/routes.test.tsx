import React from "react";
import { describe, expect, it, vi } from "vitest";
import { arrBrands } from "@/constants/brands/arrBrands";

const notFound = vi.fn(() => {
    throw new Error("NOT_FOUND");
});

vi.mock("next/navigation", () => ({ notFound }));
vi.mock("@/components/mainPage/clothesCard", () => ({ default: () => <div /> }));
vi.mock("@/app/(services)/shop/components/productTabs", () => ({ default: () => <div /> }));
vi.mock("@/components/brandsPage/headSect", () => ({ default: () => <div /> }));
vi.mock("@/components/brandsPage/sectBusiness", () => ({ default: () => <div /> }));
vi.mock("@/components/brandsPage/sectPartners", () => ({ default: () => <div /> }));
vi.mock("@/components/brandsPage/sectComprasion", () => ({ default: () => <div /> }));

describe("catalog routes", () => {
    it("renders a valid category and rejects an invalid category", async () => {
        const CategoryPage = (await import("@/app/(services)/shop/[category]/page")).default;
        await expect(CategoryPage({ params: Promise.resolve({ category: "casual" }) })).resolves.toBeTruthy();
        await expect(CategoryPage({ params: Promise.resolve({ category: "unknown" }) })).rejects.toThrow("NOT_FOUND");
    });

    it("renders a valid product and rejects an invalid product", async () => {
        const ProductPage = (await import("@/app/(services)/shop/[category]/[product]/page")).default;
        await expect(ProductPage({ params: Promise.resolve({ category: "casual", product: "1" }) })).resolves.toBeTruthy();
        await expect(ProductPage({ params: Promise.resolve({ category: "casual", product: "missing-product" }) })).rejects.toThrow("NOT_FOUND");
    });

    it("renders a valid brand and rejects an invalid brand", async () => {
        const BrandPage = (await import("@/app/(services)/brands/[brands]/page")).default;
        const validSlug = arrBrands[0]?.brand.name.toLowerCase().replace(/\s+/g, "-");
        if (!validSlug) throw new Error("Expected a brand");
        await expect(BrandPage({ params: Promise.resolve({ brands: validSlug }) })).resolves.toBeTruthy();
        await expect(BrandPage({ params: Promise.resolve({ brands: "unknown-brand" }) })).rejects.toThrow("NOT_FOUND");
    });
});