"use client"

import Link from "next/link";
import Image from "next/image";
import { arrBrands } from "../../../constants/brands/arrBrands";
import Footer from "@/components/mainPage/footer";
import NavBar from "@/components/mainPage/navbar";
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';

function getBrandSlug(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-");
}

export default function BrandsListPage() {
    return (
        <div className="min-h-screen flex flex-col items-center py-8 sm:py-12 px-[var(--page-gutter)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 animate-fade-in">
            <NavBar />
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-center relative animate-slide-down">
                <span className="bg-gradient-to-r from-gray-100 via-gray-400 to-gray-900 bg-clip-text text-transparent">Our Brands</span>
                <span className="block h-1 w-24 mx-auto mt-2 rounded-full bg-gradient-to-r from-gray-400 via-gray-600 to-gray-900 animate-underline" />
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 w-full max-w-5xl px-0 sm:px-4 mt-6">
                {arrBrands.slice(0, 5).map((brandObj, idx) => {
                    const { name, id } = brandObj.brand;
                    const photo = brandObj.description.photos[0]?.img
                    const slug = getBrandSlug(name);
                    return (
                        <Link
                            key={id}
                            href={`/brands/${slug}`}
                            className="block bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer group border border-gray-700 hover:border-gray-400 relative overflow-hidden animate-fade-in"
                            style={{ animationDelay: `${idx * 80}ms` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-700/30 via-gray-900/20 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                            {photo ? (
                                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md shadow-md">
                                <Image
                                    src={photo}
                                    alt={name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 320px"
                                    className="z-10 object-cover grayscale transition-transform duration-300 group-hover:scale-105 group-hover:grayscale-0"
                                />
                                </div>
                            ) : (
                                <BrandingWatermarkIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            )}
                            <h2 className="text-2xl font-bold mb-2 text-center text-gray-100 group-hover:text-white transition-colors duration-200 z-10 relative drop-shadow-lg">
                                {name}
                            </h2>
                            <p className="text-gray-400 text-center line-clamp-2 z-10 relative">
                                {brandObj.description.story?.[0] || "Discover more about this brand."}
                            </p>
                            <span className="absolute right-4 top-4 bg-gray-800/90 text-gray-200 px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border border-gray-700 shadow">
                                View
                            </span>
                        </Link>
                    );
                })}
            </div>
            <Footer />
        </div>
    );
}