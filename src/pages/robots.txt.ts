import type { APIRoute } from 'astro';

/**
 * robots.txt is generated at build time so the sitemap URL always matches the deployed domain.
 * Non-production Vercel deployments (previews) are kept out of search results.
 */
export const GET: APIRoute = ({ site }) => {
  const isPreview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';
  const sitemap = new URL('/sitemap-index.xml', site).href;
  const body = isPreview
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
