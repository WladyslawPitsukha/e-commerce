import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Order } from "@/models/order";
import { User } from "@/models/user";

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
    try {
        const payload = await request.json() as CheckoutPayload;
        const email = payload.customerEmail?.trim().toLowerCase();

        if (!email || !payload.items?.length || !payload.shippingAddress) {
            return NextResponse.json({ error: "Customer email, cart items, and shipping address are required." }, { status: 400 });
        }

        if (payload.items.some((item) => !Number.isInteger(item.productId) || item.quantity < 1 || item.unitPrice < 0)) {
            return NextResponse.json({ error: "One or more cart items are invalid." }, { status: 400 });
        }

        await connectToDatabase();
        const user = await User.findOne({ email }).select("_id").lean();
        if (!user) {
            return NextResponse.json({ error: "No account was found for this email. Sign in before checkout." }, { status: 401 });
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

        return NextResponse.json({ orderId: order._id.toString(), status: order.status }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Unable to place the order right now." }, { status: 500 });
    }
}