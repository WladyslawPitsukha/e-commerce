import CasualstyleGucci1_1 from "@/assets/img/category/casual/CasualstyleGucci1_1.jpg";
import CasualstyleGucci1_2 from "@/assets/img/category/casual/CasualstyleGucci1_2.jpg";
import CasualstyleGucci1_3 from "@/assets/img/category/casual/CasualstyleGucci1_3.jpg";
import { ProductCardProps } from "@/types/typesProject";


export const casualwearProducts: ProductCardProps[] = [
    {
        id: 1,
        img: CasualstyleGucci1_1,
        title: "Gucci T-shirt L Cotton Black",
        grade: 4.5,
        price: {
            mainPrice: 2999,
            option: true,
            procent: 0.2,
        },
        images: [
            CasualstyleGucci1_1,
            CasualstyleGucci1_2,
            CasualstyleGucci1_3,
        ],
        description: "Gucci T-shirt L Cotton Black is an elegant t-shirt made from high-quality cotton. It features a classic cut and minimalist design, perfect for everyday styling.",
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
                    title: "Meduim",
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
                    title: "Black color",
                    option: "#000000",
                    status: false,
                },
                {
                    id: 2,
                    title: "White color",
                    option: "#FFFFFF",
                    status: false,
                },
                {
                    id: 3,
                    title: "Gray color",
                    option: "#808080",
                    status: false,
                },
            ],
        },
        reviews: [
            {
                id: 1,
                grade: 4.5,
                text: {
                    username: "Anna K.",
                    textCom: "The Gucci t-shirt is of great quality! The material is soft and pleasant to touch. Perfect for everyday wear.",
                },
                posted: new Date("2025-01-29")
            },
            {
                id: 2,
                grade: 5,
                text: {
                    username: "Michael P.",
                    textCom: "I really like this t-shirt model. Classic cut and elegant look. I recommend!",
                },
                posted: new Date("2024-03-08"),
            },
            {
                id: 3,
                grade: 4,
                text: {
                    username: "Kate W.",
                    textCom: "The Gucci t-shirt is a perfect choice! It works with many styles, and the quality is excellent.",
                },
                posted: new Date("2025-05-10")
            },
            {
                id: 4,
                grade: 1,
                text: {
                    username: "Tom R.",
                    textCom: "Unfortunately, the t-shirt didn't meet my expectations. The material seems thin and wrinkles easily.",
                },
                posted: new Date("2022-11-12"),
            },
        ],
        faqs: [
            {
                id: 1,
                question: "What sizes are available for the Gucci t-shirt?",
                answer: "The Gucci t-shirt is available in sizes S, M, L, and XL.",
            },
            {
                id: 2,
                question: "Is the t-shirt made from organic cotton?",
                answer: "Yes, the t-shirt is made from high-quality organic cotton.",
            },
            {
                id: 3,
                question: "What colors are available for the t-shirt?",
                answer: "The t-shirt is available in black, white, and gray colors.",
            },
            {
                id: 4,
                question: "How do I care for the Gucci t-shirt?",
                answer: "It is recommended to wash in cold water and dry in the shade to maintain the material quality.",
            },
            {
                id: 5,
                question: "Is the t-shirt suitable for summer?",
                answer: "Yes, the cotton t-shirt is breathable and perfect for warm days.",
            },
        ],
    },
]