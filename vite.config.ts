import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/oauth": {
        target: "http://valoriz.demo.cloud.akeneo.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/oauth/, "/api/oauth"),
      },
    },
    allowedHosts: ["witty-fresh-beetle.ngrok-free.app"],
  },
});
