"use client";

import { CreationGrade } from "@/components/mainPage/creationGrade";
import { CreationPrice } from "@/components/mainPage/creationPrice";
import { HeaderCardProps, ProductCardProps } from "@/types/typeProductCard";

import { IoCheckmark } from "react-icons/io5";

import Image from "next/image";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons";
import { FaMinus, FaPlus } from "react-icons/fa6";

export const ButtonAmount = ({type, func}: {
    type: 'increase' | 'decrease'
    func: any;
}) => {
    const icon = type === 'decrease' ? FaMinus : FaPlus;
    const Icon = icon

    return(
        <button 
            title="button"
            className="w-6 h-6"
            onClick={func}
        >
            <Icon className="w-6 h-6 text-black" />
        </button>
    )
}

export interface DivBlockProps {
    title: string;
    component: ReactNode;
    className?: string;
    classNameTitle?: string;
    gap?: number;
}

export const DivBlock = ({title, component, className = "", classNameTitle = ""}: 
    DivBlockProps
) => {
    return(
        <div className={`${className}`}>
            <h3 className={`${classNameTitle}`}>
                {title}
            </h3>
            {component}
        </div>
    )
}

export default function HeaderProduct({
    id,
    images,
    title,
    grade,
    price,
    description,
    details,

}: HeaderCardProps) {
    const [imageChoice, setImageChoice] = useState(images[0]);
    const [amountProduct, setAmountProduct] = useState<number>(0);

    const { mainPrice, option, procent } = price;
    const { sizes, colors } = details;

    const handleClick = () => {
        if(Array.isArray(images)) {
            const currentIndex = images.indexOf(imageChoice);
            const nextIndex = (currentIndex + 1) % images.length;
            
            setImageChoice(images[nextIndex])
        }
    }

    const incrAmount = () => {
        if(amountProduct < 100) {
            setAmountProduct(prev => prev + 1)
        }
    }

    const decrAmount = () => {
        if(amountProduct > 0) {
            setAmountProduct(prev => prev - 1)
        }
    }

    const textItemsBlock = "flex flex-col items-start justify-center";

    return (
        <header key={id} className="flex flex-col justify-center items-center gap-9 h-auto w-auto px-[100px]">
            <div className="">

            </div>
            <div className="flex justify-between items-center gap-10">
                <article className="flex justify-center items-center gap-[14px]">
                    <div className="flex flex-col justify-center items-center gap-[14px]">
                        {images.map((image, index) => (
                            <Image 
                                key={index}
                                src={image}
                                className="w-[152px] h-[168px] rounded-[20px] bg-[#F0EEED] cursor-pointer"
                                onClick={handleClick}
                                alt={`Product's image by id: ${index}`}
                            />
                        ))}
                    </div>
                    <div>
                        <Image 
                            className="w-[444px] h-[530px] rounded-[20px] bg-[#F0EEED]"
                            src={imageChoice}
                            alt="Product's image"
                        />
                    </div>
                </article>
                <article className={`${textItemsBlock} gap-6 justify-between h-full`}>
                    <div className={`${textItemsBlock} gap-5`}>
                        <h1 className={`font-integral uppercase font-bold text-40 leading-100 tracking-0 align-middle text-black`}>
                            {title}
                        </h1>
                        <div className="flex flex-col items-start gap-[14px]">
                            <CreationGrade 
                                className="text-black"
                                grade={grade}
                            />
                            <CreationPrice
                                mainPrice={mainPrice}
                                option={option}
                                procent={procent}
                            />
                        </div>
                        <p className={`w-auto font-satoshi text-gray-600 font-normal text-base leading-[22px] tracking-[0%]`}>
                            {description}
                        </p>
                    </div>
                    <DivBlock 
                        title="Select Colors"
                        className="flex flex-col items-start gap-4"
                        classNameTitle="font-satoshi font-normal text-base leading-100 tracking-0 text-black/60"
                        component={
                            <div className="flex justify-center items-center gap-4">
                            {colors.map((color) => (
                                <div className={`flex justify-center cursor-pointer items-center rounded-full w-[37px] h-[37px]`} style={{background: color.option}} key={color.id}>
                                    {color.status === true ? (<IoCheckmark className={`w-4 h-4 text-white`} />) : null }
                                </div>
                            ))}
                        </div>
                        }
                    />
                    <DivBlock 
                        title="Choose Size"
                        className="flex flex-col items-start gap-4"
                        classNameTitle="font-satoshi font-normal text-base leading-100 tracking-0 text-black/60"
                        component= {
                            <div className="flex justify-between items-center gap-3">
                                {sizes.map((size) => (
                                    <div 
                                        className={`w-auto h-auto py-3 px-6 bg-[#f0f0f0] rounded-[62px] cursor-pointer`}
                                        key={size.id}
                                    >
                                        <h3 className={`font-satoshi font-normal text-16 leading-100 tracking-0 text-black/60`}>
                                            {size.title}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        }
                    />
                    <div className="flex items-center gap-5">
                        <div className="flex justify-between items-center w-auto bg-light-gray h-auto gap-[40px] rounded-[62px] px-5 py-4 ">
                            <ButtonAmount 
                                type="decrease"
                                func={decrAmount}
                            />
                            <h2 className="font-satoshi font-medium text-base leading-[100%] tracking-[0%] text-black">
                                {amountProduct}
                            </h2>
                            <ButtonAmount 
                                type="increase"
                                func={incrAmount}
                            />
                        </div>
                        <button className="flex justify-center items-center rounded-[62px] min-w-[400px] px-[54px] py-[16px] bg-black cursor-pointer" type="submit">
                            <h2 className="font-satoshi  font-medium text-16 leading-100 text-justify tracking-0 text-white">
                                Add to Cart
                            </h2>
                        </button>
                    </div>
                </article>
            </div>
        </header>
    )
}