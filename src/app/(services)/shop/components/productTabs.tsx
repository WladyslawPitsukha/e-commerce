"use client";

import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import DetailsProduct from "./detailsProduct";
import FaqsProduct from "./faqsProduct";
import HeaderProduct from "./headerProduct";
import ReviewsProduct from "./reviewsProduct";
import { ProductCardProps } from "@/types/typesProject";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel({ children, value, index }: TabPanelProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`product-tabpanel-${index}`}
            aria-labelledby={`product-tab-${index}`}
            className="w-full h-full"
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default function ProductTabs({ product, category }: { product: ProductCardProps; category: string }) {
    const [tabValue, setTabValue] = useState(0);
    const {
        id,
        images,
        title,
        grade,
        price,
        description,
        details,
        reviews,
        faqs,
    } = product;

    return (
        <div className="flex flex-col items-center justify-center min-h-full w-full">
            <HeaderProduct
                id={id}
                images={images}
                title={title}
                grade={grade}
                description={description}
                price={price}
                details={details}
                category={category}
            />
            <section className="flex flex-col items-center w-full px-[var(--page-gutter)]">
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={tabValue}
                            onChange={(_, newValue: number) => setTabValue(newValue)}
                            aria-label="Product information tabs"
                            centered
                            sx={{
                                display: "flex",
                                justifyContent: "evenly",
                                "& .MuiTab-root": {
                                    minWidth: 0,
                                    flex: 1,
                                    px: { xs: 1, sm: 2 },
                                    fontSize: { xs: "0.75rem", sm: "1.25rem" },
                                },
                            }}
                        >
                            <Tab label="Product Details" />
                            <Tab label="Rating & Reviews" />
                            <Tab label="FAQs" />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabValue} index={0}>
                        <DetailsProduct details={details} images={images} />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={1}>
                        <ReviewsProduct array={reviews} productId={id} />
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={2}>
                        <FaqsProduct faqs={faqs} />
                    </CustomTabPanel>
                </Box>
            </section>
        </div>
    );
}
