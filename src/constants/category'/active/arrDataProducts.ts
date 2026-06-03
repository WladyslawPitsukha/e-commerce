import ActivewearNike1_1 from "@/assets/img/category/active/activewearZara1_1.jpg";
import ActivewearNike1_2 from "@/assets/img/category/active/activewearZara1_2.jpg";
import ActivewearNike1_3 from "@/assets/img/category/active/activewearZara1_3.jpg";
import { ProductCardProps } from "@/types/typesProject";


export const activewearProducts: ProductCardProps[] = [
    {
        id: 1,
        img: ActivewearNike1_1,
        title: "Nike Sports T-shirt",
        grade: 4.5,
        price: {
            mainPrice: 59.99,
            option: true,
            procent: 15,
        },
        images: [
            ActivewearNike1_1,
            ActivewearNike1_2,
            ActivewearNike1_3,
        ],
        description: 'This Nike sports t-shirt is perfect for your workout sessions. Made from moisture-wicking fabric, it keeps you cool and comfortable during intense activities.',
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
                    title: "Green color",
                    option: "#006400",
                    status: false,
                },
                {
                    id: 3,
                    title: "Red color",
                    option: "#8B0000",
                    status: false,
                },
            ],
        },
        reviews: [
            {
                id: 1,
                grade: 4.5,
                text: {
                    username: "Mike R.",
                    textCom: "Great workout shirt! The moisture-wicking fabric really works, and it's very comfortable during intense training sessions.",
                },
                posted: new Date("2024-07-04"),
            },
            {
                id: 2,
                grade: 5,
                text: {
                    username: "Lisa K.",
                    textCom: "Perfect fit and excellent quality. I use it for both gym sessions and running.",
                },
                posted: new Date("2025-01-29")
            },
            {
                id: 3,
                grade: 4,
                text: {
                    username: "David M.",
                    textCom: "Good quality activewear. The material is breathable and durable.",
                },
                posted: new Date("2023-02-17")
            },
        ],
        faqs: [
            {
                id: 1,
                question: "Is this shirt suitable for intense workouts?",
                answer: "Yes, the moisture-wicking fabric makes it perfect for intense workout sessions.",
            },
            {
                id: 2,
                question: "How should I care for this activewear?",
                answer: "Machine wash cold with similar colors. Tumble dry low.",
            },
            {
                id: 3,
                question: "Is the material breathable?",
                answer: "Yes, the fabric is designed to be highly breathable for maximum comfort during exercise.",
            },
            {
                id: 4,
                question: "What sizes are available?",
                answer: "The shirt is available in sizes S, M, L, and XL.",
            },
        ],
    },
]