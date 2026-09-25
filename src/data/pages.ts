/**
 * Menu category pages (/menu/<slug>) and individual dish pages (/menu/<slug>).
 *
 * Only publish a page when its facts are confirmed. Dish pages require an actual photo of
 * the dish (see src/data/photos.ts). Descriptions come from src/data/menu.ts; anything added
 * here must be verifiable (the source is noted next to each fact).
 *
 * Sources used below:
 *  - MENU: src/data/menu.ts (restaurant's previous website menu, cross-checked with Yelp).
 *  - ORDER: Blue's online ordering page (order.online, the DoorDash store), checked 2026-09-25.
 *  - GOOGLE: Google Business Profile review topics, captured 2026-09-23.
 *  - PHOTO: what is visible in the restaurant's own photo.
 */
import type { PhotoKey } from './photos';

export interface CategoryPage {
  /** Menu section id in src/data/menu.ts */
  section: string;
  slug: string;
  title: string;
  description: string;
  h1: string;
  h1Em: string;
  intro: string[];
  photo?: PhotoKey;
  photoCaption?: string;
}

export interface DishPage {
  slug: string;
  /** Exact item name in src/data/menu.ts */
  menuName: string;
  section: string;
  title: string;
  description: string;
  photos: PhotoKey[];
  /** What the photo shows, in plain words (PHOTO). */
  asPictured?: string;
  /** Extra verified facts, each with its source in a comment. */
  facts: string[];
  /** Related dishes by exact menu name. */
  related: string[];
  faqs: { q: string; a: string }[];
  /** Listed on Blue's online ordering page (ORDER). */
  onlineOrdering: boolean;
}

export const categoryPages: CategoryPage[] = [
  {
    section: 'oysters',
    slug: 'oysters',
    title: 'Oysters – Rockefeller, Grilled & Fried | Blue Seafood & Grill',
    description:
      'Oysters at Blue Seafood & Grill in Arroyo Grande: baked Rockefeller-style, grilled with garlic butter and parmesan, or fried. By the half dozen or dozen.',
    h1: 'Oysters,',
    h1Em: 'three ways',
    intro: [
      // MENU
      'We serve oysters three ways, by the half dozen or the dozen: baked Rockefeller-style with hollandaise, spinach and parmesan; grilled with garlic butter, parmesan and parsley, with toasted garlic sourdough; or fried, with house salad, remoulade and cocktail sauce.',
      // GOOGLE
      'They’re one of the dishes guests bring up most in our Google reviews.',
    ],
    photo: 'oystersFeature',
    photoCaption: 'Oysters at Blue Seafood & Grill.',
  },
  {
    section: 'steamers',
    slug: 'steamers-and-boils',
    title: 'Cajun Seafood Boil, Cioppino & Pan Roast | Blue Seafood & Grill',
    description:
      'Steamers and boils at Blue Seafood & Grill in Arroyo Grande: the Cajun Seafood Boil, Pan Roast, Cioppino and Sautéed Clams. An assortment of seafood on the plate.',
    h1: 'Steamers &',
    h1Em: 'boils',
    intro: [
      // Approved home page wording
      'An assortment of seafood on the plate. Built for a seafood feast.',
      // MENU
      'The Cajun Seafood Boil brings shrimp, crab, lobster, clams, mussels, red potatoes, corn and smoked sausage together in spicy garlic butter. The Pan Roast finishes shellfish in a smoked tomato cream over jasmine rice, the Cioppino simmers seafood in tomato-herb broth, and the Sautéed Clams come in a garlic butter–wine sauce.',
    ],
    photo: 'seafoodBoilHero',
    photoCaption: 'The Cajun Seafood Boil.',
  },
  {
    section: 'starters',
    slug: 'starters',
    title: 'Starters – Crab Cakes, Calamari & Ahi Tuna | Blue Seafood & Grill',
    description:
      'Starters at Blue Seafood & Grill in Arroyo Grande: jumbo shrimp cocktail, sautéed jumbo shrimp, shrimp ceviche tostadas, crab cakes, calamari and sesame-seared ahi.',
    h1: 'Starters',
    h1Em: 'to share',
    intro: [
      // MENU
      'Six starters, half of them built around shrimp: a chilled jumbo shrimp cocktail with spicy remoulade, jumbo shrimp sautéed in roasted garlic cream over sourdough, and shrimp ceviche tostadas. The other three are jumbo lump crab cakes, flash-fried calamari and sesame-seared ahi tuna.',
    ],
    photo: 'sauteedJumboShrimp',
    photoCaption: 'Sautéed Jumbo Shrimp over toasted sourdough.',
  },
  {
    section: 'entrees',
    slug: 'entrees',
    title: 'Seafood & Steak Entrées | Blue Seafood & Grill, Arroyo Grande',
    description:
      'Entrées at Blue Seafood & Grill in Arroyo Grande: shrimp and halibut tacos, lobster roll, fish n’ chips, seafood pastas, salmon, king crab and bone-in ribeye.',
    h1: 'Seafood & steak',
    h1Em: 'entrées',
    intro: [
      // MENU
      'The longest part of the menu: tacos (melted shrimp and grilled halibut), a lobster roll with dirty fries, beer-battered fish n’ chips, three seafood pastas, miso-glazed salmon, parmesan-crusted halibut, grilled lobster tail and King Crab when it’s in season. For the steak side of the table there’s a bone-in ribeye and a Western burger, and there’s Chicken Breast Madeira too.',
    ],
    // No photo: the only ribeye photo shows shrimp the menu description doesn't include.
  },
];

export const dishPages: DishPage[] = [
  {
    slug: 'cajun-seafood-boil',
    menuName: 'Cajun Seafood Boil',
    section: 'steamers',
    title: 'Cajun Seafood Boil in Arroyo Grande | Blue Seafood & Grill',
    description:
      'Blue’s Cajun Seafood Boil: shrimp, crab, lobster, clams, mussels, red potatoes, corn and smoked sausage in spicy garlic butter. Arroyo Grande, dine in or order online.',
    photos: ['seafoodBoilBowl', 'seafoodBoilHero'],
    // PHOTO
    asPictured: 'In our photos it’s served in a steel bowl, with lemon and a cup of dipping sauce.',
    facts: [
      // MENU
      'Made with spicy garlic butter. It’s one of our steamers and boils.',
      // ORDER
      'You can order it on DoorDash for pickup or delivery.',
    ],
    related: ['Pan Roast', 'Cioppino', 'Seafood Alfredo Pasta', 'Dirty Fries'],
    faqs: [
      {
        q: 'Is the Cajun Seafood Boil spicy?',
        a: 'It’s made with spicy garlic butter. If you’re not sure about the heat, ask your server before you order.',
      },
      {
        q: 'Can I order the Cajun Seafood Boil for pickup or delivery?',
        a: 'Yes. It’s on our DoorDash menu for pickup or delivery.',
      },
    ],
    onlineOrdering: true,
  },
  {
    slug: 'sauteed-jumbo-shrimp',
    menuName: 'Sautéed Jumbo Shrimp',
    section: 'starters',
    title: 'Sautéed Jumbo Shrimp with Garlic Cream | Blue Seafood & Grill',
    description:
      'Sautéed Jumbo Shrimp at Blue Seafood & Grill in Arroyo Grande: jumbo shrimp in roasted garlic cream, served over toasted sourdough. One of our starters.',
    photos: ['sauteedJumboShrimp'],
    // PHOTO
    asPictured: 'In our photo the shrimp sit on toasted sourdough, finished with green herbs.',
    facts: [
      // MENU
      'One of six starters on our menu.',
      // ORDER
      'You can order it on DoorDash for pickup or delivery.',
    ],
    related: ['Jumbo Shrimp Cocktail', 'Shrimp Ceviche Tostadas', 'Classic Shrimp Scampi', 'Melted Shrimp Tacos (3)'],
    faqs: [
      {
        q: 'What comes with the Sautéed Jumbo Shrimp?',
        a: 'The jumbo shrimp are sautéed in roasted garlic cream and served over toasted sourdough.',
      },
    ],
    onlineOrdering: true,
  },
  // Bone-In Ribeye: unpublished until there is a photo that matches the menu description
  // (the only ribeye photo shows it topped with jumbo shrimp, which the menu doesn't list).
  {
    slug: 'dirty-fries',
    menuName: 'Dirty Fries',
    section: 'sides',
    title: 'Dirty Fries – Truffle, Garlic & Parmesan | Blue Seafood & Grill',
    description:
      'Dirty Fries at Blue Seafood & Grill in Arroyo Grande: fries with truffle oil, garlic and parmesan. A side that comes with the lobster roll.',
    photos: ['dirtyFries'],
    // PHOTO
    asPictured: 'In our photo they are lifted from the fryer in a wire basket, tossed with parmesan and herbs.',
    facts: [
      // MENU
      'Order them as a side. They also come with the Lobster Roll.',
      // MENU
      'You can swap them in on the Fish N’ Chips and the Spicy Louisiana Fried Shrimp.',
      // ORDER
      'You can order them on DoorDash for pickup or delivery.',
    ],
    related: ['Lobster Roll', 'Fish N’ Chips', 'Spicy Louisiana Fried Shrimp', 'Sourdough Garlic Bread'],
    faqs: [
      {
        q: 'What are dirty fries?',
        a: 'Ours are fries finished with truffle oil, garlic and parmesan.',
      },
      {
        q: 'Which dishes come with dirty fries?',
        a: 'The Lobster Roll comes with them, and you can swap them in on the Fish N’ Chips and the Spicy Louisiana Fried Shrimp.',
      },
    ],
    onlineOrdering: true,
  },
];

export const categoryBySection = new Map(categoryPages.map((c) => [c.section, c]));
export const dishByName = new Map(dishPages.map((d) => [d.menuName, d]));
