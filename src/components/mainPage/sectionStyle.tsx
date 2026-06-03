import { DressStyle } from "@/types/typeDressStyle"
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
            <Link href={`dressStyle/${style.link}`}>
                <article
                    className={`z-10 overflow-hidden relative bg-color-white rounded-[20px] h-[289px] ${style.id === 2 || style.id === 3 ? "w-[689px]" : "w-[407px]"} py-[25px] px-9`}
                >
                    <h3 
                    className="font-satoshi text-[36px] font-bold leading-[48.6px] text-left text-black"
                    title={style.description}
                    >
                    {style.title}
                    </h3>
                    <Image 
                        src={style.img}
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
    const numbers: any[] = [[num1, num2], [num3, num4]];

    return(
        <section className="flex flex-col items-center mt-20 justify-around gap-16 bg-light-gray z-10 rounded-[40px]">
            <h2 className="font-integral text-4xl font-bold leading-[57.6px] text-center text-black uppercase mt-[70px]">
                BROWSE BY dress STYLE
            </h2>
            <div className="flex flex-col items-center justify-between gap-5 mx-16 mb-[76px]">
                {numbers.map(item => (
                    <div className="flex items-center justify-between gap-5">
                        <BlockDressStyle arr={arr} num1={item[0]} num2={item[1]} />
                    </div>
                ))}
            </div>
        </section>
    )
}