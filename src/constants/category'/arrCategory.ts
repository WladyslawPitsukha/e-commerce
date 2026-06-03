import { activewearProducts } from "./active/arrDataProducts";
import { casualwearProducts } from "./casual/arrDataProducts";
import { officewearProducts } from "./office/arrDataProducts";
import { partywearProducts } from "./party/arrDataProducts";
import { summerwearProducts } from "./summer/arrDataProducts";
import { winterwearProducts } from "./winter/arrDataProducts";

//TODO: make json-file for all category products

export const categoryProducts = {
    winterwear: winterwearProducts,
    summerwear: summerwearProducts,
    partywear: partywearProducts,
    casualwear: casualwearProducts,
    officewear: officewearProducts,
    activewear: activewearProducts,
};
