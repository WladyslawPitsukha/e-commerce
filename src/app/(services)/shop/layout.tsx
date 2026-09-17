import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "E-commerce / Shop",
    description: "Shop — discover apparel and accessories",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
    },
};

export default function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white">{children}</div>
    );
}