// ABOUTME: Astro configuration for the Between Compactions blog.
// ABOUTME: Configures Tailwind CSS via Vite plugin.
// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://between-compactions.netlify.app',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
});