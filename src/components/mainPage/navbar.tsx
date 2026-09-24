"use client"

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
// use the native <form> element; `next/form` is not provided by Next.js

import { arrTitleLinks } from "@/constants/navBar/arrTitleLinks";
import { arrIconNavlinks } from "@/constants/navBar/arrIconNavLinks";

import { IoSearch } from "react-icons/io5";
import { CreateIcon } from "./creationIcon";

export default function NavBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const pathname = usePathname();
    
    return(
        <nav aria-label="Primary navigation" className="sticky left-0 top-0 z-50 flex w-full flex-wrap items-center justify-between gap-4 border-b border-black/10 bg-white/90 px-[var(--page-gutter)] py-3 backdrop-blur-xl">
            <Link href="/" className="shrink-0">
                <span className="text-2xl font-bold leading-tight text-black sm:text-[32px]">
                SHOP.COM
                </span>
            </Link>
            <div className="order-3 flex w-full items-center justify-start gap-4 overflow-x-auto pb-1 sm:order-2 sm:w-auto sm:justify-center sm:gap-6 sm:pb-0">
                {arrTitleLinks.map((item) => (
                    <Link 
                        href={`/${item.link}`}
                        key={`${item.title}-${item.link}`}
                        aria-current={pathname === `/${item.link}` ? "page" : undefined}
                    >
                        <span className={`whitespace-nowrap text-sm font-semibold transition-colors hover:text-[var(--text-muted)] ${pathname === `/${item.link}` ? "text-black" : "text-black/70"}`}>
                            {item.title}
                        </span>
                    </Link>
                ))}                             
            </div>
            <form
                action="/search"
                className="relative order-2 flex min-w-[min(100%,14rem)] flex-1 items-center sm:order-3 sm:max-w-[28rem]"
                role="search"
                aria-label="Site search"
            >
                <IoSearch
                    className="absolute left-3 h-5 w-5 text-[var(--text-muted)]"
                    aria-hidden="true"
                />
                <input
                    type="text"
                    name="q"
                    value={searchTerm}
                    className="h-11 w-full rounded-full border border-black/10 bg-[#f4f3ef] py-2 pl-10 pr-4 text-sm outline-none transition-shadow focus:shadow-[0_0_0_3px_rgb(23_23_23_/_12%)]"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for products..."
                    aria-label="Search for products"
                />
                <button type="submit" className="sr-only">Search</button>
            </form>
            <div className="order-1 flex items-center justify-between gap-3 sm:order-4">
                {arrIconNavlinks.map((item) => (
                    item.icon ? <Link
                        href={`/${item.link}`}
                        key={item.link || item.title}
                        aria-label={item.title}
                        title={item.title}
                    >
                        <CreateIcon
                            icon={item.icon}
                            className="h-6 w-6 text-black transition-transform duration-200 hover:scale-110"
                        />
                    </Link> : null
                ))}
            </div>
        </nav>
    )
}