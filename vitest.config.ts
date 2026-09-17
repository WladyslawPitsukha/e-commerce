import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    test: {
        environment: "jsdom",
        include: ["tests/components.test.tsx"],
        setupFiles: ["./tests/setup.ts"],
    },
});