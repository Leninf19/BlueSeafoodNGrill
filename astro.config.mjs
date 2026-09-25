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
    // Inline the small per-page stylesheets: fewer render-blocking requests on first load.
    inlineStylesheets: 'always',
  },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  image: {
    responsiveStyles: false,
  },
  security: {
    // Content-Security-Policy, emitted as a <meta> tag on every page. Astro adds hashes for its
    // own inline scripts and styles; the extra style hash is the <noscript> header fallback in
    // src/layouts/Base.astro (update it if that rule changes). The Google map on /visit is the
    // only third-party frame. Google Analytics 4 (src/components/GoogleAnalytics.astro) needs the
    // Google tag hosts in script-src, img-src and connect-src, per Google's CSP guide for GA4.
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com",
        "font-src 'self'",
        "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
        'frame-src https://www.google.com',
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ],
      scriptDirective: {
        resources: ["'self'", 'https://*.googletagmanager.com'],
      },
      styleDirective: {
        hashes: ['sha256-NVHrdMWI1RH1Lhi920gTzPTu9uVFA1cy0T9fxPtkIoI='],
      },
    },
  },
});
