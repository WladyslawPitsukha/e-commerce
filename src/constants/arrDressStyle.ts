import Clothe1 from '@/assets/img/clotheStyle/clothe1.png';
import Clothe2 from '@/assets/img/clotheStyle/clothe2.png';
import Clothe3 from '@/assets/img/clotheStyle/clothe3.png';
import Clothe4 from '@/assets/img/clotheStyle/clothe4.png';
import { DressStyle } from '@/types/typesProject';

export const arrDressStyle: DressStyle[] = [
    {
        id: 1,
        title: "Casual",
        link: "/casual",
        description: "Casual dress style",
        img: Clothe1
    },
    {
        id: 2,
        title: "Formal", 
        link: "/formal",
        description: "Formal dress style",
        img: Clothe2
    },
    {
        id: 3,
        title: "Gym",
        link: "/gym", 
        description: "Gym dress style",
        img: Clothe3
    },
    {
        id: 4,
        title: "Party",
        link: "/party",
        description: "Party dress style",
        img: Clothe4
    }
];