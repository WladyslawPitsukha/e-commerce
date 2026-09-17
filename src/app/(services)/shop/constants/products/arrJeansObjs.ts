import Jeans1 from "@/assets/img/jeans/jeans1.png";
import Jeans2 from "@/assets/img/jeans/jeans2.png";

import { ClotheMainObjProps } from "@/types/typesProject";

export const arrJeansObjs: ClotheMainObjProps[] = [
    {
        id: 1,
        title: "Skinny Fit Jeans",
        grade: 3.2,
        images: [Jeans1],
        price: {
            mainPrice: 260,
            option: true,
            procent: 20,
        }
    },
    {
        id: 2,
        title: "Faded Skinny Jeans",
        grade: 4.5,
        images: [Jeans2],
        price: {
            mainPrice: 210,
            option: false,
            procent: 0,
        }
    }
];