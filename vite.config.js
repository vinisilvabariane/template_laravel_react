import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/ts"),
            "@/": path.resolve(__dirname, "resources/ts") + "/",
        },
    },
    plugins: [
        laravel({
            input: ["resources/ts/main.tsx"],
            refresh: true,
        }),
        react(),
    ],
});
