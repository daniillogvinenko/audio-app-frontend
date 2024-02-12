import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{ find: "@", replacement: "/src" }],
    },
    define: {
        __API__: JSON.stringify("https://audio-app-backend.vercel.app"),
    },
});
