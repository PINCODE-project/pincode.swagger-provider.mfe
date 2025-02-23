import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@router": path.resolve(__dirname, "./src/router"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@model": path.resolve(__dirname, "./src/model"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@store": path.resolve(__dirname, "./src/store"),
        },
    },
    plugins: [react(), analyzer({ analyzerPort: 3001, openAnalyzer: false })],
});
