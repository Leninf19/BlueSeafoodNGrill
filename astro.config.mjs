// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * The public URL is used for canonical links, Open Graph URLs, the sitemap and robots.txt.
 *
 * Set SITE_URL in Vercel (Project → Settings → Environment Variables) once the custom domain
 * is connected, e.g. SITE_URL=https://www.example.com. Until then, Vercel's own production
 * domain is used automatically. Never include a sub-path here (the old GitHub Pages
 * "/BlueSeafoodNGrill/" base path is intentionally gone).
 */
const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = (
  process.env.SITE_URL ||
  (vercelProductionHost ? `https://${vercelProductionHost}` : 'http://localhost:4321')
).replace(/\/+$/, '');

export default defineConfig({
  site,
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  image: {
    responsiveStyles: false,
  },
});
