"use client"

import { arrComSect } from "@/constants/arrComSect";
import { IconType } from "react-icons";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { useState } from "react";
import React from "react";
import CommentBlock from "./commentBlock";


interface ButtonArrowProps {
    icon: IconType;
    func: () => void;
}

export function ButtonArrow({
    icon,
    func,
}: ButtonArrowProps) {
    const Icon = icon;
    return(
        <button 
            title="button"
            type="button"
            onClick={func}
            className="flex justify-center items-center w-6 h-6"
        >
            <Icon className="w-4 h-[19px] text-black" />
        </button>
    )
}

export default function SectionComment() {
    const [curIndex, setCurIndex] = useState(0);
    
    const nextSlide = () => {
        setCurIndex((prevIndex) => 
            prevIndex + 3 >= arrComSect.length ? 0 : prevIndex + 3
        );
    };

    const prevSlide = () => {
        setCurIndex((prevIndex) => 
            prevIndex - 3 < 0 ? arrComSect.length - 3 : prevIndex - 3
        );
    };

    const arrButton: ButtonArrowProps[] = [
        {
            icon: FaArrowLeft,
            func: prevSlide
        },
        {
            icon: FaArrowRight,
            func: nextSlide
        }
    ];

    return(
        <section className="flex flex-col w-full h-auto items-start justify-between mt-20 px-[100px] gap-10">
            <div className="flex justify-between items-end w-full">
                <h2 className="font-integral font-bold text-[48px] leading-[100%] tracking-[0%] align-middle text-black uppercase">
                    OUR HAPPY CUSTOMERS
                </h2>
                <div className="flex items-center justify-between gap-4">
                    {arrButton.map((item, index) => (
                        <ButtonArrow 
                            key={index}
                            {...item}
                        />
                    ))}
                </div>
            </div>
            <div 
                className="flex gap-5 justify-between w-full transition-transform duration-500 ease-in-out"
            >
                {arrComSect.slice(curIndex, curIndex + 3).map((item, index) => (
                    <CommentBlock
                        key={index}
                        {...item}
                    />
                ))}
            </div>
        </section>
    )
}