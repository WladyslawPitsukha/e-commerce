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
        <header className="flex flex-col lg:flex-row bg-[#F2F0F1] w-full min-h-[32rem] overflow-hidden">
            <section className="flex flex-col items-start justify-center gap-6 sm:gap-8 px-[var(--page-gutter)] py-12 lg:py-20 lg:w-1/2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-left text-black max-w-[590px]">
                    FIND CLOTHES THAT MATCHES YOUR STYLE
                </h1>
                <p className="text-base font-normal leading-[22px] text-left text-[#00000099] max-w-[545px]">
                    Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                </p>
                <button 
                    className="w-52 h-14 py-4 px-8 bg-black rounded-full"
                >
                    <h5 className="text-white text-custom-16 font-medium leading-custom-21.6 text-left">
                        Shop Now
                    </h5>
                </button>
                <article className="flex flex-wrap justify-start gap-5 sm:gap-0 w-full">
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
            <section className="relative min-h-[20rem] sm:min-h-[28rem] lg:min-h-full w-full lg:w-1/2">
                <Image 
                    className="absolute inset-0 w-full h-full object-contain object-bottom"
                    src={Models}
                    alt="Models"
                />
                <PiStarFourFill className="absolute w-16 h-16 sm:w-[104px] sm:h-[104px] top-8 sm:top-20 right-6 sm:right-20" />
                <PiStarFourFill className="absolute w-10 h-10 sm:w-14 sm:h-14 top-[50%] left-4" />
            </section>
        </header>
    )
}