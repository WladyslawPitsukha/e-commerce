import { StaticImageData } from "next/image";
import { IconType } from "react-icons";

export type ImageType = string | StaticImageData;

export interface BaseEntity {
    id: number;
}

export interface BaseLink {
    link: string;
}

export interface BaseTitled {
    title: string;
}

export interface BaseNamed {
    name: string;
}

export interface NavLinkProps extends BaseLink, Partial<BaseTitled> {
    icon: IconType | null;
}

export interface LinksPageFilterProps extends BaseEntity, BaseLink {
    name: string;
}

export interface AmountProps extends BaseEntity, BaseTitled {
    amount: number;
}

export interface ArrSectProps extends BaseLink, BaseTitled {}

export interface ProductProps extends BaseEntity, BaseLink {
    img: ImageType;
}

export interface BasicPropsBrand extends BaseEntity, BaseNamed {
    links?: {
        mainLink: string;
        webpageLink: string;
    };
}

export interface BrandsProps {
    brand: BasicPropsBrand;
    description: {
        story: string[];
        photos: ProductProps[];
    };
    business: {
        countryData: CountryDataProps[];
        growthData: SalesDataProps[];
        salesData: SalesDataProps[];
    };
    partners: TextlinkProps[];
    comprasions?: BasicPropsBrand[];
}

export interface SalesDataProps extends BaseEntity {
    year: number;
    quarter?: number;
    revenue: number;
    growth: number;
}

export interface ClotheMainObjProps extends BaseEntity {
    img?: ImageType;
    images: ImageType[];
    title: string;
    grade: number;
    price: {
        mainPrice: number;
        option: boolean;
        procent: number;
    };
}

export interface HeaderCardProps extends ClotheMainObjProps {
    description: string;
    details: {
        width: number;
        height: number;
        sizes: SizeProps[];
        colors: ColorProps[];
    };
}

export interface ProductCardProps extends HeaderCardProps {
    reviews: ComSectProps[];
    faqs: FAQProps[];
}

export interface FooterArraysText extends BaseTitled {
    array: FooterTextLink[];
}

export interface FooterTextLink extends BaseLink {
    textLink: string;
}

export interface FooterIconLinks extends BaseLink, Partial<BaseTitled> {
    icon: IconType;
}

export interface DressStyle extends BaseEntity, BaseLink, BaseTitled {
    description?: string;
    img?: ImageType;
}

export interface CountryDataProps extends BaseEntity {
    country: {
        countryName: string;
        coordinates?: [number, number];
    };
    financeData: {
        revenue: number;
        marketShare: number;
        storeCount: number;
        onlinePresence: number;
    };
}

export interface ComSectProps extends BaseEntity {
    grade: number;
    text: {
        username: string;
        textCom: string;
    };
    posted?: Date;
}

export interface TextlinkProps extends BaseEntity, BaseLink {
    text: {
        name: string;
        desc: string;
    };
    date: string;
}

export interface SizeProps extends BaseEntity {
    n_size: string;
    title: string;
    status: boolean;
}

export interface ColorProps extends BaseEntity {
    title: string;
    option: string;
    status: boolean;
}

export interface FAQProps extends BaseEntity {
    question: string;
    answer: string;
}