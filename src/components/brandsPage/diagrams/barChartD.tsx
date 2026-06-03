"use client"

import { SalesDataProps } from '@/types/typeSalesProps';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function BarChartD({ arrSales }: { arrSales: SalesDataProps[]}) {
    return(
        <article className="flex flex-col items-center my-10 bg-white">
            <h2 className="text-3xl font-bold mb-8 text-black">
                Growth Distribution of Zara
            </h2>
            <BarChart
                width={500}
                height={400}
                data={arrSales}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="growth" fill="black" name="Growth" />
            </BarChart>
        </article>
    )
}