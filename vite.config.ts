import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "experience-src",
  base: "/experiencias/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../dist/experiencias",
    emptyOutDir: true,
    target: "es2022",
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    css: false,
  },
});
