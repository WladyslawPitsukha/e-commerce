"use client"

import Footer from "@/components/mainPage/footer";
import Header from "@/components/mainPage/header";
import NavBar from "@/components/mainPage/navbar";
import SectionCards from "@/components/mainPage/sectionCards";
import SectionComment from "@/components/mainPage/sectionComment";
import SectionStyle from "@/components/mainPage/sectionStyle";

import { arrDressStyle } from "@/constants/arrDressStyle";
import { ClotheMainObjProps } from "@/types/typeProductCard";

import useRandomCards from "@/utils/randomCards";
import { FC, useEffect } from "react";

interface SectionArtProps {
    id: number;
    title: string;
    array: ClotheMainObjProps[];
    link: string;
}

const DRESS_STYLE_CONFIG = {
    num1: 0,
    num2: 2,
    num3: 2,
    num4: 4,
} as const;

export default function MainPage() {
    const newArrivals = useRandomCards('new');
    const topSelling = useRandomCards('top');

    useEffect(() => {
        try {
            newArrivals.getRandomCard();
            topSelling.getRandomCard();
        } catch (error) {
            console.error("Error loading random cards:", error);
        }
    }, []);

    const sections: SectionArtProps[] = [
        {
            id: 1,
            title: "New Arrivals",
            array: newArrivals.randomCards,
            link: "",
        },
        {
            id: 2,
            title: "Top Selling",
            array: topSelling.randomCards,
            link: "",
        }
    ]

    return(
        <div className="flex flex-col items-center bg-white w-full">
            <NavBar />
            <Header />
            {sections.map((section, index) => (
                <SectionCards
                    key={index}
                    {...section}
                />
            ))}
            <SectionStyle 
                arr={arrDressStyle}
                {...DRESS_STYLE_CONFIG}
            />
            <SectionComment />
            <Footer />
        </div>
    )
}