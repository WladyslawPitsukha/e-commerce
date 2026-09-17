import { ClotheMainObjProps, ImageType } from "@/types/typesProject";


export function importImages(category: string, id: number): ClotheMainObjProps["images"] {
    const images: ImageType[] = [];

    for(let i = 1; i <= id; i++) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const image = require(`@/assets/img/${category}/${category}${id}.png`) as ClotheMainObjProps["images"][number];
        images.push(image);
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