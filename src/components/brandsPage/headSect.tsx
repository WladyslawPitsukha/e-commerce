import Image from "next/image";
import React from "react";
import { ProductProps } from "@/types/typesProject";

interface HeaderProps {
    id: number;
    name: string;
    story: string[];
    photos: ProductProps[];
}

export default function HeaderSect({ id, name, story, photos }: HeaderProps) {
    const featuredPhoto = photos[0];
    const gallery = photos.slice(1, 5);

    return (
        <header className="relative isolate overflow-hidden bg-[#10110e] px-[var(--page-gutter)] pb-12 pt-10 text-[#f4f1e9] sm:pb-20 sm:pt-16">
            <div className="absolute inset-x-0 top-0 h-2 bg-[#d7ff49]" />
            <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full border border-[#ff6a4d]/70" />
            <div className="relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                <article className="order-2 lg:order-1">
                    <p className="brand-eyebrow text-[#d7ff49]">Brand profile {String(id).padStart(2, "0")}</p>
                    <h1 className="brand-display mt-6 text-6xl leading-[0.9] sm:text-8xl">{name}</h1>
                    <p className="mt-7 max-w-2xl text-lg leading-8 text-[#f4f1e9]/78 sm:text-xl">{story[0]}</p>
                    <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[#10110e]">
                        <span className="bg-[#d7ff49] px-3 py-2">Editorial story</span>
                        <span className="bg-[#ff6a4d] px-3 py-2">Global pulse</span>
                    </div>
                </article>
                <div className="order-1 grid grid-cols-6 gap-2 sm:gap-3 lg:order-2">
                    {featuredPhoto ? <div className="brand-media-zoom col-span-4 row-span-2 relative min-h-72 overflow-hidden border border-[#f4f1e9]/30 bg-[#c7d5c6] sm:min-h-[34rem]"><Image src={featuredPhoto.img} alt={`${name} featured collection`} fill priority sizes="(max-width: 1023px) 66vw, 42vw" className="object-cover" /></div> : null}
                    {gallery.map((photo, index) => <div key={photo.id} className={`brand-media-zoom relative ${index === 0 ? "col-span-2 row-span-2" : "col-span-2"} min-h-28 overflow-hidden border border-[#f4f1e9]/30 bg-[#c7d5c6]`}><Image src={photo.img} alt={`${name} collection ${index + 2}`} fill sizes="(max-width: 1023px) 34vw, 16vw" className="object-cover" /></div>)}
                </div>
            </div>
            <div className="relative mx-auto mt-12 max-w-[1440px] border-t border-[#f4f1e9]/25 pt-6">
                <p className="max-w-4xl text-sm leading-7 text-[#f4f1e9]/65 sm:text-base">{story.slice(1).join(" ")}</p>
            </div>
        </header>
    );
}