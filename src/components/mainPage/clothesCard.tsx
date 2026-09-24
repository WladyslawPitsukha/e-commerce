"use client";

import { ClotheMainObjProps } from "@/types/typesProject"

import Image from "next/image"

import { CreationGrade } from "./creationGrade";
import { CreationPrice } from "./creationPrice";

export default function ClothesCard({
    id, 
    images,
    title, 
    grade,
    price,
}: ClotheMainObjProps) {

    const { mainPrice, option, procent } = price;
    const imageSource = images[0];

    if (!imageSource) {
        return null;
    }

    return(
        <article 
            className="group flex h-full flex-col items-start" 
            key={id}
        >
            <div className="flex w-full max-w-[295px] items-center justify-center overflow-hidden rounded-xl bg-[#f0eeed]">
                <Image 
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={imageSource}
                    alt="product"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 295px"
                />
            </div>
            <div className="mt-3 flex flex-col items-start gap-2">
                <h2 className="line-clamp-2 text-sm font-bold leading-tight text-black transition-colors group-hover:text-[var(--text-muted)] sm:text-xl">
                    {title}
                </h2>
                <CreationGrade
                    grade={grade} 
                    className="black" 
                />
                <CreationPrice
                    mainPrice={mainPrice} 
                    option={option} 
                    procent={procent}
                />
            </div>
        </article>
    )
}