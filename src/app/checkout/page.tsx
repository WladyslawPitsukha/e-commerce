"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCart } from "@/components/cart/cartProvider";

export default function CheckoutPage() {
    const { items, subtotal, clearCart } = useCart();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        const formData = new FormData(event.currentTarget);
        const requiredFields = ["customerEmail", "fullName", "line1", "city", "postalCode", "country"];
        if (requiredFields.some((field) => !String(formData.get(field) ?? "").trim())) {
            setError("Complete all required delivery fields.");
            return;
        }
        const response = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customerEmail: formData.get("customerEmail"),
                items: items.map(({ productId, title, unitPrice, quantity, size, color }) => ({ productId, title, unitPrice, quantity, size, color })),
                shippingAddress: {
                    fullName: formData.get("fullName"),
                    line1: formData.get("line1"),
                    line2: formData.get("line2"),
                    city: formData.get("city"),
                    postalCode: formData.get("postalCode"),
                    country: formData.get("country"),
                },
            }),
        });
        if (!response.ok) {
            const result = await response.json() as { error?: string };
            setError(result.error ?? "Unable to place the order.");
            return;
        }
        clearCart();
        setSubmitted(true);
    };

    if (submitted) {
        return <main className="page-gutter flex min-h-screen flex-col items-center justify-center gap-5 text-center"><h1 className="text-3xl font-bold">Order received</h1><p className="text-black/60">Your order details were saved locally. Sign in will be required before production checkout is enabled.</p><Link href="/shop" className="rounded-full bg-black px-6 py-3 font-medium text-white">Continue shopping</Link></main>;
    }

    if (items.length === 0) {
        return <main className="page-gutter flex min-h-screen flex-col items-center justify-center gap-5 text-center"><h1 className="text-3xl font-bold">Nothing to check out</h1><Link href="/cart" className="rounded-full bg-black px-6 py-3 font-medium text-white">Return to cart</Link></main>;
    }

    return (
        <main className="page-gutter mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 py-10">
            <h1 className="text-3xl font-bold">Checkout</h1>
            <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border p-6">
                    <h2 className="text-xl font-bold">Delivery details</h2>
                    <input name="customerEmail" type="email" required placeholder="Account email" className="rounded-md border p-3" />
                    <input name="fullName" required placeholder="Full name" className="rounded-md border p-3" />
                    <input name="line1" required placeholder="Address" className="rounded-md border p-3" />
                    <input name="line2" placeholder="Apartment, suite, etc. (optional)" className="rounded-md border p-3" />
                    <div className="grid gap-4 sm:grid-cols-2"><input name="city" required placeholder="City" className="rounded-md border p-3" /><input name="postalCode" required placeholder="Postal code" className="rounded-md border p-3" /></div>
                    <input name="country" required placeholder="Country" className="rounded-md border p-3" />
                    {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
                    <button type="submit" className="rounded-full bg-black px-6 py-3 font-medium text-white">Place order</button>
                </form>
                <aside className="flex h-fit flex-col gap-4 rounded-2xl border p-6"><h2 className="text-xl font-bold">Total</h2><p className="flex justify-between text-black/60"><span>Items</span><span>{items.reduce((total, item) => total + item.quantity, 0)}</span></p><p className="flex justify-between font-bold"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></p><p className="text-sm text-black/60">Taxes and shipping are calculated when production checkout is connected.</p></aside>
            </div>
        </main>
    );
}
