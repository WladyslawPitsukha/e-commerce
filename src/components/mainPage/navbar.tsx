"use client"

import Link from "next/link";
import React, { useState } from "react";
// use the native <form> element; `next/form` is not provided by Next.js

import { arrTitleLinks } from "@/constants/navBar/arrTitleLinks";
import { arrIconNavlinks } from "@/constants/navBar/arrIconNavLinks";

import { IoSearch } from "react-icons/io5";
import { CreateIcon } from "./creationIcon";

export default function NavBar() {
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Searching process: ', searchTerm);
    }

    return(
        <nav className="flex flex-wrap justify-between gap-4 items-center py-4 px-[var(--page-gutter)] sticky top-0 left-0 bg-white/95 backdrop-blur z-50 w-full border-b border-black/5">
            <Link href="/" className="shrink-0">
                <h2 className="text-2xl sm:text-[32px] font-bold leading-tight text-left text-black">
                SHOP.COM
                </h2>
            </Link>
            <article className="order-3 sm:order-2 flex justify-center items-center gap-4 sm:gap-6 w-full sm:w-auto">
                {arrTitleLinks.map((item, index) => (
                    <Link 
                        href={`/${item.link}`}
                        key={index}
                    >
                        <h3 className="font-normal text-base leading-[21.6px] text-black">
                            {item.title}
                        </h3>
                    </Link>
                ))}                             
            </article>
            <form
                action="/search"
                className="relative flex items-center order-2 sm:order-3 flex-1 min-w-[min(100%,14rem)] sm:max-w-[36rem]"
                onSubmit={handleSubmit}
                role="search"
                aria-label="Site search"
            >
                <IoSearch
                    className="absolute left-3 w-5 h-5 text-[#00000066]"
                    aria-hidden="true"
                />
                <input
                    type="text"
                    name="q"
                    value={searchTerm}
                    className="py-2 pl-10 pr-4 w-full h-11 border rounded-full outline-none bg-[#F0F0F0]"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for products..."
                    aria-label="Search for products"
                />
                <button type="submit" className="sr-only">Search</button>
            </form>
            <article className="flex items-center justify-between gap-3 order-1 sm:order-4">
                {arrIconNavlinks.map((item, index) => (
                    item.icon ? <Link
                        href={`/${item.link}`}
                        key={index}
                        aria-label={item.title}
                        title={item.title}
                    >
                        <CreateIcon
                            icon={item.icon}
                            className="w-6 h-6 text-black cursor-pointer transition-transform duration-200 hover:scale-110"
                        />
                    </Link> : null
                ))}
            </article>
        </nav>
    )
}