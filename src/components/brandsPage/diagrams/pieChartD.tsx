"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { SalesDataProps } from "@/types/typesProject";

export default function PieChartD({ arrGrowth }: {arrGrowth: SalesDataProps[]}) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return(
        <article className="my-10 bg-white w-full max-w-xl">
            <h2 className='text-2xl sm:text-3xl font-bold mb-8 text-black'>
                Sales of Zara for 2020-2025
            </h2>
            <div className="w-full h-[320px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={arrGrowth} cx="50%" cy="45%" labelLine={false} outerRadius="62%" fill="white" dataKey="growth" nameKey="year" label={{ fill: "#111827" }}>
                            {arrGrowth.map((item, index) => (
                                <Cell key={`cell-${item.year}-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend wrapperStyle={{ color: "#111827" }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </article>
    )
}