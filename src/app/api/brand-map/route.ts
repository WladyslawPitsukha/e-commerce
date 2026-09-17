import { NextResponse } from "next/server";

const mapUrl = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

export async function GET() {
    const response = await fetch(mapUrl, {
        next: { revalidate: 86400 },
    });

    if (!response.ok) {
        return NextResponse.json({ error: "Map boundaries are unavailable." }, { status: 502 });
    }

    return NextResponse.json(await response.json(), {
        headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
    });
}