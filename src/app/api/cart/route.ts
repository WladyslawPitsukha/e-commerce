import { Cart } from "@/models/cart";
import { allowRequest, apiError, apiResponse, requestId, requireUser } from "@/lib/apiSecurity";
import { connectToDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const id = requestId(request);
    if (!allowRequest(request)) return apiError("Too many requests. Try again later.", 429, id);
    try {
        const user = await requireUser(request);
        if (!user) return apiError("Sign in to view your cart.", 401, id);
        await connectToDatabase();
        const cart = await Cart.findOne({ user: user._id }).populate("items.product").lean();
        return apiResponse({ cart: cart ?? { items: [] } }, 200, id);
    } catch {
        return apiError("Unable to load your cart.", 500, id);
    }
}

export async function PUT(request: Request) {
    const id = requestId(request);
    if (!allowRequest(request, 20)) return apiError("Too many cart updates. Try again later.", 429, id);
    try {
        const user = await requireUser(request);
        if (!user) return apiError("Sign in to update your cart.", 401, id);
        const payload = await request.json() as { items?: Array<{ product: string; quantity: number; size?: string; color?: string }> };
        if (!Array.isArray(payload.items) || payload.items.some((item) => !item.product || !Number.isInteger(item.quantity) || item.quantity < 1)) {
            return apiError("Cart items are invalid.", 400, id);
        }
        await connectToDatabase();
        const cart = await Cart.findOneAndUpdate({ user: user._id }, { user: user._id, items: payload.items }, { upsert: true, new: true, runValidators: true }).lean();
        return apiResponse({ cart }, 200, id);
    } catch {
        return apiError("Unable to update your cart.", 500, id);
    }
}