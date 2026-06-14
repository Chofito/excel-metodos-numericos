import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// GitHub Pages project site → https://www.chofito.dev/excel-metodos-numericos/
const pagesBase = "/excel-metodos-numericos/";

// https://vite.dev/config/
export default defineConfig({
	base: pagesBase,
	plugins: [react(), tailwindcss()],
});
