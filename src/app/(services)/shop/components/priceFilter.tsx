"use client"

import { useState } from 'react';
import Slider from '@mui/material/Slider';

export default function PriceFilter() {
    const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
    };

    return (
        <div className="flex flex-col gap-4 w-full px-4 py-2 bg-[#F0EEED]">
            <Slider
                value={priceRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                sx={{
                    color: 'black',
                    '& .MuiSlider-thumb': {
                        backgroundColor: 'black',
                    },
                    '& .MuiSlider-track': {
                        backgroundColor: 'black',
                    },
                    '& .MuiSlider-rail': {
                        backgroundColor: '#bfbfbf',
                    }
                }}
            />
            <div className="flex justify-between items-center">
                <span className="font-satoshi text-sm text-black/60">
                    ${priceRange[0]}
                </span>
                <span className="font-satoshi text-sm text-black/60">
                    ${priceRange[1]}
                </span>
            </div>
        </div>
    );
}