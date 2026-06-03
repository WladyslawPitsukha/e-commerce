import type { Metadata } from "next";
import "./globals.css";
import {Roboto_Mono} from 'next/font/google';

export const roboto_mono = Roboto_Mono({
    subsets: ["latin"],
    style: ["normal"],
    weight: ["400", "700"],
    display: "swap",
});

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
        <html lang="en">
            <body className={`${roboto_mono.className} bg-white`}>
                {children}
            </body>
        </html>
    );
}