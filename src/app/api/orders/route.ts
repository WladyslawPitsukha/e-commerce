import { Order } from "@/models/order";
import { allowRequest, apiError, apiResponse, requestId, requireUser } from "@/lib/apiSecurity";

export const dynamic = "force-dynamic";

type CheckoutItem = {
    productId: number;
    title: string;
    unitPrice: number;
    quantity: number;
    size?: string;
    color?: string;
};

type CheckoutPayload = {
    customerEmail: string;
    items: CheckoutItem[];
    shippingAddress: {
        fullName: string;
        line1: string;
        line2?: string;
        city: string;
        postalCode: string;
        country: string;
    };
};

export async function POST(request: Request) {
    const id = requestId(request);
    if (!allowRequest(request, 10)) return apiError("Too many checkout attempts. Try again later.", 429, id);
    try {
        const payload = await request.json() as CheckoutPayload;

        if (!payload.items?.length || !payload.shippingAddress) {
            return apiError("Cart items and shipping address are required.", 400, id);
        }

        if (payload.items.some((item) => !Number.isInteger(item.productId) || item.quantity < 1 || item.unitPrice < 0)) {
            return apiError("One or more cart items are invalid.", 400, id);
        }

        const user = await requireUser(request);
        if (!user) {
            return apiError("Sign in before checkout.", 401, id);
        }

        const items = payload.items.map((item) => ({
            catalogProductId: item.productId,
            productName: item.title,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
        }));
        const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
        const order = await Order.create({ user: user._id, items, shippingAddress: payload.shippingAddress, total });

        return apiResponse({ orderId: order._id.toString(), status: order.status }, 201, id);
    } catch (error) {
        console.error(JSON.stringify({ event: "order_create_failed", requestId: id, error: error instanceof Error ? error.message : "unknown" }));
        return apiError("Unable to place the order right now.", 500, id);
    }
}