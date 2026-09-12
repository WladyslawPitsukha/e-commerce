"use client"

import PieChartD from './diagrams/pieChartD';
import BarChartD from './diagrams/barChartD';
import MapChart from "./mapChart";

import { useState } from "react";
import { CountryDataProps, SalesDataProps } from "@/types/typesProject";

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
                                <li 
                                    key={obj.id} 
                                    className='text-black font text-base sm:text-[20px] cursor-pointer hover:text-gray-600'
                                    onMouseEnter={() => setHovered(obj.country.countryName)}
                                    onMouseLeave={() => setHovered(null)}
                                    onClick={() => handleCountryClick(obj.country.countryName)}
                                >
                                    {obj.country.countryName}
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