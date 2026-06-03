import WinterwearGucci1_1 from "@/assets/img/category/winter/winterwearGucci1_1.jpg";
import WinterwearGucci1_2 from "@/assets/img/category/winter/winterwearGucci1_2.jpg";
import WinterwearGucci1_3 from "@/assets/img/category/winter/winterwearGucci1_3.jpg";
import { ProductCardProps } from "@/types/typesProject";


export const winterwearProducts: ProductCardProps[] = [
    {
        id: 1,
        img: WinterwearGucci1_1,
        title: "Wool cardigan with pockets",
        grade: 4.5,
        price: {
            mainPrice: 89.99,
            option: true,
            procent: 10,
        },
        images: [
            WinterwearGucci1_1,
            WinterwearGucci1_2,
            WinterwearGucci1_3,
        ],
        description: "This wool cardigan is perfect for layering during the colder months. It features a classic design with pockets for added convenience.",
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
                    title: "Beige color",
                    option: "#F5F5DC",
                    status: false,
                },
                {
                    id: 2,
                    title: "Gray color",
                    option: "#808080",
                    status: false,
                },
                {
                    id: 3,
                    title: "Black color",
                    option: "#000000",
                    status: false,
                },
            ],
        },
        reviews: [
            {
                id: 1,
                grade: 4.5,
                text: {
                    username: "Sophia L.",
                    textCom: "The wool cardigan is a must-have for winter! It's warm, stylish, and the pockets are a great addition. Highly recommend!",
                },
                posted: new Date("2023-09-15"),
            },
            {
                id: 2,
                grade: 5,
                text: {
                    username: "Liam J.",
                    textCom: "I love this cardigan! The quality is top-notch and it keeps me warm without being too bulky. Perfect for layering.",
                },
                posted: new Date("2020-12-25"),
            },
            {
                id: 3,
                grade: 4,
                text: {
                    username: "Olivia K.",
                    textCom: "The design is classic and versatile. I can wear it with almost anything. Just wish it came in more colors!",
                },
                posted: new Date("2024-03-08"),
            },
            {
                id: 4,
                grade: 1,
                text: {
                    username: "Noah R.",
                    textCom: "Disappointed with the fit. It runs small and the material feels cheap. Not worth the price.",
                },
                posted: new Date("2022-08-20"),
            },
        ],
        faqs: [
            {
                id: 1,
                question: "Is the cardigan machine washable?",
                answer: "Yes, it is machine washable on a gentle cycle. We recommend air drying to maintain its shape.",
            },
            {
                id: 2,
                question: "What is the material of the cardigan?",
                answer: "The cardigan is made from 100% wool, providing warmth and comfort.",
            },
            {
                id: 3,
                question: "Does it have a lining?",
                answer: "No, the cardigan is unlined for a more casual look.",
            },
            {
                id: 4,
                question: "Can I wear it in the rain?",
                answer: "While it can withstand light rain, we recommend avoiding heavy downpours to maintain its quality.",
            },
        ]
    }
]