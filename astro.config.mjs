// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Set `site` to the production URL before deploying (used for canonical/OG tags).
  vite: {
    plugins: [tailwindcss()],
  },
});
