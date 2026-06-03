export default async function FetchZaraSales(link: string) {
    const responce = await fetch(link);

    if(!responce.ok) {
        throw new Error("The active bag")
    }

    return responce.json();
}