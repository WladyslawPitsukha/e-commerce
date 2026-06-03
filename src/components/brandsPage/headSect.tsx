import Link from "next/link";
import Image from "next/image";

import AnimatedTitle from "./animatedTitle";
import { ProductProps } from "../../types/typeProductProps";

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
            className="flex flex-col items-center gap-10 bg-black px-[50px] py-[50px]"
        >
            <AnimatedTitle title={name} />
            <div className="flex justify-between items-start gap-[100px]">
                <div className="grid grid-cols-3 gap-2 w-auto h-auto">
                    {photos.map((item) => (
                        <Link href={item.link}>
                            <div className="border-double w-auto h-auto border-black bg-white p-2 rounded-2xl" key={item.id}>
                                <Image 
                                    className="w-[270px] h-[180px]"
                                    src={item.img}
                                    alt="Product Zara"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
                <article className="flex flex-col items-start w-auto h-auto justify-evenly gap-5 y p-5 rounded-2xl">
                    <h4 className="text-white text-5xl uppercase ">
                        Short story of {name}
                    </h4>
                    {story.map((item, index) => (
                        <p className="text-white text-xl max-w-[1200px] indent-[50px]" key={index}>
                            {item}
                        </p>
                    ))}
                </article>
            </div>
        </section>
    )
}