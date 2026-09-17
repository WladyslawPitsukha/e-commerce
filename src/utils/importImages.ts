import Jeans1 from "@/assets/img/jeans/jeans1.png";
import Jeans2 from "@/assets/img/jeans/jeans2.png";
import Shirt1 from "@/assets/img/shirt/shirt1.png";
import Shirt2 from "@/assets/img/shirt/shirt2.png";
import Short1 from "@/assets/img/short/short1.png";
import TShirt1 from "@/assets/img/t-shirt/t-shirt1.png";
import TShirt2 from "@/assets/img/t-shirt/t-shirt2.png";
import TShirt3 from "@/assets/img/t-shirt/t-shirt3.png";
import { ClotheMainObjProps, ImageType } from "@/types/typesProject";

const imageManifest: Record<string, ImageType[]> = {
    jeans: [Jeans1, Jeans2],
    shirt: [Shirt1, Shirt2],
    short: [Short1],
    "t-shirt": [TShirt1, TShirt2, TShirt3],
};

export function importImages(category: string, count: number): ClotheMainObjProps["images"] {
    const images = imageManifest[category]?.slice(0, count) ?? [];
    if (images.length !== count) {
        throw new Error(`Missing image manifest entries for ${category}`);
    }
    return images as ClotheMainObjProps["images"];
}

export function createClotheCards(category: string, objs: ClotheMainObjProps[]): ClotheMainObjProps[] {
    const images = importImages(category, objs.length);

    return objs.map((items, index) => {
        const image = images[index];
        if (!image) throw new Error(`Missing image for ${category} product ${index + 1}`);
        return { ...items, images: [image] };
    })
}