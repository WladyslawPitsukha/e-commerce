"use client"

import { useState } from 'react';

const colors = [
    { id: 1, name: 'Black', value: '#000000' },
    { id: 2, name: 'White', value: '#FFFFFF' },
    { id: 3, name: 'Red', value: '#FF0000' },
    { id: 4, name: 'Blue', value: '#0000FF' },
    { id: 5, name: 'Green', value: '#00FF00' },
];

export default function ColorsFilter() {
    const [selectedColor, setSelectedColor] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-5 gap-2 w-full px-4 py-2 bg-[#F0EEED]">
            {colors.map((color) => (
                <button
                    key={color.id}
                    className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color.id ? 'border-black' : 'border-transparent'
                    }`}
                    style={{
                        backgroundColor: color.value,
                    }}
                    onClick={() => setSelectedColor(color.id)}
                    title={color.name}
                ></button>
            ))}
        </div>
    );
}