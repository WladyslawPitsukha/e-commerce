import Link from "next/link";
import React from "react";
import { BasicPropsBrand, CountryDataProps } from "@/types/typesProject";

type MetricKey = "revenue" | "marketShare" | "storeCount";

const metricLabels: Record<MetricKey, string> = {
    revenue: "Average revenue",
    marketShare: "Market share",
    storeCount: "Store footprint",
};

function average(countryData: CountryDataProps[], metric: MetricKey) {
    if (!countryData.length) return 0;
    return countryData.reduce((total, country) => total + country.financeData[metric], 0) / countryData.length;
}

function metricValue(metric: MetricKey, value: number) {
    if (metric === "revenue") return `$${Math.round(value)}m`;
    if (metric === "marketShare") return `${Math.round(value)}%`;
    return Math.round(value).toLocaleString();
}

export default function SectComprasion({ brand, country }: { brand: BasicPropsBrand; country: CountryDataProps[] }) {
    const metrics = (Object.keys(metricLabels) as MetricKey[]).map((metric) => ({
        label: metricLabels[metric],
        value: metricValue(metric, average(country, metric)),
    }));

    return (
        <section className="w-full bg-[#c7d5c6] px-[var(--page-gutter)] py-14 sm:py-20">
            <div className="mx-auto max-w-[1440px]">
                <div className="grid gap-7 border-b border-black/25 pb-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                    <div><p className="brand-eyebrow text-[#10110e]">Market snapshot</p><h2 className="brand-display mt-3 text-4xl sm:text-6xl">The {brand.name} signal.</h2></div>
                    <p className="max-w-2xl text-sm leading-6 text-black/65 sm:text-base">A country-level average across the current footprint. This view is designed to compare the shape of a brand&apos;s business at a glance, without forcing dense tables onto smaller screens.</p>
                </div>
                <div className="brand-metric-grid mt-7 border border-black">
                    {metrics.map((metric, index) => <article key={metric.label} className="min-h-44 p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.14em] text-black/55">0{index + 1} / {metric.label}</p><p className="brand-display mt-7 text-5xl sm:text-6xl">{metric.value}</p></article>)}
                </div>
                {brand.links ? <div className="mt-7 flex flex-wrap gap-3"><Link href={brand.links.mainLink} className="border border-black bg-[#10110e] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#d7ff49]">Explore {brand.name}</Link><Link href={brand.links.webpageLink} className="border border-black px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black">Official website &#8599;</Link></div> : null}
            </div>
        </section>
    );
}