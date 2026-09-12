"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cartProvider";

export default function CartPage() {
    const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

    return (
        <main className="page-gutter mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 py-10">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-black">Your cart</h1>
                {items.length > 0 && <button type="button" onClick={clearCart} className="text-sm text-black/60 underline">Clear cart</button>}
            </div>
            {items.length === 0 ? (
                <section className="flex flex-col items-center gap-4 rounded-2xl border border-dashed p-12 text-center">
                    <h2 className="text-xl font-bold">Your cart is empty</h2>
                    <p className="text-black/60">Add something you love and it will appear here.</p>
                    <Link href="/shop" className="rounded-full bg-black px-6 py-3 font-medium text-white">Browse the shop</Link>
                </section>
            ) : (
                <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                    <section className="flex flex-col gap-4" aria-label="Cart items">
                        {items.map((item) => (
                            <article key={item.key} className="flex gap-4 rounded-2xl border p-4">
                                <Image src={item.image} alt={item.title} width={120} height={140} className="h-32 w-24 rounded-xl bg-[#F0EEED] object-cover" />
                                <div className="flex min-w-0 flex-1 flex-col gap-2">
                                    <h2 className="font-bold">{item.title}</h2>
                                    <p className="text-sm text-black/60">{item.size} / {item.color}</p>
                                    <p className="font-medium">${item.unitPrice.toFixed(2)}</p>
                                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                                        <label className="flex items-center gap-2 text-sm">Quantity <input aria-label={`Quantity for ${item.title}`} type="number" min={1} max={100} value={item.quantity} onChange={(event) => updateQuantity(item.key, Number(event.target.value))} className="w-16 rounded-md border p-2" /></label>
                                        <button type="button" onClick={() => removeItem(item.key)} className="text-sm text-black/60 underline">Remove</button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                    <aside className="flex h-fit flex-col gap-5 rounded-2xl border p-6">
                        <h2 className="text-xl font-bold">Summary</h2>
                        <div className="flex justify-between text-black/60"><span>Subtotal</span><strong className="text-black">${subtotal.toFixed(2)}</strong></div>
                        <p className="text-sm text-black/60">Shipping and taxes are calculated at checkout.</p>
                        <Link href="/checkout" className="rounded-full bg-black px-6 py-3 text-center font-medium text-white">Checkout</Link>
                    </aside>
                </div>
            )}
        </main>
    );
}
