// ABOUTME: Astro configuration for the Between Compactions blog.
// ABOUTME: Configures Tailwind CSS via Vite plugin.
// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  }
});