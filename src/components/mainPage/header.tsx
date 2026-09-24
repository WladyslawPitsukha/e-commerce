import Image from "next/image";
import Link from "next/link";
import Models from '@/assets/img/models.png'
import { PiStarFourFill } from "react-icons/pi";

import { arrAmount } from "@/constants/arrAmount";
import { AmountProps } from "@/types/typesProject";

export const AmountBlock:React.FC<AmountProps> = ({id, amount, title}) => {
    return(
        <div className={`flex flex-col items-start border-black/10 px-5 sm:px-8 ${id >= 2 ? "border-l" : "border-none"} ${id === 1 ? "px-0" : ""}`}>
            <h2 className="text-3xl font-bold leading-none text-black sm:text-[40px]">
                {amount}
            </h2>
            <p className="mt-2 text-sm font-medium leading-5 text-[var(--text-muted)] sm:text-base">
                {title}
            </p>
        </div>
    )
}

export default function Header() {
    return(
        <header className="relative flex min-h-[32rem] w-full flex-col overflow-hidden bg-[#f4f3ef] lg:flex-row">
            <div className="absolute -left-16 top-8 h-44 w-44 rounded-full border border-black/10" />
            <section className="relative z-10 flex flex-col items-start justify-center gap-6 px-[var(--page-gutter)] py-14 sm:gap-8 lg:w-1/2 lg:py-20">
                <p className="ui-kicker">The new season edit</p>
                <h1 className="max-w-[590px] text-4xl font-bold leading-[1.02] text-black sm:text-5xl lg:text-6xl">
                    FIND CLOTHES THAT MATCHES YOUR STYLE
                </h1>
                <p className="max-w-[545px] text-base leading-7 text-[var(--text-muted)]">
                    Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                </p>
                <Link href="/shop" className="ui-button px-8">Shop now <span aria-hidden="true">&#8594;</span></Link>
                <article className="flex flex-wrap justify-start gap-5 sm:gap-0 w-full">
                    {arrAmount.map((arr) => (
                        <AmountBlock
                            key={arr.id}
                            id={arr.id}
                            title={arr.title}
                            amount={arr.amount}
                        />
                    ))}
                </article>
            </section>
            <section className="relative min-h-[20rem] w-full sm:min-h-[28rem] lg:min-h-full lg:w-1/2">
                <Image 
                    className="absolute inset-0 w-full h-full object-contain object-bottom"
                    src={Models}
                    alt="Models"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <PiStarFourFill className="absolute right-6 top-8 h-16 w-16 text-[#ff6a4d] sm:right-20 sm:top-20 sm:h-[104px] sm:w-[104px]" />
                <PiStarFourFill className="absolute left-4 top-[50%] h-10 w-10 text-[#d7ff49] sm:h-14 sm:w-14" />
            </section>
        </header>
    )
}