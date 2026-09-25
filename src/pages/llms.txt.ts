import type { APIRoute } from 'astro';
import { business, fullAddress } from '../data/business';
import { categoryPages, dishPages } from '../data/pages';

/**
 * /llms.txt — a plain-text summary of verified facts and key pages for AI assistants.
 * Built from the same data as the site, so it never drifts from the pages.
 */
export const GET: APIRoute = ({ site }) => {
  const u = (p: string) => new URL(p, site).href;
  const lines = [
    `# ${business.name}`,
    '',
    `> Seafood and grill restaurant at ${fullAddress}. Phone ${business.phone.display}.`,
    '',
    'Hours: ' + business.hoursSummary.map((h) => `${h.label} ${h.value}`).join('; ') + '.',
    `Reservations: online through Reserve with Google, or by phone. Pickup and delivery: DoorDash.`,
    'The website does not publish menu prices.',
    '',
    '## Pages',
    `- [Home](${u('/')})`,
    `- [Menu](${u('/menu')})`,
    ...categoryPages.map((c) => `- [${c.h1.replace(/,$/, '')} ${c.h1Em}](${u(`/menu/${c.slug}`)})`),
    ...dishPages.map((d) => `- [${d.menuName}](${u(`/menu/${d.slug}`)})`),
    `- [Order pickup or delivery](${u('/order')})`,
    `- [Reservations](${u('/reservations')})`,
    `- [Visit, hours and directions](${u('/visit')})`,
    `- [About](${u('/about')})`,
    `- [Photos](${u('/photos')})`,
    `- [FAQ](${u('/faq')})`,
    '',
    '## Links',
    `- Instagram: ${business.links.instagram}`,
    `- Facebook: ${business.links.facebook}`,
    `- Google Maps: ${business.links.googleProfile}`,
    `- Online ordering: ${business.links.order}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
