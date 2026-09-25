/**
 * Post-build checks for the static site.  Run: npm run build && npm run check
 * (or `node scripts/check-site.mjs <outDir>` for a build in another directory).
 *
 * Guards the house rules (no prices, no outdated staff references, no GitHub Pages base path)
 * and basic SEO/accessibility hygiene on every generated page.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = process.argv[2] || 'dist';
const errors = [];
const warn = [];

if (!existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const files = walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const routeOf = (file) => {
  const r = '/' + relative(DIST, file).split(sep).join('/');
  return r.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/(.)\/$/, '$1');
};
const routes = new Set(htmlFiles.map(routeOf));

const textOf = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];

const seen = { title: new Map(), description: new Map() };

for (const file of htmlFiles) {
  const route = routeOf(file);
  const html = readFileSync(file, 'utf8');
  const text = textOf(html);
  const metaAll = html.match(/<meta[^>]+>/gi) ?? [];
  const metaContent = metaAll.map((m) => attr(m, 'content') ?? '').join(' ');
  const jsonLd = (html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi) ?? []).join(' ');

  // House rules ------------------------------------------------------------
  const priceRe = /(?:\$\s?\d)|(?:\d+(?:\.\d{2})?\s?(?:USD|dollars))|\bMP\b|market price/i;
  for (const [where, content] of [['page text', text], ['meta tags', metaContent], ['JSON-LD', jsonLd]]) {
    const m = content.match(priceRe);
    if (m) errors.push(`${route}: price-like text in ${where}: "${m[0]}"`);
  }
  if (/"price(Range|Currency)?"|"offers"/i.test(jsonLd)) errors.push(`${route}: price fields in JSON-LD`);
  if (/raymundo|perez/i.test(html)) errors.push(`${route}: mentions former staff`);
  if (/\bchef\b/i.test(text)) warn.push(`${route}: mentions "chef" — confirm it is not a staff claim`);
  if (/BlueSeafoodNGrill/i.test(html)) errors.push(`${route}: contains old GitHub Pages base path`);

  // Required links ----------------------------------------------------------
  const ORDER = 'https://www.doordash.com/store/blue-seafood-and-grill-arroyo-grande-25401228/';
  if (['/', '/menu', '/visit'].includes(route) && !(html.includes(`href="${ORDER}"`) && /Order pickup or delivery/.test(text)))
    errors.push(`${route}: missing "Order pickup or delivery" link`);
  const credit = html.match(/Website design &amp; maintenance by <a href="([^"]+)"[^>]*>Future Marketing Studio<\/a>/);
  if (!credit || credit[1] !== 'https://futuremark.studio') errors.push(`${route}: missing footer credit`);

  // Google Analytics: the Google tag loads exactly once, after the CSP meta tag -----
  const gtagTags = html.match(/<script[^>]+src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-E4JB2S27XN"/g) ?? [];
  if (gtagTags.length !== 1) errors.push(`${route}: Google tag found ${gtagTags.length} times (expected 1)`);
  const cspAt = html.search(/<meta http-equiv="content-security-policy"/i);
  if (cspAt === -1 || cspAt > html.indexOf('googletagmanager.com/gtag/js'))
    errors.push(`${route}: CSP meta tag must come before the Google tag`);

  // SEO -------------------------------------------------------------------
  const decode = (s) => s?.replace(/&amp;/g, '&');
  const title = decode(html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim());
  const desc = decode(attr(metaAll.find((m) => /name="description"/i.test(m)) ?? '', 'content'));
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  const h1s = html.match(/<h1[\s>]/gi) ?? [];
  if (!title) errors.push(`${route}: missing <title>`);
  if (!desc) errors.push(`${route}: missing meta description`);
  if (desc && (desc.length < 70 || desc.length > 170)) warn.push(`${route}: description length ${desc.length}`);
  if (title && title.length > 65) warn.push(`${route}: title length ${title.length}`);
  if (!canonical && route !== '/404') errors.push(`${route}: missing canonical`);
  if (canonical && route === '/404') errors.push('/404: should not declare a canonical URL');
  if (canonical && canonical.endsWith('/') && route !== '/' && route !== '/404')
    errors.push(`${route}: canonical has trailing slash`);
  for (const p of route === '/404' ? ['og:title', 'og:description', 'og:image'] : ['og:title', 'og:description', 'og:url', 'og:image'])
    if (!html.includes(`property="${p}"`)) errors.push(`${route}: missing ${p}`);
  if (h1s.length !== 1) errors.push(`${route}: expected 1 <h1>, found ${h1s.length}`);
  if (route !== '/404') {
    for (const [k, v] of [['title', title], ['description', desc]]) {
      if (seen[k].has(v)) errors.push(`${route}: duplicate ${k} with ${seen[k].get(v)}`);
      seen[k].set(v, route);
    }
  }
  if (!/<html lang="/.test(html)) errors.push(`${route}: missing lang attribute`);
  for (const block of html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) ?? []) {
    try {
      JSON.parse(block.replace(/<\/?script[^>]*>/gi, ''));
    } catch {
      errors.push(`${route}: invalid JSON-LD`);
    }
  }

  // Accessibility -----------------------------------------------------------
  for (const img of html.match(/<img\b[^>]*>/gi) ?? []) {
    if (!/\salt(="|[\s>])/.test(img)) errors.push(`${route}: <img> without alt: ${img.slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(img) || !/\sheight="\d+"/.test(img))
      errors.push(`${route}: <img> without width/height (layout shift): ${img.slice(0, 80)}`);
  }
  for (const iframe of html.match(/<iframe\b[^>]*>/gi) ?? [])
    if (!/\stitle="/.test(iframe)) errors.push(`${route}: <iframe> without title`);
  for (const a of html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) ?? []) {
    const inner = a
      .replace(/<svg[\s\S]*?<\/svg>/gi, (svg) => (/aria-label="([^"]+)"/.exec(svg)?.[1] ?? ''))
      .replace(/<img\b[^>]*>/gi, (img) => ` ${attr(img, 'alt') ?? ''} `);
    const label = attr(a, 'aria-label') ?? textOf(inner).trim();
    if (!label) errors.push(`${route}: link without accessible name: ${a.slice(0, 100)}`);
    if (/target="_blank"/.test(a) && !/rel="[^"]*noopener/.test(a)) errors.push(`${route}: _blank link without noopener`);
  }

  // Links -----------------------------------------------------------------
  for (const href of (html.match(/\shref="([^"]+)"/gi) ?? []).map((h) => h.slice(7, -1))) {
    if (href === '#' || href === '') errors.push(`${route}: empty/placeholder link`);
    if (href.startsWith('/') && !href.startsWith('//')) {
      const [path, hash] = href.split('#');
      const clean = path.replace(/\/$/, '') || '/';
      const isFile = existsSync(join(DIST, path));
      if (!routes.has(clean) && !isFile) errors.push(`${route}: broken internal link ${href}`);
      if (hash && clean === route && !html.includes(`id="${hash}"`)) errors.push(`${route}: missing anchor #${hash}`);
      if (hash && clean !== route) {
        const target = htmlFiles.find((f) => routeOf(f) === clean);
        if (target && !readFileSync(target, 'utf8').includes(`id="${hash}"`))
          errors.push(`${route}: link ${href} points to missing anchor`);
      }
    }
    if (href.startsWith('#') && href.length > 1 && !html.includes(`id="${href.slice(1)}"`))
      errors.push(`${route}: missing anchor ${href}`);
  }
}

// Required files ------------------------------------------------------------
for (const f of ['robots.txt', 'sitemap-index.xml', 'og-image.jpg', 'favicon-32.png', 'apple-touch-icon.png'])
  if (!existsSync(join(DIST, f))) errors.push(`missing dist/${f}`);

const sitemap = files.filter((f) => /sitemap-\d+\.xml$/.test(f)).map((f) => readFileSync(f, 'utf8')).join('');
// The sitemap must list exactly the live pages (every built page except the 404).
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/(.)\/$/, '$1'));
const livePages = [...routes].filter((r) => r !== '/404');
for (const r of livePages) if (!sitemapPaths.includes(r)) errors.push(`sitemap missing ${r}`);
for (const p of sitemapPaths) if (!routes.has(p)) errors.push(`sitemap lists a page that does not exist: ${p}`);
if (new Set(sitemapPaths).size !== sitemapPaths.length) errors.push('sitemap has duplicate URLs');
for (const f of ['sitemap.xml', 'llms.txt']) if (!existsSync(join(DIST, f))) errors.push(`missing dist/${f}`);
if (existsSync(join(DIST, 'sitemap.xml')) && !/<sitemapindex[\s\S]*sitemap-0\.xml/.test(readFileSync(join(DIST, 'sitemap.xml'), 'utf8')))
  errors.push('sitemap.xml should be a sitemap index pointing at sitemap-0.xml');
if (/404/.test(sitemap)) errors.push('sitemap should not list the 404 page');

console.log(`Checked ${htmlFiles.length} pages: ${[...routes].join(', ')}`);
warn.forEach((w) => console.warn('warn  ' + w));
errors.forEach((e) => console.error('ERROR ' + e));
if (errors.length) {
  console.error(`\n${errors.length} error(s).`);
  process.exit(1);
}
console.log('All checks passed.');
