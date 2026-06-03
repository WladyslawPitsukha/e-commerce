import { TextlinkProps } from "@/types/typeTextLink";
import Link from "next/link"

export function BlockPartner({
    id,
    text,
    date,
    link,
}: TextlinkProps) {
    const {name, desc} = text;
    return(
        <article className="flex items-start p-5 rounded-3xl border-double border-gray h-auto w-auto bg-light-gray gap-5" key={id}>
            <div className="flex flex-col items-start justify-between gap-2">
                <h1 className="font-integral text-3xl font-bold text-black">
                    {name}
                </h1>
                <Link href={link}>
                    <div className="flex justify-center items-center bg-black px-3 py-1 rounded-3xl">
                        <h3 className="font-integral font-bold text-white">
                            The website
                        </h3>
                    </div>
                </Link>
                <h3 className="font-integral font-medium text-xl text-black">
                    Work since {date}
                </h3>
            </div>
            <hr className="border rounded-full border-black h-full"/>
            <p className="font-inegral text-xl w-[12rem] text-black">
                {desc}
            </p>
        </article>
    )
}

export default function SectPartners({ partners }:{
    partners: TextlinkProps[]
}) {
    return(
        <section className="flex bg-black w-full justify-between h-auto px-[50px] py-10">
            {partners?.length > 0 ? (
                partners.map((obj) => (
                    <BlockPartner 
                        key={obj.id}
                        {...obj}
                    />
                ))
            ) : (
                <p className="text-white">No partners available</p>
            )}
        </section>
    )
}