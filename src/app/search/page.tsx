import ShopCatalog from "@/app/(services)/shop/components/shopCatalog";
import { catalogProducts } from "@/utils/productRoutes";

type Props = {
    searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
    const { q = "" } = await searchParams;
    return <ShopCatalog products={catalogProducts} initialQuery={q} />;
}
