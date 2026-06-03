import { arrIconLinks } from "@/constants/arrIconLinks";
import { arrPayments } from "@/constants/arrPayments";
import { arrTextLinks } from "@/constants/arrTextLinks";

import Image from "next/image";

export default function Footer() {
    return(
        <footer className="flex flex-col gap-6 pt-32 pb-20 px-[100px] mt-20 bg-[#F0F0F0] w-full">
            <section className="flex justify-between">
                <aside className="flex flex-col items-start gap-[35px]">
                    <div className="flex flex-col items-start gap-6">
                        <h2 className="text-[32px] font-bold leading-[38.4px] text-left text-black">
                            SHOP.COM
                        </h2>
                        <p className="font-satoshi text-sm font-normal leading-[22px] text-left text-[#00000099] w-60">
                            We have clothes that suits your style and which you’re proud to wear. From women to men.
                        </p>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                        {arrIconLinks.map((obj, index) => (
                            <div 
                                className="border border-[#F0F0F0] bg-white p-[7px] rounded-full transition-transform duration-200 ease-in-out hover:scale-110 hover:shadow-md"
                                key={index}
                            >
                                <a href={obj.link} className="underline-offset-0 cursor-pointer" aria-label={obj.title} target="_blank" rel="noreferrer noopener">
                                    <obj.icon 
                                        className="w-[13.55px] h-[13.55px] text-black"
                                        title={obj.title}
                                    />
                                </a>
                            </div>
                        ))}
                    </div>
                </aside>
                {arrTextLinks.map((obj, index)  => (
                    <article className="flex flex-col items-start gap-[26px] h-full w-auto" key={index}>
                        <h3 className="font-satoshi text-base font-bold leading-[18px] tracking-[3px] text-left underline-offset-[from-font] decoration-skip-ink-none text-black">
                            {obj.title}
                        </h3>
                        {obj.array.map((linkObj, linkIndex) => (
                            <a 
                                key={linkIndex}
                                href={linkObj.link}
                                className="underline-offset-0 cursor-pointer"
                                aria-label={linkObj.textLink}
                            >
                                <h5 
                                    className="font-satoshi text-base font-normal text-left text-[#00000099] hover:text-black transition-colors duration-150"
                                >
                                    {linkObj.textLink}
                                </h5>
                            </a>
                        ))}
                    </article>
                ))}
            </section>
            <hr className="border border-[rgba(0, 0, 0, 0.1)]" />
            <section className="flex justify-between items-center">
                <h2 className="font-satoshi text-sm font-normal leading-[18.9px] text-right text-[#00000099]">
                    Shop.com © 2000-2025, All Rights Reserved
                </h2>
                <div className="flex items-center gap-3">
                    {arrPayments.map((item, index) => (
                        <div
                            className="shadow-[0px_0.45px_4.48px_0px_rgba(183,183,183,0.08),0px_4.48px_8.96px_0px_rgba(183,183,183,0.08)] border-[0.22px] border-[#D6DCE5] bg-white rounded-tl-[5.38px] px-[10px] py-[6px] transition-transform duration-200 hover:scale-105 cursor-pointer"
                            key={index}
                        >
                            <Image 
                                className="w-10 h-4"
                                src={item}
                                alt={`Payment method ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </footer>
    )
}