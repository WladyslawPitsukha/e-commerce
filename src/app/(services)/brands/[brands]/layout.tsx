import type { Metadata } from "next";
import {Roboto_Mono} from 'next/font/google';

export const roboto_mono = Roboto_Mono({
  subsets:['latin'],
  style:['normal'],
  weight: ['400', '700'],
  display: 'swap'
});

export type Props = {
  params: Promise<{ brands: string}>;
}

export async function generateMetadata({
  params
}: { 
  params: {
    brands: string
  }
}): Promise<Metadata> {
  const brandSlug = params.brands;
  const brandName = brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1).toLowerCase();

  return {
    title: `Brands / ${brandName}`,
    description: "Created for e-commerce's project",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto_mono.className} style={{
        backgroundColor: "white",
      }}>
        {children}
      </body>
    </html>
  );
}
