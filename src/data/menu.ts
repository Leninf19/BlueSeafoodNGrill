/**
 * MENU — edit this file to update the menu page, the home page highlights and the
 * menu structured data.
 *
 * House rule: this website does not show prices. There is intentionally no `price`
 * field, and TypeScript will refuse to build if one is added to an item.
 *
 * How to edit:
 *  - Change a dish: edit its `name` / `description`.
 *  - Add a dish: copy an existing `{ name, description }` block into the right section.
 *  - Remove a dish: delete its block (including the trailing comma).
 *  - `note` shows as a small line under the description (add-ons, portion options).
 *  - `tags` can be any of: 'vegetarian', 'vegan', 'raw', 'spicy', 'seasonal'.
 *  - `popular: true` shows a "Guest favorite" label. Use it only for dishes that are
 *    mentioned often in public reviews (Google review topics / Yelp menu review counts).
 *
 * Source: the restaurant's previous website menu, cross-checked with its Yelp menu listing
 * (2026-09-23). Items marked `// confirm` appear in only one source.
 */

export type MenuTag = 'vegetarian' | 'vegan' | 'raw' | 'spicy' | 'seasonal';

export interface MenuItem {
  name: string;
  description?: string;
  note?: string;
  tags?: MenuTag[];
  popular?: boolean;
}

export interface MenuSection {
  id: string;
  title: string;
  intro?: string;
  /** 'list' = full cards (default); 'compact' = simple name list (e.g. drinks). */
  layout?: 'list' | 'compact';
  items: MenuItem[];
}

/** Shown on the menu page so guests know how current the menu is. */
export const menuLastReviewed = '2026-09-23';

export const menuNotice =
  'Dishes and availability can change. Please ask your server about today’s specials, and let us know about any allergies before you order.';

export const consumerAdvisory =
  'Consuming raw or undercooked seafood, shellfish or meats may increase your risk of foodborne illness.';

export const menu: MenuSection[] = [
  {
    id: 'starters',
    title: 'Starters',
    items: [
      {
        name: 'Jumbo Shrimp Cocktail',
        description: 'Tender poached jumbo shrimp with spicy remoulade.',
      },
      {
        name: 'Sautéed Jumbo Shrimp',
        description: 'Jumbo shrimp sautéed in roasted garlic cream, served over toasted sourdough.',
      },
      {
        name: 'Shrimp Ceviche Tostadas',
        description: 'Shrimp, red onion, serrano, cilantro and avocado.',
        tags: ['raw'],
      },
      {
        name: 'Jumbo Lump Crab Cakes',
        description: 'Mixed greens and roasted pepper aioli.',
      },
      {
        name: 'Flash-Fried Calamari',
        description: 'Lightly breaded, with remoulade and spicy marinara.',
      },
      {
        name: 'Sesame-Seared Ahi Tuna',
        description:
          'Seaweed salad, cucumber, pickled Fresno chiles, avocado, fried leeks, citrus tamari and fried tapioca chips.',
        tags: ['raw'],
      },
    ],
  },
  {
    id: 'vegetarian',
    title: 'Vegetarian & Vegan',
    items: [
      {
        name: 'Veggie Marinara Bucatini',
        description: 'Asparagus, shiitake mushrooms, cherry tomatoes and broccolini.',
        note: 'Add jumbo shrimp or salmon.',
        tags: ['vegetarian'],
      },
      {
        name: 'Shiitake Tacos (3)',
        description:
          'Kimchi slaw, corn tortillas, toasted sesame seeds, micro cilantro, vegan aioli and gochujang.',
        tags: ['vegan'],
      },
    ],
  },
  {
    id: 'salads',
    title: 'Salads',
    items: [
      {
        name: 'House Salad',
        description:
          'Butter lettuce, mixed greens, onion, red pepper and grapefruit with house lemon vinaigrette.',
      },
      {
        name: 'Caesar Salad',
        description: 'Romaine, parmesan and bread crumbs.',
        note: 'Add shrimp.',
      },
      {
        name: 'Wedge Salad',
        description:
          'Iceberg, cherry heirloom tomatoes, pickled shallots, radishes, chives, candied bacon, candied pecans, ranch dressing and blue cheese.',
      },
    ],
  },
  {
    id: 'oysters',
    title: 'Oysters',
    intro: 'Available by the half dozen or dozen.',
    items: [
      {
        name: 'Oysters Rockefeller',
        description: 'Hollandaise, spinach and parmesan.',
      },
      {
        name: 'Grilled Oysters',
        description: 'Garlic butter, parmesan and parsley with toasted garlic sourdough.',
      },
      {
        name: 'Fried Oysters',
        description: 'Served with house salad, remoulade and cocktail sauce.',
      },
    ],
  },
  {
    id: 'steamers',
    title: 'Steamers & Boils',
    items: [
      {
        name: 'Cajun Seafood Boil',
        description:
          'Shrimp, crab, lobster, clams, mussels, red potatoes, corn and smoked sausage in spicy garlic butter.',
        tags: ['spicy'],
        popular: true,
      },
      {
        name: 'Pan Roast',
        description:
          'Shrimp, lobster, crab, scallops, clams and mussels finished with a smoked tomato cream sauce, over jasmine rice.',
        popular: true,
      },
      {
        name: 'Cioppino',
        description: 'An assortment of seafood simmered in tomato-herb broth, with crostini.',
      },
      {
        name: 'Sautéed Clams',
        description: 'Littleneck clams simmered in garlic butter–wine sauce, with crostini.',
        note: 'Add linguine.',
      },
    ],
  },
  {
    id: 'entrees',
    title: 'Entrées',
    items: [
      {
        name: 'Melted Shrimp Tacos (3)',
        description: 'Crispy corn tortillas, blackened shrimp, onions, peppers and cilantro aioli.',
        popular: true,
      },
      {
        name: 'Lobster Roll',
        description:
          'Poached lobster on a toasted New England roll, with dirty fries (truffle, garlic and parmesan).',
        popular: true,
      },
      {
        name: 'Fish N’ Chips',
        description: 'Beer-battered cod with slaw and remoulade.',
        note: 'Dirty fries (truffle, garlic and parmesan) available as a substitute.',
        popular: true,
      },
      {
        name: 'Halibut Tacos (3)',
        description:
          'Grilled halibut, cabbage, pico de gallo, radish, spicy remoulade and corn tortillas.',
      },
      {
        name: 'Spicy Louisiana Fried Shrimp',
        description: 'Four crispy jumbo shrimp with fries and cocktail remoulade.',
        note: 'Dirty fries available as a substitute.',
        tags: ['spicy'],
      },
      {
        name: 'Classic Shrimp Scampi',
        description: 'Sautéed jumbo shrimp in garlic butter and lemon-wine sauce over linguine.',
      },
      {
        name: 'Seafood Alfredo Pasta',
        description: 'Lobster, shrimp, scallops and clams.',
      },
      {
        name: 'Cajun Scallop Pasta',
        description: 'Pappardelle with bay scallops and peas in Cajun cream sauce.',
      },
      {
        name: 'Grilled Lobster Tail',
        description: 'Roasted fingerling potatoes, grilled asparagus and melted garlic butter.',
      },
      {
        name: 'Miso-Glazed Salmon',
        description: 'Jasmine rice, sugar peas and kimchi slaw.',
      },
      {
        name: 'Parmesan-Crusted Halibut',
        description: 'Crispy potatoes, shiitake mushrooms, broccolini and beurre blanc.',
      },
      // confirm: listed on the previous website only
      {
        name: 'King Crab',
        description: 'Grilled asparagus and drawn butter.',
        note: 'Half-pound or one-pound portions. Availability may vary.',
        tags: ['seasonal'],
      },
      {
        name: 'Bone-In Ribeye',
        description: 'Pomme purée, grilled asparagus and peppercorn sauce.',
      },
      // confirm: listed on the previous website only
      {
        name: 'Chicken Breast Madeira',
        description: 'Wild mushrooms, asparagus and pomme purée.',
      },
      {
        name: 'Western Burger',
        description:
          'Sesame brioche bun, smoked gouda, smoked bacon, garlic mayo, onion rings, house pickles and pickled Fresno chiles.',
      },
    ],
  },
  // confirm: sides, kids and drinks come from the Yelp menu listing
  {
    id: 'sides',
    title: 'Sides',
    items: [
      { name: 'Dirty Fries', description: 'Truffle oil, garlic and parmesan.', popular: true },
      { name: 'Sourdough Garlic Bread' },
      { name: 'Garlic Potato Wedges' },
      { name: 'Fries' },
      { name: 'Vegetables' },
      { name: 'Side of Shrimp' },
      { name: 'Chicken Breast' },
    ],
  },
  {
    id: 'kids',
    title: 'Kids',
    items: [
      { name: 'Kids Sliders' },
      { name: 'Kids Pasta', description: 'Choice of butter or marinara.' },
      { name: 'Kids Fish N’ Chips' },
    ],
  },
  {
    id: 'drinks',
    title: 'Soft Drinks',
    layout: 'compact',
    items: [
      { name: 'Coca-Cola' },
      { name: 'Coke Zero' },
      { name: 'Sprite' },
      { name: 'Dr Pepper' },
      { name: 'Lemonade' },
      { name: 'Iced Tea' },
      { name: 'Raspberry Iced Tea' },
      { name: 'Coffee' },
      { name: 'Fiji Water' },
      { name: 'Sparkling Water' },
    ],
  },
];

export const tagLabels: Record<MenuTag, string> = {
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  raw: 'Raw or undercooked',
  spicy: 'Spicy',
  seasonal: 'Seasonal',
};
