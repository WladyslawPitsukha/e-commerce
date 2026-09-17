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

export default function SectBusiness({ country, growth, sales }: {
    country: CountryDataProps[],
    growth: SalesDataProps[],
    sales: SalesDataProps[]
}) {
    const [hoveredCountry, setHovered] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const handleCountryClick = (countryName: string) => {
        setSelectedCountry(countryName);
    };

    return(
        <section className="flex flex-col w-full h-auto justify-around items-center bg-white my-10 px-[var(--page-gutter)]">
            <div className="grid grid-cols-1 xl:grid-cols-2 justify-items-center gap-8 w-full">
                <PieChartD 
                    arrGrowth={growth}
                />
                <BarChartD 
                    arrSales={sales}
                />
            </div>
            <div className='flex flex-col justify-center items-center gap-1 my-10 w-full'>
                <h2 className='text-2xl sm:text-3xl font-bold mb-8 text-black'>
                    List of counties 
                </h2>
                <div className='flex flex-col lg:flex-row justify-evenly items-center gap-8 w-full overflow-hidden'>
                    <article className='flex justify-center items-center p-[10px]'>
                        <ul className='text-black list-with-circles'>
                            {country.map(obj => (
                                <li key={obj.id}>
                                    <button
                                        type="button"
                                        className={`text-left text-black text-base sm:text-[20px] cursor-pointer hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${selectedCountry === obj.country.countryName ? "font-bold" : ""}`}
                                        onMouseEnter={() => setHovered(obj.country.countryName)}
                                        onMouseLeave={() => setHovered(null)}
                                        onFocus={() => setHovered(obj.country.countryName)}
                                        onBlur={() => setHovered(null)}
                                        onClick={() => handleCountryClick(obj.country.countryName)}
                                    >
                                        {obj.country.countryName}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </article>
                    <MapChart 
                        hoveredCountry={hoveredCountry}
                        selectedCountry={selectedCountry}
                        countryAll={country}
                    />
                </div>
            </div>
        </section>
    )
}