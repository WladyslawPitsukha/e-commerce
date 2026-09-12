import Link from "next/link";
import Image from "next/image";

import AnimatedTitle from "./animatedTitle";
import { ProductProps } from "../../types/typesProject";

interface HeaderProps {
    id: number;
    name: string;
    story: string[];
    photos: ProductProps[];
}

export default function HeaderSect({
    id,
    name,
    story,
    photos
}: HeaderProps) {
    return(
        <section 
            key={id}
            className="flex flex-col items-center gap-8 sm:gap-10 bg-black px-[var(--page-gutter)] py-10 sm:py-[50px]"
        >
            <AnimatedTitle title={name} />
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-[100px] w-full max-w-7xl">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full lg:w-1/2 h-auto">
                    {photos.map((item) => (
                        <Link href={item.link} key={item.id}>
                            <div className="border-double w-full h-auto border-black bg-white p-2 rounded-2xl">
                                <Image 
                                    className="w-full aspect-[3/2] object-cover"
                                    src={item.img}
                                    alt="Product Zara"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
                <article className="flex flex-col items-start w-full lg:w-1/2 h-auto justify-evenly gap-5 p-2 sm:p-5 rounded-2xl">
                    <h4 className="text-white text-3xl sm:text-5xl uppercase leading-tight">
                        Short story of {name}
                    </h4>
                    {story.map((item, index) => (
                        <p className="text-white text-base sm:text-xl max-w-[1200px] indent-6 sm:indent-[50px]" key={index}>
                            {item}
                        </p>
                    ))}
                </article>
            </div>
        </section>
    )
}