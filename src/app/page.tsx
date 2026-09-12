"use client"

import Footer from "@/components/mainPage/footer";
import Header from "@/components/mainPage/header";
import NavBar from "@/components/mainPage/navbar";
import SectionCards from "@/components/mainPage/sectionCards";
import SectionComment from "@/components/mainPage/sectionComment";
import SectionStyle from "@/components/mainPage/sectionStyle";

import { arrDressStyle } from "@/constants/arrDressStyle";
import { ClotheMainObjProps } from "@/types/typesProject";

import useRandomCards from "@/utils/randomCards";

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
    const newArrivals = useRandomCards();
    const topSelling = useRandomCards();

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
            {sections.map((section) => (
                <SectionCards
                    key={section.id}
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