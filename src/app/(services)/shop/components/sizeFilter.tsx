"use client"

import { useState } from 'react';

const sizes = [
    { id: 1, label: 'XS' },
    { id: 2, label: 'S' },
    { id: 3, label: 'M' },
    { id: 4, label: 'L' },
    { id: 5, label: 'XL' },
];

export default function SizeFilter() {
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    
    return (
        <div className="flex flex-wrap gap-2 w-full px-4 py-2 bg-[#F0EEED]">
            {sizes.map((size) => (
                <button
                    key={size.id}
                    className={`px-4 py-2 rounded-full ${
                        selectedSize === size.id
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-black/60 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedSize(size.id)}
                >
                    {size.label}
                </button>
            ))}
        </div>
    );
}