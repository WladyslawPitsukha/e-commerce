"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import ClothesCard from "@/components/mainPage/clothesCard";
import Footer from "@/components/mainPage/footer";
import NavBar from "@/components/mainPage/navbar";
import { CatalogProduct, getProductSlug } from "@/utils/productRoutes";

type SortOption = "popular" | "price-asc" | "price-desc" | "rating" | "newest";

const categoryLabels: Record<string, string> = {
    activewear: "Activewear",
    casualwear: "Casual",
    officewear: "Office",
    partywear: "Party",
    summerwear: "Summer",
    winterwear: "Winter",
};

function FilterPanel({
    products,
    minPrice,
    maxPrice,
    selectedColors,
    selectedSizes,
    selectedCategories,
    onMinPrice,
    onMaxPrice,
    onColor,
    onSize,
    onCategory,
}: {
    products: CatalogProduct[];
    minPrice: number;
    maxPrice: number;
    selectedColors: string[];
    selectedSizes: string[];
    selectedCategories: string[];
    onMinPrice: (value: number) => void;
    onMaxPrice: (value: number) => void;
    onColor: (value: string) => void;
    onSize: (value: string) => void;
    onCategory: (value: string) => void;
}) {
    const colors = [...new Set(products.flatMap(({ product }) => product.details.colors.map((color) => color.title)))].sort();
    const sizes = [...new Set(products.flatMap(({ product }) => product.details.sizes.map((size) => size.title)))].sort();
    const categories = [...new Set(products.map(({ category }) => category))].sort();

    return (
        <div className="flex flex-col gap-5 text-black">
            <fieldset className="flex flex-col gap-3">
                <legend className="font-bold">Price range</legend>
                <div className="grid grid-cols-2 gap-2">
                    <label className="text-xs text-black/60">
                        Min
                        <input type="number" min={0} value={minPrice} onChange={(event) => onMinPrice(Number(event.target.value))} className="mt-1 w-full rounded-md border p-2 text-sm" />
                    </label>
                    <label className="text-xs text-black/60">
                        Max
                        <input type="number" min={0} value={maxPrice} onChange={(event) => onMaxPrice(Number(event.target.value))} className="mt-1 w-full rounded-md border p-2 text-sm" />
                    </label>
                </div>
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <legend className="font-bold">Category</legend>
                {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 text-sm text-black/70">
                        <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => onCategory(category)} />
                        {categoryLabels[category] ?? category}
                    </label>
                ))}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <legend className="font-bold">Colors</legend>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <button type="button" key={color} onClick={() => onColor(color)} className={`rounded-full border px-3 py-1 text-xs ${selectedColors.includes(color) ? "border-black bg-black text-white" : "border-black/20"}`}>
                            {color}
                        </button>
                    ))}
                </div>
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <legend className="font-bold">Sizes</legend>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <button type="button" key={size} onClick={() => onSize(size)} className={`rounded-full border px-3 py-1 text-xs ${selectedSizes.includes(size) ? "border-black bg-black text-white" : "border-black/20"}`}>
                            {size}
                        </button>
                    ))}
                </div>
            </fieldset>
        </div>
    );
}

export default function ShopCatalog({
    products,
    initialQuery = "",
}: {
    products: CatalogProduct[];
    initialQuery?: string;
}) {
    const [query, setQuery] = useState(initialQuery);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Number.MAX_SAFE_INTEGER);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sort, setSort] = useState<SortOption>("popular");
    const [page, setPage] = useState(1);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const filterHeadingRef = useRef<HTMLHeadingElement>(null);
    const pageSize = 9;

    const filteredProducts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        const result = products.filter(({ category, product }) => {
            const matchesQuery = !normalizedQuery || `${product.title} ${product.description}`.toLowerCase().includes(normalizedQuery);
            const matchesPrice = product.price.mainPrice >= minPrice && product.price.mainPrice <= maxPrice;
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
            const matchesColor = selectedColors.length === 0 || product.details.colors.some((color) => selectedColors.includes(color.title));
            const matchesSize = selectedSizes.length === 0 || product.details.sizes.some((size) => selectedSizes.includes(size.title));
            return matchesQuery && matchesPrice && matchesCategory && matchesColor && matchesSize;
        });

        return [...result].sort((left, right) => {
            if (sort === "price-asc") return left.product.price.mainPrice - right.product.price.mainPrice;
            if (sort === "price-desc") return right.product.price.mainPrice - left.product.price.mainPrice;
            if (sort === "rating") return right.product.grade - left.product.grade;
            if (sort === "newest") return right.product.id - left.product.id;
            return right.product.grade - left.product.grade;
        });
    }, [maxPrice, minPrice, products, query, selectedCategories, selectedColors, selectedSizes, sort]);

    useEffect(() => setPage(1), [maxPrice, minPrice, query, selectedCategories, selectedColors, selectedSizes, sort]);
    useEffect(() => {
        if (filtersOpen) filterHeadingRef.current?.focus();
    }, [filtersOpen]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const visibleProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const filterProps = {
        products,
        minPrice,
        maxPrice,
        selectedColors,
        selectedSizes,
        selectedCategories,
        onMinPrice: setMinPrice,
        onMaxPrice: setMaxPrice,
        onColor: (value: string) => setSelectedColors((values) => values.includes(value) ? values.filter((item) => item !== value) : [...values, value]),
        onSize: (value: string) => setSelectedSizes((values) => values.includes(value) ? values.filter((item) => item !== value) : [...values, value]),
        onCategory: (value: string) => setSelectedCategories((values) => values.includes(value) ? values.filter((item) => item !== value) : [...values, value]),
    };

    return (
        <div className="flex min-h-screen flex-col bg-white page-gutter">
            <NavBar />
            <main className="flex w-full flex-col gap-6 pb-10">
                <div className="flex items-center gap-2 text-sm text-black/60"><Link href="/">Home</Link><span>/</span><span>Shop</span></div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-2xl font-bold text-black sm:text-3xl">{initialQuery ? `Search results for “${initialQuery}”` : "Shop"}</h1>
                    <button type="button" onClick={() => setFiltersOpen(true)} className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm lg:hidden"><TuneIcon fontSize="small" /> Filters</button>
                </div>
                <div className="flex items-start gap-6">
                    <aside className="hidden w-[295px] shrink-0 rounded-[20px] border border-black/10 p-5 lg:block">
                        <h2 className="mb-5 text-xl font-bold">Filters</h2>
                        <FilterPanel {...filterProps} />
                    </aside>
                    {filtersOpen && <div className="fixed inset-0 z-[60] bg-black/40 lg:hidden" onClick={() => setFiltersOpen(false)}><aside role="dialog" aria-modal="true" aria-label="Product filters" className="h-full w-[min(22rem,90vw)] overflow-y-auto bg-white p-5" onClick={(event) => event.stopPropagation()}><div className="mb-5 flex items-center justify-between"><h2 ref={filterHeadingRef} tabIndex={-1} className="text-xl font-bold">Filters</h2><button type="button" onClick={() => setFiltersOpen(false)} className="rounded-full border px-3 py-1">Close</button></div><FilterPanel {...filterProps} /></aside></div>}
                    <section className="min-w-0 flex-1">
                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <label className="flex-1"><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products..." className="w-full rounded-full border bg-[#F0F0F0] px-5 py-3 outline-none focus:ring-2 focus:ring-black" /></label>
                            <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className="rounded-full border px-4 py-3 text-sm" aria-label="Sort products">
                                <option value="popular">Most Popular</option><option value="price-asc">Price: Low to high</option><option value="price-desc">Price: High to low</option><option value="rating">Top rated</option><option value="newest">Newest</option>
                            </select>
                        </div>
                        <p className="mb-4 text-sm text-black/60">Showing {visibleProducts.length ? (currentPage - 1) * pageSize + 1 : 0}-{Math.min(currentPage * pageSize, filteredProducts.length)} of {filteredProducts.length} products</p>
                        {visibleProducts.length === 0 ? <div className="rounded-2xl border border-dashed p-12 text-center"><h2 className="text-xl font-bold">No products found</h2><p className="mt-2 text-black/60">Try changing your search or filters.</p></div> : <div className="grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-3">{visibleProducts.map(({ category, product }) => <Link key={`${category}-${product.id}`} href={`/shop/${category}/${getProductSlug(product)}`} className="rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"><ClothesCard {...product} /></Link>)}</div>}
                        <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Product pages">{Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => <button type="button" key={item} onClick={() => setPage(item)} aria-current={currentPage === item ? "page" : undefined} className={`rounded-full border px-4 py-2 ${currentPage === item ? "bg-black text-white" : "bg-white"}`}>{item}</button>)}</nav>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}