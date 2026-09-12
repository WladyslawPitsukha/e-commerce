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
        <section className="flex flex-col items-center w-full gap-8 sm:gap-[55px] mt-12 sm:mt-[72px] px-[var(--page-gutter)]">
            <h2 className="font-integral text-3xl sm:text-5xl font-bold leading-tight text-center text-black uppercase">
                {title}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 justify-items-center gap-x-3 gap-y-8 sm:gap-[19px] w-full">
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
                <h4 className="font-satoshi w-auto text-base font-medium leading-none tracking-[0%] text-black py-[15px] px-4">
                    View All
                </h4>
            </button>
        </section>
    )
}