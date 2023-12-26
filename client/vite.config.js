import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://ecommerce2-0.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
