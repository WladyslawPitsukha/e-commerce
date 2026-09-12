"use client";

import { ClotheMainObjProps } from "@/types/typesProject"

import Image from "next/image"

import { useEffect, useState } from "react";
import { CreationGrade } from "./creationGrade";
import { CreationPrice } from "./creationPrice";

export default function ClothesCard({
    id, 
    img,
    images,
    title, 
    grade,
    price,
}: ClotheMainObjProps) {

    const { mainPrice, option, procent } = price;
    const [currentGrade, setCurrentGrade] = useState(grade);
    const [currentPrice, setCurrentPrice] = useState({
        mainPrice,
        option,
        procent
    });
    useEffect(() => {
        setCurrentGrade(grade);
    }, [grade]);

    useEffect(() => {
        setCurrentPrice({
            mainPrice,
            option,
            procent
        });
    }, [mainPrice, option, procent]);

    const imageSource = img ?? images[0];

    if (!imageSource) {
        return null;
    }

    return(
        <article 
            className="flex flex-col items-start" 
            key={id}
        >
            <div className="flex justify-center items-center w-full aspect-square max-w-[295px] rounded-2xl bg-[#F0EEED] overflow-hidden">
                <Image 
                    className="w-full h-full object-cover"
                    src={imageSource}
                    alt="product"
                />
            </div>
            <div className="flex flex-col items-start gap-2 mt-2">
                <h5 className="font-satoshi text-sm sm:text-xl font-bold leading-tight text-left text-black line-clamp-2">
                    {title}
                </h5>
                <CreationGrade
                    grade={currentGrade} 
                    className="black" 
                />
                <CreationPrice
                    mainPrice={currentPrice.mainPrice} 
                    option={currentPrice.option} 
                    procent={currentPrice.procent}
                />
            </div>
        </article>
    )
}