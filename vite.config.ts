import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "My Awesome App",
                short_name: "MyApp",
                description: "My Awesome App description",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: [{ find: "@", replacement: "/src" }],
    },
    define: {
        // __API__: JSON.stringify("https://audio-app-backend.vercel.app"),
        __API__: JSON.stringify("http://localhost:8000"),
        __JWT__: JSON.stringify(
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzNjdiZDIyLWU1NDgtNDFmNC05YTcxLTg0ZjI5YjU0ZjA5OSIsImlhdCI6MTcwNzkzMzQ2MCwiZXhwIjoxNzA3OTY5NDYwfQ.sgk6M5z71ow7CG48-jCPGZQhITIbmnWAvYoNVv1DStU"
        ),
    },
});
