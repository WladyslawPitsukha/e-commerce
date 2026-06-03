import SummerwearZara1_1 from "@/assets/img/category/summer/summerwearZara1_1.jpg";
import SummerwearZara1_2 from "@/assets/img/category/summer/summerwearZara1_2.jpg";
import SummerwearZara1_3 from "@/assets/img/category/summer/summerwearZara1_3.jpg";
import { ProductCardProps } from "@/types/typesProject";


export const summerwearProducts: ProductCardProps[] = [
    {
        id: 1,
        img: SummerwearZara1_1,
        title: "Summerwear T-shirt",
        grade: 4.5,
        price: {
            mainPrice: 49.99,
            option: true,
            procent: 10,
        },
        images: [
            SummerwearZara1_1,
            SummerwearZara1_2,
            SummerwearZara1_3,
        ],
        description: 'This summerwear set is perfect for your beach outings. Made from lightweight fabric, it keeps you cool and stylish.',
        details: {
            width: 500,
            height: 700,
            sizes: [
                {
                    id: 1,
                    n_size: "S",
                    title: "Small",
                    status: false,
                },
                {
                    id: 2,
                    n_size: "M",
                    title: "Medium",
                    status: false,
                },
                {
                    id: 3,
                    n_size: "L",
                    title: "Large",
                    status: false,
                },
                {
                    id: 4,
                    n_size: "XL",
                    title: "X-Large",
                    status: false,
                },
            ],
            colors: [
                {
                    id: 1,
                    title: "White color",
                    option: "#FFFFFF",
                    status: false,
                },
                {
                    id: 2,
                    title: "Yellow color",
                    option: "#FFFF00",
                    status: false,
                },
                {
                    id: 3,
                    title: "Green color",
                    option: "#008000",
                    status: false,
                },
            ],
        },
        reviews: [
            {
                id: 1,
                grade: 4.5,
                text: {
                    username: "Sarah M.",
                    textCom: "The summerwear collection at Shop.co is amazing! The fabric quality is outstanding and the designs are so trendy. I especially love their Tape Details t-shirt - it's become my go-to casual wear.",
                },
                posted: new Date("2021-06-03"),
            },
            {
                id: 2,
                grade: 5,
                text: {
                    username: "Alex K.",
                    textCom: "Just got my Sleeve Striped t-shirt and I'm impressed! The fit is perfect and the striped pattern looks even better in person. The material is breathable and perfect for summer.",
                },
                posted: new Date("2025-01-29"),
            },
            {
                id: 3,
                grade: 4,
                text: {
                    username: "James L.",
                    textCom: "The Courage Graphic t-shirt is exactly what I was looking for. The print quality is excellent and hasn't faded after multiple washes. Great value for the price.",
                },
                posted: new Date("2022-11-12"),
            },
            {
                id: 4,
                grade: 1,
                text: {
                    username: "Emily R.",
                    textCom: "Disappointed with the t-shirt I received. The size runs much smaller than advertised, and the material feels cheap. Not worth the premium price they're charging.",
                },
                posted: new Date("2024-07-04"),
            },
        ],
        faqs: [
            {
                id: 1,
                question: "What is the material of this summerwear?",
                answer: "The summerwear is made from a blend of cotton and polyester.",
            },
            {
                id: 2,
                question: "Is this summerwear suitable for beach activities?",
                answer: "Yes, this summerwear is designed for beach outings and is lightweight and breathable.",
            },
            {
                id: 3,
                question: "How do I care for this summerwear?",
                answer: "We recommend machine washing on a gentle cycle and air drying to maintain the fabric's quality.",
            },
            {
                id: 4,
                question: "What sizes are available for this summerwear?",
                answer: "The summerwear is available in sizes S, M, L, and XL.",
            },
            {
                id: 5,
                question: "Can I return or exchange this summerwear?",
                answer: "Yes, we have a 30-day return and exchange policy for unworn items with tags attached.",
            },
            {
                id: 6,
                question: "Is this summerwear suitable for all body types?",
                answer: "Yes, our summerwear is designed to be flattering for all body types.",
            },
        ],
    },
]