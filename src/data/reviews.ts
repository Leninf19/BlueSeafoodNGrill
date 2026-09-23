/**
 * Google reviews — a hand-picked, STATIC selection. Nothing here updates automatically.
 *
 * Every quote is copied word for word from the public Google Business Profile.
 * Long reviews are shortened with "…" but never reworded. Google shows only relative dates
 * ("4 months ago"), so we keep that wording together with the date it was captured.
 * Reviewer names are shortened to first name + last initial.
 *
 * To refresh: open the Google profile (business.links.googleReviews), copy the new text
 * exactly, update `capturedOn`, the rating and the review count.
 */

export const googleRating = {
  rating: 4.5,
  count: 186,
  capturedOn: '2026-09-23',
  capturedOnLabel: 'September 23, 2026',
};

export interface Review {
  author: string;
  stars: 1 | 2 | 3 | 4 | 5;
  /** Relative date exactly as Google displayed it on `googleRating.capturedOn`. */
  when: string;
  quote: string;
  /** What the reviewer ordered, for the small caption. Only taken from the review text. */
  mentions?: string[];
}

export const reviews: Review[] = [
  {
    author: 'Luke B.',
    stars: 5,
    when: '4 months ago',
    quote:
      'Everything tasted fresh, well-prepared, and had that clean seafood spot feel where you can tell they care about the food. The melted shrimp tacos were honestly the standout … The sautéed clams were another highlight. … Great seafood, nice atmosphere, friendly service, and definitely a place I’d go back to.',
    mentions: ['Melted shrimp tacos', 'Sautéed clams', 'Fish and chips'],
  },
  {
    author: 'Linh & Charles',
    stars: 5,
    when: '9 months ago',
    quote:
      'Food was so fresh and amazing! … We ordered the oysters, seafood pasta, seafood boil, fish and chips, and the bone in ribeye. Everything was amazing! Especially the steak.',
    mentions: ['Oysters', 'Seafood boil', 'Bone-in ribeye'],
  },
  {
    author: 'Willis W.',
    stars: 5,
    when: '2 years ago',
    quote:
      'We got there a bit after 6 on a Saturday but luckily was able to get a party of 9 seated right away. We each ordered something different … and they were all good! Waitress was very attentive, bathroom was clean, and food was good...what else can you ask for?',
    mentions: ['Group dinner'],
  },
];
