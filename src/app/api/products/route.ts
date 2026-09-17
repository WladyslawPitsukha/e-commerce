import { Product } from "@/models/product";
import { allowRequest, apiError, apiResponse, requestId } from "@/lib/apiSecurity";
import { connectToDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const id = requestId(request);
    if (!allowRequest(request)) return apiError("Too many requests. Try again later.", 429, id);
    try {
        await connectToDatabase();
        const products = await Product.find({}).sort({ createdAt: -1 }).limit(100).lean();
        return apiResponse({ products }, 200, id);
    } catch (error) {
        console.error(JSON.stringify({ event: "products_list_failed", requestId: id, error: error instanceof Error ? error.message : "unknown" }));
        return apiError("Unable to load products.", 500, id);
    }
}