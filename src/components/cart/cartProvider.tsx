"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface CartItem {
    key: string;
    category: string;
    productId: number;
    slug: string;
    title: string;
    image: string;
    unitPrice: number;
    quantity: number;
    size: string;
    color: string;
}

interface CartContextValue {
    items: CartItem[];
    totalItems: number;
    subtotal: number;
    addItem: (item: Omit<CartItem, "key">) => void;
    updateQuantity: (key: string, quantity: number) => void;
    removeItem: (key: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "shop-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        try {
            const saved = window.localStorage.getItem(storageKey);
            if (saved) setItems(JSON.parse(saved) as CartItem[]);
        } catch {
            window.localStorage.removeItem(storageKey);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem(storageKey, JSON.stringify(items));
    }, [items]);

    const value = useMemo<CartContextValue>(() => ({
        items,
        totalItems: items.reduce((total, item) => total + item.quantity, 0),
        subtotal: items.reduce((total, item) => total + item.unitPrice * item.quantity, 0),
        addItem: (item) => setItems((current) => {
            const key = `${item.category}-${item.productId}-${item.size}-${item.color}`;
            const existing = current.find((cartItem) => cartItem.key === key);
            if (existing) {
                return current.map((cartItem) => cartItem.key === key ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem);
            }
            return [...current, { ...item, key }];
        }),
        updateQuantity: (key, quantity) => setItems((current) => quantity > 0 ? current.map((item) => item.key === key ? { ...item, quantity } : item) : current.filter((item) => item.key !== key)),
        removeItem: (key) => setItems((current) => current.filter((item) => item.key !== key)),
        clearCart: () => setItems([]),
    }), [items]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside CartProvider");
    return context;
}
