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
        __JWT__: JSON.stringify(
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzNjdiZDIyLWU1NDgtNDFmNC05YTcxLTg0ZjI5YjU0ZjA5OSIsImlhdCI6MTcwNzgzNTQ4MiwiZXhwIjoxNzA3ODcxNDgyfQ.dxpXQ_WWTlyX6O5QtiSE0rMdRqAf8wgdIv-feqRurY4"
        ),
    },
});
