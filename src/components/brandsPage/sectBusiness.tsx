"use client"

import dynamic from "next/dynamic";
import { useState } from "react";
import { CountryDataProps, SalesDataProps } from "@/types/typesProject";

const chartLoading = () => <div className="h-[320px] w-full animate-pulse rounded-xl bg-black/5 sm:h-[400px]" aria-label="Loading chart" />;
const mapLoading = () => <div className="h-[320px] w-full animate-pulse rounded-xl bg-black/5" aria-label="Loading map" />;

const PieChartD = dynamic(() => import("./diagrams/pieChartD"), {
    ssr: false,
    loading: chartLoading,
});
const BarChartD = dynamic(() => import("./diagrams/barChartD"), {
    ssr: false,
    loading: chartLoading,
});
const MapChart = dynamic(() => import("./mapChart"), {
    ssr: false,
    loading: mapLoading,
});

export default function SectBusiness({ brandName, country, growth, sales }: {
    brandName: string;
    country: CountryDataProps[];
    growth: SalesDataProps[];
    sales: SalesDataProps[];
}) {
    const [hoveredCountry, setHovered] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const handleCountryClick = (countryName: string) => {
        setSelectedCountry(countryName);
    };

    return (
        <section className="bg-[#f4f1e9] px-[var(--page-gutter)] py-14 sm:py-20">
            <div className="mx-auto max-w-[1440px]">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-black/20 pb-5">
                    <div><p className="brand-eyebrow text-[#ff6a4d]">Business pulse</p><h2 className="brand-display mt-3 text-4xl sm:text-6xl">Numbers in motion.</h2></div>
                    <p className="max-w-sm text-sm leading-6 text-black/60">Track {brandName}&apos;s yearly momentum, then explore the countries that carry its market footprint.</p>
                </div>
                <div className="grid gap-5 xl:grid-cols-2">
                    <PieChartD brandName={brandName} arrGrowth={growth} />
                    <BarChartD brandName={brandName} arrSales={sales} />
                </div>
                <div className="mt-8 grid gap-5 border border-black bg-[#10110e] p-4 text-[#f4f1e9] lg:grid-cols-[0.72fr_1.28fr] sm:p-6">
                    <div><p className="brand-eyebrow text-[#d7ff49]">Market reach</p><h3 className="brand-display mt-4 text-3xl sm:text-4xl">Choose a country</h3><p className="mt-3 text-sm leading-6 text-[#f4f1e9]/65">Hover to preview a location. Select it to pin the marker on the map.</p>
                        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">{country.map((item) => <button key={item.id} type="button" className={`border px-3 py-3 text-left text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#d7ff49] ${selectedCountry === item.country.countryName ? "border-[#d7ff49] bg-[#d7ff49] text-black" : "border-white/25 text-white hover:border-[#ff6a4d]"}`} onMouseEnter={() => setHovered(item.country.countryName)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(item.country.countryName)} onBlur={() => setHovered(null)} onClick={() => handleCountryClick(item.country.countryName)}>{item.country.countryName}</button>)}</div>
                    </div>
                    <div className="min-h-[320px] overflow-hidden border border-white/20 bg-white"><MapChart hoveredCountry={hoveredCountry} selectedCountry={selectedCountry} countryAll={country} /></div>
                </div>
            </div>
        </section>
    );
}