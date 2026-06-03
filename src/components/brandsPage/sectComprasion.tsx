import { BasicInfoProps } from "@/types/typeBrands";
import { CountryDataProps } from "@/types/typeCountryData";

import { arrBrands } from "@/constants/brands/arrBrands";

import { Grid, Table, TableBody, TableCell, TableContainer, TableHead } from "@mui/material";
import Link from "next/link";
import { arrCountryZara } from "@/constants/brands/dataOfBrands/zara/arrCountryZara";

export function BlockArtComprasion({
    id, 
    name,
    links,
}: BasicInfoProps) {
    if (!id || !name || !links) return null;

    return(
        <article 
            className="flex flex-col items-center justify-between" 
            key={id}
        >
            <h4 className="text-black">
                {name}
            </h4>
            <div>
                {[{
                    link: links.mainLink,
                    title: "Landing",
                }, {
                    link: links.webpageLink,
                    title: "The website",
                }].map((obj, index) => (
                    <Link href={obj.link} key={index}>
                        <h5 className="text-black">
                            {obj.title}
                        </h5>
                    </Link>
                ))}
            </div>
        </article>
    )
}

export default function SectComprasion() {
    const averageValue = (propertyData: keyof CountryDataProps['financeData']):number => {
        const sum = arrCountryZara.reduce((acc, country) => {
            return acc + country.financeData[propertyData];
        }, 0)

        return Number(Math.floor((sum / arrCountryZara.length)).toFixed(2));
    }

    const tableHeadProps: string[] = [
        "Revenue Brand",
        "Revenue Competitor",
        "Market Share Brand",
        "Market Share Competitor",
        "Store count Brand",
        "Store count Competitor",
    ];

    const tableBodyProps: (number | string)[] = [
        `$ ${averageValue('revenue')} mln`,
        0,
        averageValue('marketShare'),
        0,
        averageValue('storeCount'),
        0,
    ];

    const arrBlockBrands = arrBrands.map(obj => obj.brand).filter(brand => brand !== undefined)

    return(
        <section className="flex items-start justify-evenly w-full h-auto my-10 px-[50px] gap-4 bg-white">
            <BlockArtComprasion  
                id={arrBlockBrands[0].id}
                name={arrBlockBrands[0].name}
                links={arrBlockBrands[0].links}
            />
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        {tableHeadProps.map((title) => (
                            <TableCell>
                                <h5 className="w-24">
                                    {title}
                                </h5>
                            </TableCell>
                        ))}
                    </TableHead>
                    <TableBody>
                        {tableBodyProps.map((title) => (
                            <TableCell>
                                <h5 className="w-24">
                                    {title}
                                </h5>
                            </TableCell>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid 
                style={{background: ''}} 
                container 
                rowSpacing={2} 
                columnSpacing={2}
            >
                {arrBlockBrands.slice(1, 5).map((obj) => (
                    <Grid size={5} key={obj?.id}>
                        <BlockArtComprasion {...obj} />
                    </Grid>
                ))}
            </Grid>
        </section>
    )
}