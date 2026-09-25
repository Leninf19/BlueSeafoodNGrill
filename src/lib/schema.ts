/**
 * Structured data (JSON-LD) built from the verified business details in src/data.
 *
 * Deliberately omitted:
 *  - priceRange / offers — the site does not publish prices.
 *  - aggregateRating / review — Google does not show review stars for a business's own
 *    reviews marked up on its own site, and the reviews shown are a static excerpt.
 */
import { business, fullAddress } from '../data/business';
import { menu, type MenuItem, type MenuSection } from '../data/menu';
import { categoryBySection, dishByName } from '../data/pages';

const abs = (site: URL, path: string) => new URL(path, site).href;

export function restaurantSchema(site: URL) {
  const openDays = business.hours.filter((d) => d.open && d.close);
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': abs(site, '/#restaurant'),
    name: business.name,
    url: abs(site, '/'),
    image: [abs(site, '/og-image.jpg')],
    logo: abs(site, '/icon-512.png'),
    telephone: business.phone.e164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    hasMap: business.links.googleProfile,
    servesCuisine: ['Seafood', 'American'],
    acceptsReservations: business.links.reserve,
    potentialAction: {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: business.links.order,
        actionPlatform: ['https://schema.org/DesktopWebPlatform', 'https://schema.org/MobileWebPlatform'],
      },
    },
    hasMenu: abs(site, '/menu'),
    openingHoursSpecification: openDays.map((d) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${d.schema}`,
      opens: d.open,
      closes: d.close,
    })),
    sameAs: [business.links.instagram, business.links.facebook, business.links.googleProfile],
    description: `Seafood and grill restaurant at ${fullAddress}, serving oysters, seafood boils, fish tacos, lobster rolls and steaks.`,
  };
}

export function menuSchema(site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': abs(site, '/menu#menu'),
    name: `${business.name} Menu`,
    url: abs(site, '/menu'),
    inLanguage: 'en-US',
    hasMenuSection: menu.map((section) => menuSectionData(site, section)),
  };
}

const dietFor = (item: MenuItem) =>
  item.tags?.includes('vegan')
    ? { suitableForDiet: 'https://schema.org/VeganDiet' }
    : item.tags?.includes('vegetarian')
      ? { suitableForDiet: 'https://schema.org/VegetarianDiet' }
      : {};

/** MenuItem data; links to the dish page when one is published. */
export function menuItemData(site: URL, item: MenuItem, image?: string) {
  const page = dishByName.get(item.name);
  return {
    '@type': 'MenuItem',
    name: item.name,
    ...(item.description ? { description: item.description } : {}),
    ...(page ? { url: abs(site, `/menu/${page.slug}`) } : {}),
    ...(image ? { image: abs(site, image) } : {}),
    ...dietFor(item),
  };
}

/** MenuSection data; links to the category page when one is published. */
export function menuSectionData(site: URL, section: MenuSection) {
  const page = categoryBySection.get(section.id);
  return {
    '@type': 'MenuSection',
    name: section.title,
    ...(page ? { url: abs(site, `/menu/${page.slug}`) } : {}),
    hasMenuItem: section.items.map((item) => menuItemData(site, item)),
  };
}

/** Stand-alone MenuSection for a category page. */
export function menuSectionSchema(site: URL, section: MenuSection) {
  return { '@context': 'https://schema.org', ...menuSectionData(site, section) };
}

/** Stand-alone MenuItem for a dish page (image is a site-relative URL). */
export function menuItemSchema(site: URL, item: MenuItem, image?: string) {
  return { '@context': 'https://schema.org', ...menuItemData(site, item, image) };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(site: URL, trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: abs(site, t.path),
    })),
  };
}
