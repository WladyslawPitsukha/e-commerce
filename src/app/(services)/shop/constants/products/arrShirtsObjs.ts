import Shirt1 from "@/assets/img/shirt/shirt1.png";
import Shirt2 from "@/assets/img/shirt/shirt2.png";

import { ClotheMainObjProps } from "@/types/typesProject";

export const arrShirtsObjs: ClotheMainObjProps [] = [
    {
        id: 1,
        title: "Checkered Shirt",
        grade: 4.5,
        images: [Shirt1],
        price: {
            mainPrice: 180,
            option: false,
            procent: 0,
        },
    },
    {
        id: 2,
        title: "Vertical Striped Shirt",
        grade: 3.0,
        images: [Shirt2],
        price: {
            mainPrice: 232,
            option: true,
            procent: 30,
        },
    }
];