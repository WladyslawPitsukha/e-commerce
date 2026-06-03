"use client"

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TuneIcon from '@mui/icons-material/Tune';

import { linksPageFilter } from './constants/linksPagesFilter'
import ClothesCard from '@/components/mainPage/clothesCard';
import { ClotheMainObjProps } from '@/types/typeProductCard';
import TextLinkPage from './components/textLinkPage';
import AccFuncBlock from './components/accFuncBlock';
import { arrDressStyle } from '@/constants/arrDressStyle';
import PriceFilter from './components/priceFilter';
import SizeFilter from './components/sizeFilter';
import ColorsFilter from './components/colorFilter';
import { casualwearProducts } from '@/constants/category\'/casual/arrDataProducts';
import { officewearProducts } from '@/constants/category\'/office/arrDataProducts';
import { partywearProducts } from '@/constants/category\'/party/arrDataProducts';
import { summerwearProducts } from '@/constants/category\'/summer/arrDataProducts';
import { winterwearProducts } from '@/constants/category\'/winter/arrDataProducts';
import { activewearProducts } from '@/constants/category\'/active/arrDataProducts';
import Footer from '@/components/mainPage/footer';
import NavBar from '@/components/mainPage/navbar';

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center w-full py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black" />
        </div>
    );
}

export default function Home() {
    const allProducts: ClotheMainObjProps[] = useMemo(() => [
        ...activewearProducts,
        ...casualwearProducts,
        ...officewearProducts,
        ...partywearProducts,
        ...summerwearProducts,
        ...winterwearProducts
    ], []);

    const [shuffledProducts, setShuffledProducts] = useState<ClotheMainObjProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Pagination
    const [page, setPage] = useState<number>(1);
    const pageSize = 9;

    useEffect(() => {
        // Shuffle products once on mount and prepare pagination
        try {
            setIsLoading(true);
            const shuffled = [...allProducts];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setShuffledProducts(shuffled);
            setPage(1);
        } catch (err) {
            console.error(err);
            setError('Failed to load products');
        } finally {
            setIsLoading(false);
        }
    }, [allProducts]);

    const total = shuffledProducts.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, total);

    const visibleProducts = shuffledProducts.slice(startIndex, endIndex);

    const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
    const goPrev = () => setPage((p) => Math.max(1, p - 1));

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="p-10 text-center text-red-600">{error}</div>;

    return(
        <div className="flex flex-col justify-center bg-white px-[100px]">
            <NavBar />
            <main className="flex flex-col justify-between items-start bg-white gap-6">
                <div className="flex">
                    <h5 className="font-satoshi font-normal text-base leading-100 tracking-0 text-black/60">
                        Home {'>'} 
                    </h5>
                    <h5 className='font-satoshi font-normal text-base leading-100 tracking-0 text-black/60'>
                        {'  '} Shop
                    </h5>
                </div>
                <div className="flex items-start justify-center gap-5 w-full h-auto">
                    <aside className="flex flex-col  items-start h-auto min-w-[295px] px-6 py-5 gap-6 border rounded-[20px] border-black/10">
                        <div className="flex justify-between items-center w-full">
                            <h2 className="font-satoshi font-bold text-xl leading-100 tracking-0 align-middle text-black">
                                Filters
                            </h2>
                            <TuneIcon 
                                className="w-6 h-6 text-black/40"
                            />
                        </div>
                        <hr className='w-full h-[1px] bg-black/10 border-0 my-2.5' />
                        <div className="flex justify-center items-center flex-col gap-5 w-full">
                            {linksPageFilter.map((item) => (
                                <TextLinkPage key={item.id} {...item} />
                            ))}
                        </div>
                        <hr className='w-full h-[1px] bg-black/10 border-0 my-2.5' />
                        <AccFuncBlock nameSection='Price' reactComponent={<PriceFilter />} />
                        <AccFuncBlock nameSection='Colors' reactComponent={<ColorsFilter />} />
                        <AccFuncBlock nameSection='Size' reactComponent={<SizeFilter />} />
                        <AccFuncBlock 
                            nameSection='Dress style'
                            reactComponent={
                                <div className="flex flex-col items-start gap-4">
                                    {arrDressStyle.map((style) => (
                                        <Link
                                            key={style.id}
                                            href={`/shop/${style.link}`}
                                            className="flex items-center justify-between w-full hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
                                        >
                                            <span className="font-satoshi text-base text-black/60">
                                                {style.title}
                                            </span>
                                            <span className="text-black/40">{'>'}</span>
                                        </Link>
                                    ))}
                                </div>
                            }
                        />
                    </aside>
                    <section className="flex flex-col items-start w-full h-auto gap-4">
                        <div className='flex items-center justify-between w-full'>
                            <h2 className='font-satoshi font-bold text-[32px] leading-100 tracking-0 align-middle text-black'>
                                Products
                            </h2>
                            <div className='flex items-center justify-center gap-3'>
                                <h5 className='font-satoshi font-normal text-base leading-100 tracking-0 text-black/60'>
                                    Showing {startIndex + 1}-{endIndex} of {total} products
                                </h5>
                                <div className='flex items-center justify-center gap-1'>
                                    <h5 className='font-satoshi font-normal text-base leading-100 tracking-0 text-black/60'>
                                        Sort by:
                                    </h5>
                                    <div className='flex items-center justify-center gap-1'>
                                        <h4 className='font-satoshi font-bold text-base leading-100 tracking-0 text-black'>
                                            Most Popular
                                        </h4>
                                        <ExpandMoreIcon className='w-6 h-6 text-black/40' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-[36px]'>
                            {visibleProducts.map((product) => (
                                <ClothesCard key={product.id} {...product} />
                            ))}
                        </div>

                        {/* Pagination controls */}
                        <div className="flex items-center justify-between w-full mt-6">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={goPrev}
                                    disabled={page === 1}
                                    className="px-3 py-2 border rounded disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                <span className="px-3 text-sm">Page {page} of {totalPages}</span>
                                <button
                                    onClick={goNext}
                                    disabled={page === totalPages}
                                    className="px-3 py-2 border rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        aria-current={page === i + 1 ? 'page' : undefined}
                                        className={`px-3 py-2 border border-black rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-black ${
                                            page === i + 1
                                                ? 'bg-black text-white'
                                                : 'bg-white text-black hover:bg-black hover:text-white'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}