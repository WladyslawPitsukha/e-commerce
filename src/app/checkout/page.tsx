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
        const authResponse = await fetch("/api/auth/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.get("customerEmail"), password: formData.get("password") }),
        });
        if (!authResponse.ok) {
            const result = await authResponse.json() as { error?: string };
            setError(result.error ?? "Unable to sign in.");
            return;
        }
        const { token } = await authResponse.json() as { token: string };
        const response = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
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
        return <main className="page-gutter flex min-h-screen flex-col items-center justify-center gap-5 text-center"><p className="ui-kicker">Order complete</p><h1 className="text-3xl font-bold">Order received</h1><p className="ui-muted max-w-md">Your order details were saved locally. Sign in will be required before production checkout is enabled.</p><Link href="/shop" className="ui-button">Continue shopping <span aria-hidden="true">&#8594;</span></Link></main>;
    }

    if (items.length === 0) {
        return <main className="page-gutter flex min-h-screen flex-col items-center justify-center gap-5 text-center"><p className="ui-kicker">Cart status</p><h1 className="text-3xl font-bold">Nothing to check out</h1><Link href="/cart" className="ui-button">Return to cart <span aria-hidden="true">&#8594;</span></Link></main>;
    }

    return (
        <main className="page-gutter mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 py-10 sm:py-14">
            <div className="border-b border-black/10 pb-5"><p className="ui-kicker">Secure checkout</p><h1 className="mt-2 text-3xl font-bold sm:text-4xl">Checkout</h1></div>
            <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                <form onSubmit={handleSubmit} className="ui-panel flex flex-col gap-4 p-6 sm:p-7">
                    <h2 className="text-xl font-bold">Delivery details</h2>
                    <input name="customerEmail" type="email" required placeholder="Account email" aria-label="Account email" className="ui-field" />
                    <input name="password" type="password" required placeholder="Account password" aria-label="Account password" className="ui-field" />
                    <input name="fullName" required placeholder="Full name" aria-label="Full name" className="ui-field" />
                    <input name="line1" required placeholder="Address" aria-label="Address" className="ui-field" />
                    <input name="line2" placeholder="Apartment, suite, etc. (optional)" aria-label="Apartment, suite, or other address details" className="ui-field" />
                    <div className="grid gap-4 sm:grid-cols-2"><input name="city" required placeholder="City" aria-label="City" className="ui-field" /><input name="postalCode" required placeholder="Postal code" aria-label="Postal code" className="ui-field" /></div>
                    <input name="country" required placeholder="Country" aria-label="Country" className="ui-field" />
                    {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
                    <button type="submit" className="ui-button">Place order <span aria-hidden="true">&#8594;</span></button>
                </form>
                <aside className="ui-panel flex h-fit flex-col gap-4 p-6"><h2 className="text-xl font-bold">Total</h2><p className="flex justify-between text-[var(--text-muted)]"><span>Items</span><span>{items.reduce((total, item) => total + item.quantity, 0)}</span></p><p className="flex justify-between font-bold"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></p><p className="text-sm text-[var(--text-muted)]">Taxes and shipping are calculated when production checkout is connected.</p></aside>
            </div>
        </main>
    );
}
