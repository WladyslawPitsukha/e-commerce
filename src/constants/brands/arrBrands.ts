import { arrCountryCalvin } from "./dataOfBrands/calvinklein/arrCountryCalvin";
import { arrGrowthCalvin } from "./dataOfBrands/calvinklein/arrGrowthCalvin";
import { arrPartnersCalvin } from "./dataOfBrands/calvinklein/arrPartnersCalvin";
import { arrProductsCalvin } from "./dataOfBrands/calvinklein/arrProductsCalvin";
import { arrSalesCalvin } from "./dataOfBrands/calvinklein/arrSalesCalvin";

import { arrCountryGucci } from "./dataOfBrands/gucci/arrCountryGucci";
import { arrGrowthGucci } from "./dataOfBrands/gucci/arrGrowthGucci";
import { arrPartnersGucci } from "./dataOfBrands/gucci/arrPartnersGucci";
import { arrProductsGucci } from "./dataOfBrands/gucci/arrProductsGucci";
import { arrSalesGucci } from "./dataOfBrands/gucci/arrSalesGucci";

import { arrCountryPrada } from "./dataOfBrands/prada/arrCountryPrada";
import { arrGrowthPrada } from "./dataOfBrands/prada/arrGrowthPrada";
import { arrPartnersPrada } from "./dataOfBrands/prada/arrPartnersPrada";
import { arrSalesPrada } from "./dataOfBrands/prada/arrSalesPrada";
import { arrProductPrada } from "./dataOfBrands/prada/arrProductsPrada";

import { arrCountryVersace } from "./dataOfBrands/versage/arrCountryVersace";
import { arrGrowthVersace } from "./dataOfBrands/versage/arrGrowthVersace";
import { arrPartnersVersace } from "./dataOfBrands/versage/arrPartnersVersace";
import { arrProductVersace } from "./dataOfBrands/versage/arrProductVersace";
import { arrSalesVersace } from "./dataOfBrands/versage/arrSalesVersace";

import { arrGrowthZara } from "./dataOfBrands/zara/arrGrowthZara";
import { arrPartnersZara } from "./dataOfBrands/zara/arrPartnersZara";
import { arrProductZara } from "./dataOfBrands/zara/arrProductsZara";
import { arrSalesZara } from "./dataOfBrands/zara/arrSalesZara";
import { arrCountryZara } from "./dataOfBrands/zara/arrCountryZara";
import { BrandsProps } from "@/types/typesProject";

export const arrBrands: BrandsProps[] = [
    {
        brand: {
            id: 1,
            name: "Zara",
            links: {
                mainLink: "/brands/zara",
                webpageLink: "https://www.zara.com"
            },
        },
        description: {
            story: [
                "Zara had always dreamed of becoming a fashion designer, but growing up in a small town, she had little more than her imagination and determination. When a local design contest was announced, she saw her chance. With no fancy fabrics, she collected scraps, sewing them together with creativity and heart.",
                "On the big day, her dress stood out—not for its luxury, but for the story it told. The judges were captivated, and Zara won. More than just a prize, the victory opened doors to a prestigious fashion school, turning her dreams into reality.",
                "On the big day, her dress stood out—not for its luxury, but for the emotion woven into every thread. The judges were captivated by the originality and soul in her design. As they announced her name as the winner, tears filled Zara’s eyes. It was more than just a victory—it was validation that her dreams were possible.",
            ],
            photos: arrProductZara,
        },
        business: {
            countryData: arrCountryZara,
            growthData: arrGrowthZara,
            salesData: arrSalesZara,
        },
        partners: arrPartnersZara,
        comprasions: [],
    },
    {
        brand: {
            id: 2,
            name: "Calvin Klein",
            links: {
                mainLink: "/brands/calvinklein",
                webpageLink: "https://www.calvinklein.com"
            },
        },
        description: {
            story: [
                "In 1968, Calvin Klein started with a dream and $10,000. Opening a coat shop in New York City's York Hotel, he caught the eye of a Bonwit Teller buyer who placed a $50,000 order, marking the beginning of an empire.",
                "Through the 1970s, Klein revolutionized fashion with his clean, minimalist designs. His jeans became iconic, transforming denim into a luxury item. The controversial ads featuring a young Brooke Shields made Calvin Klein a household name.",
                "Today, Calvin Klein represents more than fashion—it's a lifestyle brand that has redefined American style. From underwear to fragrances, the brand continues to push boundaries while maintaining its signature sophistication and simplicity.",
            ],
            photos: arrProductsCalvin,
        },
        business: {
            countryData: arrCountryCalvin,
            growthData: arrGrowthCalvin,
            salesData: arrSalesCalvin,
        },
        partners: arrPartnersCalvin,
        comprasions: [],
    },
    {
        brand: {
            id: 3,
            name: "Gucci",
            links: {
                mainLink: "/brands/gucci",
                webpageLink: "https://www.gucci.com"
            },
        },
        description: {
            story: [
                "In 1921, Guccio Gucci founded his namesake brand in Florence, Italy. Inspired by the elegant luggage he saw while working as a bellhop at London's Savoy Hotel, he began crafting fine leather goods that would redefine luxury.",
                "His vision of combining traditional Italian craftsmanship with modern sophistication quickly caught the attention of international travelers and local aristocrats. The brand's signature bamboo handle bag, created in 1947, became an icon of innovation born from post-war material shortages.",
                "Today, Gucci stands as a symbol of Italian excellence and creative innovation. Under the creative direction of visionary designers, the brand continues to push boundaries while honoring its heritage, creating pieces that blend traditional craftsmanship with contemporary design.",
            ],
            photos: arrProductsGucci,
        },
        business: {
            countryData: arrCountryGucci,
            growthData: arrGrowthGucci,
            salesData: arrSalesGucci,
        },
        partners: arrPartnersGucci,
        comprasions: [],
    },
    {
        brand: {
            id: 4,
            name: "Prada",
            links: {
                mainLink: "/brands/dolcegabbana",
                webpageLink: "https://www.dolcegabbana.com"
            },
        },
        description: {
            story: [
                "In the heart of Milan, 1913, Mario Prada opened a luxury leather goods shop, laying the foundation for what would become one of fashion's most influential houses. His meticulous attention to craftsmanship and innovative use of materials quickly earned the brand recognition among Italy's elite.",
                "When Mario's granddaughter, Miuccia Prada, inherited the company in 1978, she transformed it with her revolutionary vision. Combining traditional craftsmanship with avant-garde design, she introduced ready-to-wear collections that challenged conventional fashion norms and redefined luxury for the modern era.",
                "Today, Prada continues to push boundaries, merging art, technology, and sustainability. The brand's commitment to innovation, while honoring its heritage of excellence, has established it as a leader in the global fashion landscape, inspiring new generations of designers and fashion enthusiasts."
            ],
            photos: arrProductPrada,
        },
        business: {
            countryData: arrCountryPrada,
            growthData: arrGrowthPrada,
            salesData: arrSalesPrada, 
        },
        partners: arrPartnersPrada,
        comprasions: [],
    },
    {
        brand: {
            id: 5,
            name: "Versace",
            links: {
                mainLink: "/brands/versace",
                webpageLink: "https://www.versace.com"
            },
        },
        description: {
            story: [
                "In 1978, Gianni Versace founded his eponymous fashion house in Milan, Italy. With an innate understanding of fashion and an eye for innovation, he began creating designs that would revolutionize the fashion industry. His bold prints, vivid colors, and daring cuts quickly caught the attention of the fashion elite.",
                "The Versace brand became synonymous with luxury and glamour, dressing some of the world's most famous celebrities and creating iconic moments in fashion history. The Medusa head logo, chosen by Gianni himself, became a symbol of the brand's allure and power to captivate.",
                "Today, under the creative direction of Donatella Versace, the brand continues to push boundaries and set trends. While maintaining its heritage of Italian craftsmanship and luxury, Versace has evolved to meet contemporary tastes while staying true to its founding principles of boldness and sophistication.",
            ],
            photos: arrProductVersace,
        },
        business: {
            countryData: arrCountryVersace,
            growthData: arrGrowthVersace,
            salesData: arrSalesVersace,
        },
        partners: arrPartnersVersace,
        comprasions: [],
    },
];