"use client"

import { SalesDataProps } from '@/types/typesProject';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BarChartD({ brandName, arrSales }: { brandName: string; arrSales: SalesDataProps[]}) {
    return(
        <article className="flex flex-col border border-black bg-white p-5 sm:p-7">
            <h3 className="brand-display text-2xl text-black sm:text-3xl">
                {brandName} growth distribution
            </h3>
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