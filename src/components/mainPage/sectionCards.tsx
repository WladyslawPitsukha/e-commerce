import { ClotheMainObjProps } from "@/types/typeProductCard";
import ClothesCard from "./clothesCard";

interface SectionCardsProps {
    id: number;
    title: string;
    array: ClotheMainObjProps[];
    link: string;
}

export default function SectionCards({
    title,
    array,
    link,
}: SectionCardsProps) {
    return(
        <section className="flex flex-col items-center w-full gap-[55px] mt-[72px]">
            <h2 className="font-integral text-5xl font-bold leading-[57.6px] text-center text-black uppercase">
                {title}
            </h2>
            <div className="flex justify-evenly items-center gap-[19px]">
                {array.map((item, index) => (
                    <ClothesCard
                        key={index}
                        {...item}
                    />
                ))}
            </div>
            <button
                title="view all button"
                type="button"
                onClick={() => window.location.href = `/${link}`}
                className="border w-[218px] h-auto rounded-[62px] border-black"
            >
                <h4 className="font-satoshi w-auto text-base font-medium leading-none tracking-[0%] text-black py-[15px] px-[80px]">
                    View All
                </h4>
            </button>
        </section>
    )
}