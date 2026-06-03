import Jeans1 from "@/assets/img/jeans/jeans1.png";
import Jeans2 from "@/assets/img/jeans/jeans2.png";

import { ClotheMainObjProps } from "@/types/typeProductCard";

export const arrJeansObjs: ClotheMainObjProps[] = [
    {
        id: 1,
        img: Jeans1,
        title: "Skinny Fit Jeans",
        grade: 3.2,
        images: [],
        price: {
            mainPrice: 260,
            option: true,
            procent: 20,
        }
    },
    {
        id: 2,
        img: Jeans2,
        title: "Faded Skinny Jeans",
        grade: 4.5,
        images: [],
        price: {
            mainPrice: 210,
            option: false,
            procent: 0,
        }
    }
];