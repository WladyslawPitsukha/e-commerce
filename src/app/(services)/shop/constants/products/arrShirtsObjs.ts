import Shirt1 from "@/assets/img/shirt/shirt1.png";
import Shirt2 from "@/assets/img/shirt/shirt2.png";

import { ClotheMainObjProps } from "@/types/typeProductCard";

export const arrShirtsObjs: ClotheMainObjProps [] = [
    {
        id: 1,
        img: Shirt1,
        title: "Checkered Shirt",
        grade: 4.5,
        images: [],
        price: {
            mainPrice: 180,
            option: false,
            procent: 0,
        },
    },
    {
        id: 2,
        img: Shirt2,
        title: "Vertical Striped Shirt",
        grade: 3.0,
        images: [],
        price: {
            mainPrice: 232,
            option: true,
            procent: 30,
        },
    }
];