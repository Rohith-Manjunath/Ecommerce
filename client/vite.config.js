import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://ecommerce2-0.onrender.com/api",
        changeOrigin: true,
        secure: false, // Set to true if your target URL uses HTTPS
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
