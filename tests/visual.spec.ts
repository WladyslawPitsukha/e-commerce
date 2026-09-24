import { expect, test } from "@playwright/test";

const routes = [
    { name: "home", path: "/" },
    { name: "shop", path: "/shop" },
    { name: "category", path: "/shop/casual" },
    { name: "product", path: "/shop/casual/gucci-t-shirt-l-cotton-black" },
    { name: "brands", path: "/brands" },
    { name: "brand-detail", path: "/brands/zara" },
];

test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
        Math.random = () => 0.5;
    });
});

for (const route of routes) {
    test(`${route.name} matches its visual baseline`, async ({ page }) => {
        await page.goto(route.path, { waitUntil: "networkidle" });
        await expect(page).toHaveScreenshot(`${route.name}.png`, { fullPage: true });
    });
}