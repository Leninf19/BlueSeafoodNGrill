# Blue Seafood & Grill — website

Website for Blue Seafood & Grill, 1351 E Grand Ave, Arroyo Grande, CA 93420.

Built with [Astro](https://astro.build) as a fully static site (no server, no database), deployed on Vercel.
Pages: `/` (home), `/menu`, `/about`, `/visit` (hours, map, directions, contact).

## Updating content

Everything a non-developer usually needs to change lives in `src/data/`:

| What | File | Notes |
| --- | --- | --- |
| Hours, phone, address, reservation / social links | `src/data/business.ts` | Keep in sync with the Google Business Profile. |
| Menu | `src/data/menu.ts` | Instructions at the top of the file. **No prices** — the site intentionally does not show them, and the build fails if a `price` field is added. |
| Google reviews shown on the home page | `src/data/reviews.ts` | Static, hand-picked quotes. Copy text word for word and update `capturedOn`, the rating and the count. |
| Photos | `src/assets/photos/` + `src/data/photos.ts` | Add a JPG (≈1600–2400 px wide), import it in `photos.ts` and write alt text describing what is visible. Images are resized and converted to AVIF/WebP automatically. |

The home page "A taste of the menu" cards pull dish names and descriptions from `menu.ts`, so renaming a dish there
means updating the matching name in `src/pages/index.astro` (the build will tell you if it is missing).

## Local development

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check + build to dist/
npm run check      # post-build checks: no prices, SEO tags, alt text, links, sitemap
npm run preview    # serve the built site
```

## Deploying on Vercel

1. Vercel → **Add New… → Project** → import `leninf19/BlueSeafoodNGrill`.
2. Framework preset: **Astro** (auto-detected). Root directory: `./`.
3. Build command `npm run build` and output directory `dist` are set in `vercel.json`; leave the install command
   at Vercel's default. Node.js version: 22.x or 24.x (Vercel's default is fine).
4. Production branch: choose the branch to publish from (Project → Settings → Git). Every other branch/PR gets a preview URL.
5. Environment variable (Project → Settings → Environment Variables, Production):
   `SITE_URL=https://your-domain.com` once a custom domain is connected. Until then the site uses Vercel's
   production domain automatically for canonical URLs, the sitemap and robots.txt.
6. Custom domain: Project → Settings → Domains → add the domain and follow the DNS instructions shown there.
   Then set `SITE_URL` to the same address and redeploy.

Preview deployments serve `robots.txt` with `Disallow: /` so they are not indexed. Old GitHub Pages URLs
(`/menu.html`, `/aboutus.html`, `/contact.html`, …) permanently redirect to the new pages (see `vercel.json`).

After launch, submit `https://your-domain.com/sitemap-index.xml` in Google Search Console and add the website URL
to the Google Business Profile.
