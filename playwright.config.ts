import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    testMatch: "visual.spec.ts",
    fullyParallel: false,
    expect: {
        toHaveScreenshot: {
            animations: "disabled",
            maxDiffPixelRatio: 0.01,
        },
    },
    use: {
        baseURL: "http://127.0.0.1:3001",
        trace: "retain-on-failure",
    },
    projects: [
        {
            name: "desktop",
            use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
        },
        {
            name: "mobile",
            use: { browserName: "chromium", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
        },
    ],
    webServer: {
        command: "npm run dev -- --port 3001",
        url: "http://127.0.0.1:3001",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
});