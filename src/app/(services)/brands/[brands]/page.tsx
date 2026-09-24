import { arrBrands } from "@/constants/brands/arrBrands";
import { getBrandNameFromSlug } from "@/utils/getBrandNameFromSlug";
import React from "react";
import HeaderSect from "@/components/brandsPage/headSect";
import SectBusiness from "@/components/brandsPage/sectBusiness";
import SectPartners from "@/components/brandsPage/sectPartners";
import SectComprasion from "@/components/brandsPage/sectComprasion";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ brands: string }>;
};

export function generateStaticParams() {
  return arrBrands.map((b) => ({
    brands: b.brand.name.toLowerCase().replace(/\s+/g, "-"),
  }))
}

export default async function BrandPage({ params }: Props) {
  const { brands: brandSlug } = await params;
  const brandName = getBrandNameFromSlug(brandSlug);

  const brandData =
    arrBrands.find(
      (brand) =>
        brand.brand.name.toLowerCase() === brandName.toLowerCase()
    ) || null;

  if (!brandData) {
    notFound();
  }

  const { brand, description, business, partners } = brandData;
  const { id, name } = brand;
  const { story, photos } = description;
  const { countryData, growthData, salesData } = business;

    return (
    <div className="brand-shell flex flex-col justify-center">
      <HeaderSect id={id} name={name} story={story} photos={photos} />
      <main className="flex flex-col items-center justify-between">
        <SectBusiness
          brandName={name}
          country={countryData}
          growth={growthData}
          sales={salesData}
        />
        <SectPartners partners={partners} />
        <SectComprasion brand={brand} country={countryData} />
      </main>
    </div>
  );
}