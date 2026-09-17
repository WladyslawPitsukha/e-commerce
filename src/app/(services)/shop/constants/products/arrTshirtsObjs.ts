import TShirt1 from "@/assets/img/t-shirt/t-shirt1.png";
import TShirt2 from "@/assets/img/t-shirt/t-shirt2.png";
import TShirt3 from "@/assets/img/t-shirt/t-shirt3.png";

import { ClotheMainObjProps } from "@/types/typesProject";

export const arrTshirtsObjs: ClotheMainObjProps[] = [
    {
        id: 1,
        title: "T-shirt with Tape Details",
        grade: 4.5,
        images: [TShirt1],
        price: {
            mainPrice: 120,
            option: false,
            procent: 0,
        },
    },
    {
        id: 2,
        title: "Sleeve Striped T-shirt",
        grade: 5,
        images: [TShirt2],
        price: {
            mainPrice: 160,
            option: true,
            procent: 30,
        },
    },
    {
        id: 3,
        title: "Courage Graphic T-shirt",
        grade: 4,
        images: [TShirt3],
        price: {
            mainPrice: 145,
            option: false,
            procent: 0,
        },
    }
];