import { ClotheMainObjProps } from "@/types/typesProject";
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
        <section className="mt-14 flex w-full flex-col items-center gap-8 px-[var(--page-gutter)] sm:mt-20 sm:gap-12">
            <h2 className="max-w-3xl text-center text-3xl font-bold uppercase leading-tight text-black sm:text-5xl">
                {title}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 justify-items-center gap-x-3 gap-y-8 sm:gap-[19px] w-full">
                {array.map((item) => (
                    <ClothesCard
                        key={`${item.id}-${item.title}`}
                        {...item}
                    />
                ))}
            </div>
            <button
                title="view all button"
                type="button"
                onClick={() => window.location.href = `/${link}`}
                className="ui-button ui-button-secondary w-[218px]"
            >
                View all <span aria-hidden="true">&#8594;</span>
            </button>
        </section>
    )
}