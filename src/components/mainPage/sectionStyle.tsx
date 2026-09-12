import { DressStyle } from "@/types/typesProject"
import Image from "next/image"
import Link from "next/link"

const BlockDressStyle = ({
    arr,
    num1,
    num2
}: {
    arr: DressStyle[], 
    num1: number,
    num2: number
}) => {
    return(
        arr.slice(num1, num2).map(style => (
            <Link href={`/shop${style.link.startsWith("/") ? style.link : `/${style.link}`}`} key={style.id}>
                <article
                    className="z-10 overflow-hidden relative bg-color-white rounded-[20px] h-[220px] sm:h-[289px] w-full py-5 px-6 sm:py-[25px] sm:px-9"
                >
                    <h3 
                    className="font-satoshi text-2xl sm:text-[36px] font-bold leading-tight text-left text-black"
                    title={style.description}
                    >
                    {style.title}
                    </h3>
                    <Image 
                        src={style.img ?? "/favicon.ico"}
                        alt="clothe"
                        className="absolute bottom-0 right-0 -z-10"
                        layout="fill"
                        objectFit="cover"
                    />
                </article>
            </Link>
        ))
    )
}

export default function SectionStyle ({
    arr, 
    num1, 
    num2,
    num3,
    num4
}: {
    arr: DressStyle[], 
    num1: number,
    num2: number,
    num3: number,
    num4: number
}) {    
    const numbers: [number, number][] = [[num1, num2], [num3, num4]];

    return(
        <section className="flex flex-col items-center mt-12 sm:mt-20 justify-around gap-10 sm:gap-16 bg-light-gray z-10 rounded-[40px] mx-[var(--page-gutter)] w-[calc(100%-2*var(--page-gutter))]">
            <h2 className="font-integral text-2xl sm:text-4xl font-bold leading-tight text-center text-black uppercase mt-10 sm:mt-[70px] px-4">
                BROWSE BY dress STYLE
            </h2>
            <div className="flex flex-col items-center justify-between gap-5 w-full px-4 sm:px-8 lg:px-16 mb-12 sm:mb-[76px]">
                {numbers.map((item, index) => (
                    <div key={`${item[0]}-${item[1]}-${index}`} className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-5 w-full">
                        <BlockDressStyle arr={arr} num1={item[0]} num2={item[1]} />
                    </div>
                ))}
            </div>
        </section>
    )
}