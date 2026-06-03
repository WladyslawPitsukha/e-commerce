import Image from "next/image";
import Models from '@/assets/img/models.png'
import { PiStarFourFill } from "react-icons/pi";

import { arrAmount } from "@/constants/arrAmount";
import { AmountProps } from "@/types/amountProps";

export const AmountBlock:React.FC<AmountProps> = ({id, amount, title}) => {
    return(
        <div className={`flex content-start flex-col items-start px-8 border-[rgba(0,0,0,0.1)] ${id >= 2 ? "border-l-2" : "border-none"} ${id === 1 ? "px-0" : ""}`}>
            <h2 className="text-[40px] font-bold leading-[54px] text-left text-black">
                {amount}
            </h2>
            <h5 className="text-[16px] font-normal leading-[22px] text-left text-black/60">
                {title}
            </h5>
        </div>
    )
}

export default function Header() {
    return(
        <header className="flex bg-[#F2F0F1] w-full h-auto">
            <section className="flex flex-col items-start justify-around gap-8 mx-24 mt-28">
                <h1 className="text-6xl font-bold leading-[64px] text-left text-black w-[590px]">
                    FIND CLOTHES THAT MATCHES YOUR STYLE
                </h1>
                <p className=" text-base font-normal leading-[22px] text-left text-[#00000099] w-[545px]">
                    Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                </p>
                <button 
                    className="w-52 h-14 py-4 px-16 bg-black rounded-full"
                >
                    <h5 className="text-white text-custom-16 font-medium leading-custom-21.6 text-left">
                        Shop Now
                    </h5>
                </button>
                <article className="flex justify-around w-full">
                    {arrAmount.map((arr, index) => (
                        <AmountBlock
                            key={index}
                            id={arr.id}
                            title={arr.title}
                            amount={arr.amount}
                        />
                    ))}
                </article>
            </section>
            <section className="relative w-full h-auto">
                <Image 
                    className="absolute top-0 left-0 w-[90%] h-[100%]"
                    src={Models}
                    alt="Models"
                />
                <PiStarFourFill className="absolute w-[104px] h-[104px] top-20 right-20" />
                <PiStarFourFill className="absolute w-14 h-14 top-[50%]" />
            </section>
        </header>
    )
}