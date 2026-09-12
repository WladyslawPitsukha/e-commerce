import ShopCatalog from "./components/shopCatalog";
import { catalogProducts } from "@/utils/productRoutes";

export default function ShopPage() {
    return <ShopCatalog products={catalogProducts} />;
}
