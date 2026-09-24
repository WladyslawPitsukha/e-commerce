"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cartProvider";

export default function CartPage() {
    const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

    return (
        <main className="page-gutter mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 py-10 sm:py-14">
            <div className="flex items-end justify-between gap-4 border-b border-black/10 pb-5">
                <div><p className="ui-kicker">Saved selections</p><h1 className="mt-2 text-3xl font-bold text-black sm:text-4xl">Your cart</h1></div>
                {items.length > 0 && <button type="button" onClick={clearCart} className="text-sm font-semibold text-[var(--text-muted)] underline underline-offset-4 hover:text-black">Clear cart</button>}
            </div>
            {items.length === 0 ? (
                <section className="ui-panel flex flex-col items-center gap-4 border-dashed p-12 text-center">
                    <h2 className="text-xl font-bold">Your cart is empty</h2>
                    <p className="ui-muted">Add something you love and it will appear here.</p>
                    <Link href="/shop" className="ui-button">Browse the shop <span aria-hidden="true">&#8594;</span></Link>
                </section>
            ) : (
                <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                    <section className="flex flex-col gap-4" aria-label="Cart items">
                        {items.map((item) => (
                            <article key={item.key} className="ui-panel flex gap-4 p-4 transition-shadow hover:shadow-md">
                                <Image src={item.image} alt={item.title} width={120} height={140} className="h-32 w-24 rounded-xl bg-[#F0EEED] object-cover" />
                                <div className="flex min-w-0 flex-1 flex-col gap-2">
                                    <h2 className="font-bold">{item.title}</h2>
                                    <p className="text-sm text-[var(--text-muted)]">{item.size} / {item.color}</p>
                                    <p className="font-medium">${item.unitPrice.toFixed(2)}</p>
                                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                                        <label className="flex items-center gap-2 text-sm font-medium">Quantity <input aria-label={`Quantity for ${item.title}`} type="number" min={1} max={100} value={item.quantity} onChange={(event) => updateQuantity(item.key, Number(event.target.value))} className="ui-field w-16 py-2" /></label>
                                        <button type="button" onClick={() => removeItem(item.key)} className="text-sm font-semibold text-[var(--text-muted)] underline underline-offset-4 hover:text-black">Remove</button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                    <aside className="ui-panel flex h-fit flex-col gap-5 p-6">
                        <h2 className="text-xl font-bold">Summary</h2>
                        <div className="flex justify-between text-[var(--text-muted)]"><span>Subtotal</span><strong className="text-black">${subtotal.toFixed(2)}</strong></div>
                        <p className="text-sm text-[var(--text-muted)]">Shipping and taxes are calculated at checkout.</p>
                        <Link href="/checkout" className="ui-button">Checkout <span aria-hidden="true">&#8594;</span></Link>
                    </aside>
                </div>
            )}
        </main>
    );
}
