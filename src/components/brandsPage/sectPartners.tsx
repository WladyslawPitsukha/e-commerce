import { TextlinkProps } from "@/types/typesProject";
import Link from "next/link";

export function BlockPartner({
    id,
    text,
    date,
    link,
}: TextlinkProps) {
    const {name, desc} = text;
    return <article className="brand-card-3d flex min-h-64 flex-col justify-between border border-[#f4f1e9]/25 bg-[#171914] p-6" key={id}>
        <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#d7ff49]">Working since {date}</p><h3 className="brand-display mt-4 text-3xl text-[#f4f1e9]">{name}</h3><p className="mt-4 text-sm leading-6 text-[#f4f1e9]/65">{desc}</p></div>
        <Link href={link} className="mt-6 inline-flex w-fit items-center gap-2 border border-[#f4f1e9]/35 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#f4f1e9] transition-colors hover:bg-[#d7ff49] hover:text-black">Visit partner <span aria-hidden="true">&#8599;</span></Link>
    </article>;
}

export default function SectPartners({ partners }:{
    partners: TextlinkProps[]
}) {
    return <section className="bg-[#10110e] px-[var(--page-gutter)] py-14 text-[#f4f1e9] sm:py-20"><div className="mx-auto max-w-[1440px]"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="brand-eyebrow text-[#ff6a4d]">Partner network</p><h2 className="brand-display mt-3 text-4xl sm:text-6xl">Strong company.</h2></div><p className="max-w-sm text-sm leading-6 text-[#f4f1e9]/65">The platforms and teams helping turn an idea into an operating brand.</p></div>{partners?.length > 0 ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{partners.map((partner) => <BlockPartner key={partner.id} {...partner} />)}</div> : <p className="text-[#f4f1e9]/65">No partners available.</p>}</div></section>;
}