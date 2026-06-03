import { activewearProducts } from "@/constants/category'/active/arrDataProducts";
import { casualwearProducts } from "@/constants/category'/casual/arrDataProducts";
import { officewearProducts } from "@/constants/category'/office/arrDataProducts";
import { partywearProducts } from "@/constants/category'/party/arrDataProducts";
import { summerwearProducts } from "@/constants/category'/summer/arrDataProducts";
import { winterwearProducts } from "@/constants/category'/winter/arrDataProducts";

import { ProductCardProps } from "@/types/typeProductCard";


export const allProducts: ProductCardProps[] = [
    ...activewearProducts,
    ...casualwearProducts,
    ...officewearProducts,
    ...partywearProducts,
    ...summerwearProducts,
    ...winterwearProducts
];

export const getProductsByCategory = (category: string): ProductCardProps[] => {
    switch (category.toLowerCase()) {
        case 'activewear':
        return activewearProducts;
        case 'casualwear':
        return casualwearProducts;
        case 'officewear':
        return officewearProducts;
        case 'partywear':
        return partywearProducts;
        case 'summerwear':
        return summerwearProducts;
        case 'winterwear':
        return winterwearProducts;
        default:
        return allProducts;
    }
};