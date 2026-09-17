import { Review } from "@/models/review";
import { allowRequest, apiError, apiResponse, requestId, requireUser, sanitizeText } from "@/lib/apiSecurity";
import { connectToDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const id = requestId(request);
    if (!allowRequest(request)) return apiError("Too many requests. Try again later.", 429, id);
    const product = new URL(request.url).searchParams.get("product");
    if (!product) return apiError("A product id is required.", 400, id);
    try {
        await connectToDatabase();
        const reviews = await Review.find({ product }).sort({ createdAt: -1 }).limit(100).lean();
        return apiResponse({ reviews }, 200, id);
    } catch (error) {
        console.error(JSON.stringify({ event: "reviews_list_failed", requestId: id, error: error instanceof Error ? error.message : "unknown" }));
        return apiError("Unable to load reviews.", 500, id);
    }
}

export async function POST(request: Request) {
    const id = requestId(request);
    if (!allowRequest(request, 5)) return apiError("Too many review attempts. Try again later.", 429, id);
    try {
        const user = await requireUser(request);
        if (!user) return apiError("Sign in before submitting a review.", 401, id);
        const payload = await request.json() as { product?: string; rating?: number; comment?: string };
        const comment = sanitizeText(payload.comment, 2000);
        const rating = payload.rating;
        if (!payload.product || typeof rating !== "number" || !Number.isInteger(rating) || rating < 1 || rating > 5 || comment.length < 3) {
            return apiError("Product, rating, and a valid comment are required.", 400, id);
        }
        await connectToDatabase();
        const review = await Review.create({ user: user._id, product: payload.product, rating, comment });
        return apiResponse({ review: review.toObject() }, 201, id);
    } catch (error) {
        console.error(JSON.stringify({ event: "review_create_failed", requestId: id, error: error instanceof Error ? error.message : "unknown" }));
        return apiError("Unable to submit the review.", 500, id);
    }
}