"use client"

import { activewearProducts } from "@/constants/category'/active/arrDataProducts";
//TODO: fix this function to get the category from the url and display the products of that category
//TODO: finish this component to display the products of the selected category
//import HeaderProduct from "../../components/headerProduct";
//import { activewearProducts } from "./arrDataProducts";
//import FaqsProduct from "../../components/faqsProduct";
//import ReviewsProduct from "../../components/reviewsProduct";
//import DetailsProduct from "../../components/detailsProduct";

import {Box, Tab, Tabs} from "@mui/material";
import { useState } from "react";
import HeaderProduct from "../components/headerProduct";
import ReviewsProduct from "../components/reviewsProduct";
import DetailsProduct from "../components/detailsProduct";
import FaqsProduct from "../components/faqsProduct";

interface TabPanelProps  {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return(
        <div 
            role="tabpanel"
            hidden={value !== index}
            id={`product-tabpanel-${index}`}
            aria-labelledby={`product-tab-${index}`}
            className="w-full h-full"
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    )
}

export default function HomePage() {
    const arrayProduct1 = activewearProducts[0]
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    }

    const {
        id,
        images,
        title,
        grade,
        price,
        description,
        details, 
        reviews,
        faqs
    } = arrayProduct1

    return (
        <div 
            className="flex flex-col items-center justify-center h-full w-full"
            key={id}
        >
            <HeaderProduct
                id={id}
                images={images}
                title={title}
                grade={grade}
                description={description}
                price={price}
                details={details}
            />
            <section className="flex flex-col items-center w-full px-[100px]">
                <Box sx={{ width: '100%' }}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            aria-label="product tabs"
                            centered
                            sx={{
                                display: 'flex',
                                justifyContent: 'evenly',
                            }}
                        >
                            <Tab 
                                label="Product Details"
                                sx={{
                                    fontSize: '20px',
                                    color: tabValue === 2 ? 'black' : 'rgba(0, 0, 0, 0.6)',
                                    fontFamily: 'Satoshi',
                                    textTransform: 'none'
                                }}
                            />
                            <Tab 
                                label="Rating & Reviews"
                                sx={{
                                    fontSize: '20px',
                                    color: tabValue === 2 ? 'black' : 'rgba(0, 0, 0, 0.6)',
                                    fontFamily: 'Satoshi',
                                    textTransform: 'none'
                                }}
                            />
                            <Tab 
                                label="FAQs"
                                sx={{
                                    fontSize: '20px',
                                    color: tabValue === 2 ? 'black' : 'rgba(0, 0, 0, 0.6)',
                                    fontFamily: 'Satoshi',
                                    textTransform: 'none'
                                }}
                            />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabValue} index={0}>
                        <DetailsProduct details={details} images={images} />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={1}>
                        <ReviewsProduct array={reviews} />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={2}>
                        <FaqsProduct faqs={faqs} />
                    </CustomTabPanel>
                </Box>
            </section>
        </div>
    );
}