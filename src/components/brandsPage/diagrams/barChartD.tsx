"use client"

import { SalesDataProps } from '@/types/typesProject';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BarChartD({ arrSales }: { arrSales: SalesDataProps[]}) {
    return(
        <article className="flex flex-col items-center my-10 bg-white">
            <h2 className="text-3xl font-bold mb-8 text-black">
                Growth Distribution of Zara
            </h2>
            <div className="h-[320px] w-full min-w-0 sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={arrSales} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={{ fill: "#111827" }} />
                <YAxis tick={{ fill: "#111827" }} />
                <Tooltip />
                <Legend wrapperStyle={{ color: "#111827" }} />
                <Bar dataKey="growth" fill="black" name="Growth" />
            </BarChart>
            </ResponsiveContainer>
            </div>
        </article>
    )
}