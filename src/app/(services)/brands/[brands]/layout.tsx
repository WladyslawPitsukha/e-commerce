import type { Metadata } from "next";

export type Props = {
  params: Promise<{ brands: string}>;
}

export async function generateMetadata({
  params
}: { 
  params: Promise<{ brands: string }>
}): Promise<Metadata> {
  const { brands: brandSlug } = await params;
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
  return <div className="bg-white">{children}</div>;
}
