import { ClotheMainObjProps } from "@/types/typeProductCard"

import Image from "next/image"

import { useEffect, useState } from "react";
import { CreationGrade } from "./creationGrade";
import { CreationPrice } from "./creationPrice";

export default function ClothesCard({
    id, 
    img, 
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

    return(
        <article 
            className="flex flex-col items-start" 
            key={id}
        >
            <div className="flex justify-center items-center w-[295px] h-[298px] rounded-2xl bg-[#F0EEED]">
                <Image 
                    className="w-[400px] h-[280px]"
                    src={img}
                    alt="product"
                />
            </div>
            <div className="flex flex-col items-start gap-2 mt-2">
                <h5 className="font-satoshi text-xl font-bold leading-[32.4px] text-left text-black">
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