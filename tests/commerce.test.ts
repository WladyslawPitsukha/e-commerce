import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
    allowRequest: vi.fn(),
    requireUser: vi.fn(),
    connectToDatabase: vi.fn(),
    findOneAndUpdate: vi.fn(),
    createOrder: vi.fn(),
}));

const response = (data: unknown, status: number) => Response.json(data, { status });

vi.mock("@/lib/apiSecurity", () => ({
    allowRequest: mocks.allowRequest,
    apiError: (message: string, status: number) => response({ error: message }, status),
    apiResponse: (data: unknown, status: number) => response(data, status),
    requestId: () => "test-request",
    requireUser: mocks.requireUser,
}));
vi.mock("@/lib/mongodb", () => ({ connectToDatabase: mocks.connectToDatabase }));
vi.mock("@/models/cart", () => ({ Cart: { findOneAndUpdate: mocks.findOneAndUpdate } }));
vi.mock("@/models/order", () => ({ Order: { create: mocks.createOrder } }));

describe("cart-to-order API flow", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mocks.allowRequest.mockReturnValue(true);
        mocks.requireUser.mockResolvedValue({ _id: "user-1" });
    });

    it("persists a cart and creates an order with its calculated total", async () => {
        const { PUT } = await import("@/app/api/cart/route");
        mocks.findOneAndUpdate.mockReturnValue({ lean: vi.fn().mockResolvedValue({ items: [{ product: "product-1", quantity: 2 }] }) });
        const cartResponse = await PUT(new Request("http://localhost/api/cart", {
            method: "PUT",
            body: JSON.stringify({ items: [{ product: "product-1", quantity: 2, size: "M", color: "Black" }] }),
        }));
        expect(cartResponse.status).toBe(200);

        const { POST } = await import("@/app/api/orders/route");
        mocks.createOrder.mockResolvedValue({ _id: "order-1", status: "pending" });
        const orderResponse = await POST(new Request("http://localhost/api/orders", {
            method: "POST",
            body: JSON.stringify({
                customerEmail: "buyer@example.com",
                items: [{ productId: 1, title: "Shirt", unitPrice: 25, quantity: 2, size: "M", color: "Black" }],
                shippingAddress: { fullName: "Buyer", line1: "1 Main St", city: "Seattle", postalCode: "98101", country: "US" },
            }),
        }));
        expect(orderResponse.status).toBe(201);
        expect(mocks.createOrder).toHaveBeenCalledWith(expect.objectContaining({ total: 50, user: "user-1" }));
    });

    it("rejects malformed cart and checkout requests", async () => {
        const { PUT } = await import("@/app/api/cart/route");
        const { POST } = await import("@/app/api/orders/route");
        expect((await PUT(new Request("http://localhost/api/cart", { method: "PUT", body: JSON.stringify({ items: [{ product: "", quantity: 0 }] }) }))).status).toBe(400);
        expect((await POST(new Request("http://localhost/api/orders", { method: "POST", body: JSON.stringify({ items: [] }) }))).status).toBe(400);
    });
});