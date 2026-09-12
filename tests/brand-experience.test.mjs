import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
    return readFile(new URL(path, root), "utf8");
}

test("brand routes keep invalid slugs behind notFound", async () => {
    const page = await source("src/app/(services)/brands/[brands]/page.tsx");
    assert.match(page, /notFound\(\)/);
    assert.match(page, /generateStaticParams/);
});

test("brand imagery and charts use responsive rendering primitives", async () => {
    const brandList = await source("src/app/(services)/brands/page.tsx");
    const details = await source("src/app/(services)/shop/components/detailsProduct.tsx");
    const pie = await source("src/components/brandsPage/diagrams/pieChartD.tsx");
    const bar = await source("src/components/brandsPage/diagrams/barChartD.tsx");

    assert.match(brandList, /<Image[\s\S]*fill[\s\S]*sizes=/);
    assert.doesNotMatch(brandList, /<img\b/);
    assert.match(details, /<Image[\s\S]*fill[\s\S]*sizes=/);
    assert.doesNotMatch(details, /<img\b/);
    assert.match(pie, /ResponsiveContainer/);
    assert.match(pie, /h-\[320px\].*sm:h-\[400px\]/);
    assert.match(bar, /ResponsiveContainer/);
    assert.match(bar, /h-\[320px\].*sm:h-\[400px\]/);
});

test("brand map uses a ref container and exposes loading and failure states", async () => {
    const map = await source("src/components/brandsPage/mapChart.tsx");
    assert.match(map, /mapContainerRef/);
    assert.doesNotMatch(map, /id=["']map["']/);
    assert.match(map, /Loading map/);
    assert.match(map, /role="alert"/);
    assert.match(map, /controller\.abort\(\)/);
});
