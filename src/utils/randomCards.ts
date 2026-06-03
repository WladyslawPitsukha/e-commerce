"use client"

import { useEffect, useState } from "react";
import React from "react";


import { arrTshirtsObjs } from "@/app/(services)/shop/constants/products/arrTshirtsObjs";
import { arrShirtsObjs } from "@/app/(services)/shop/constants/products/arrShirtsObjs";
import { arrJeansObjs } from "@/app/(services)/shop/constants/products/arrJeansObjs";
import { arrShortsObj } from "@/app/(services)/shop/constants/products/arrShortsObjs";
import { ClotheMainObjProps } from "@/types/typeProductCard";



export default function useRandomCards(sectionType: "new" | "top") {
    const [randomCards, setRandomCards] = useState<ClotheMainObjProps[]>([]);
    const allCards: ClotheMainObjProps[] = [arrShirtsObjs, arrJeansObjs, arrShortsObj, arrTshirtsObjs].flat(2);

    const getRandomCard = () => {
        const sortedArray = allCards.sort(() => 0.5 - Math.random());
        const slicedArray = sortedArray.slice(0, 4);

        setRandomCards(slicedArray);
    }

    useEffect(() => {
        getRandomCard()
    }, []);

    return {
        randomCards,
        getRandomCard
    }
}