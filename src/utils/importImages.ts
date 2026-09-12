import { ClotheMainObjProps } from "@/types/typeProductCard";


export function importImages(category: string, id: number): ClotheMainObjProps["img"][] {
    const images: ClotheMainObjProps["img"][] = [];

    for(let i = 1; i <= id; i++) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const image = require(`@/assets/img/${category}/${category}${id}.png`) as ClotheMainObjProps["img"];
        images.push(image);
    }

    return images;
}

export function createClotheCards(category: string, objs: ClotheMainObjProps[]): ClotheMainObjProps[] {
    const images = importImages(category, objs.length);

    return objs.map((items, index) => ({
        ...items,
        img: images[index]
    }))
}