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
        <nav className="flex justify-around items-center my-6 sticky top-0 left-0 bg-white z-50 w-full">
            <h2 className="text-[32px] font-bold leading-[38.4px] text-left text-black">
                SHOP.COM
            </h2>
            <article className="flex justify-between items-center gap-6">
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
                className="relative flex items-center"
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
                    className="py-2 pl-10 pr-4 w-[577px] h-12 border rounded-full outline-none bg-[#F0F0F0]"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for products..."
                    aria-label="Search for products"
                />
                <button type="submit" className="sr-only">Search</button>
            </form>
            <article className="flex items-center justify-between gap-4">
                {arrIconNavlinks.map((item, index) => (
                    <Link
                        href={`/${item.link}`}
                        key={index}
                        aria-label={item.title}
                        title={item.title}
                    >
                        <CreateIcon
                            icon={item.icon}
                            className="w-6 h-6 text-black cursor-pointer transition-transform duration-200 hover:scale-110"
                        />
                    </Link>
                ))}
            </article>
        </nav>
    )
}