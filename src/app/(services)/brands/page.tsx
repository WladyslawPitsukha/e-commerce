"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { arrBrands } from "@/constants/brands/arrBrands";
import Footer from "@/components/mainPage/footer";
import NavBar from "@/components/mainPage/navbar";

function getBrandSlug(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-");
}

export default function BrandsListPage() {
    return (
        <div className="brand-shell">
            <NavBar />
            <main id="main-content" className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-[var(--page-gutter)] pb-16 pt-6 sm:gap-14 sm:pt-10">
                <section className="relative isolate overflow-hidden border border-black bg-[#10110e] px-6 py-10 text-[#f4f1e9] shadow-[10px_10px_0_#10110e] sm:px-10 sm:py-14 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-10">
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#d7ff49]/60 sm:-right-16 sm:-top-16 sm:h-96 sm:w-96" />
                    <div className="brand-orbit absolute -right-10 top-8 h-44 w-44 rounded-full border border-dashed border-[#ff6a4d] sm:right-12 sm:top-16" />
                    <div className="relative z-10 max-w-3xl">
                        <p className="brand-eyebrow text-[#d7ff49]">The label index</p>
                        <h1 className="brand-display mt-6 max-w-3xl text-5xl leading-[0.92] sm:text-7xl lg:text-8xl">Brands with a point of view.</h1>
                        <p className="mt-6 max-w-xl text-base leading-7 text-[#f4f1e9]/75 sm:text-lg">A living edit of fashion houses, their stories, and the markets that shape their next chapter.</p>
                    </div>
                    <div className="relative z-10 mt-10 border-l border-[#f4f1e9]/30 pl-5 lg:mt-0">
                        <p className="text-4xl font-bold text-[#d7ff49]">{arrBrands.length}</p>
                        <p className="mt-1 text-sm uppercase tracking-[0.14em] text-[#f4f1e9]/65">studios in the index</p>
                    </div>
                </section>

                <section aria-labelledby="brand-directory-title">
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-black/20 pb-4">
                        <div>
                            <p className="brand-eyebrow text-[#ff6a4d]">Browse the houses</p>
                            <h2 id="brand-directory-title" className="brand-display mt-3 text-3xl sm:text-5xl">The directory</h2>
                        </div>
                        <p className="max-w-sm text-sm leading-6 text-black/60">Open a profile to explore the narrative, business pulse, global reach, and partner network.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {arrBrands.map((brandData, index) => {
                            const { id, name } = brandData.brand;
                            const photo = brandData.description.photos[0]?.img;
                            return (
                                <Link key={id} href={`/brands/${getBrandSlug(name)}`} aria-label={`Explore ${name}`} className="brand-card-3d brand-float-in group relative block overflow-hidden border border-black bg-[#f4f1e9] p-3 focus:outline-none focus:ring-4 focus:ring-[#ff6a4d]" style={{ animationDelay: `${index * 90}ms` }}>
                                    <div className="brand-media-zoom relative aspect-[4/3] overflow-hidden bg-[#c7d5c6]">
                                        {photo ? <Image src={photo} alt={`${name} collection`} fill sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) calc(50vw - 3rem), 400px" className="object-cover" /> : <div className="grid h-full place-items-center text-sm font-bold uppercase tracking-[0.16em]">No campaign image</div>}
                                        <span className="absolute left-3 top-3 bg-[#d7ff49] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-black">{String(index + 1).padStart(2, "0")}</span>
                                    </div>
                                    <div className="grid gap-4 px-2 pb-2 pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
                                        <div><h3 className="brand-display text-3xl sm:text-4xl">{name}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-black/65">{brandData.description.story[0] ?? "Explore this house."}</p></div>
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#10110e] text-xl text-[#d7ff49] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">&#8599;</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}