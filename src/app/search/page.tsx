import ShopCatalog from "@/app/(services)/shop/components/shopCatalog";
import { catalogProducts } from "@/utils/productRoutes";
import { headers } from "next/headers";
import { allowRequest } from "@/lib/apiSecurity";

type Props = {
    searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
    const requestHeaders = await headers();
    const allowed = allowRequest(new Request("http://local/search", { headers: requestHeaders }), 60);
    if (!allowed) {
        return <main className="page-gutter flex min-h-screen items-center justify-center"><p role="alert">Too many searches. Try again in a minute.</p></main>;
    }
    const { q = "" } = await searchParams;
    return <ShopCatalog products={catalogProducts} initialQuery={q} />;
}
