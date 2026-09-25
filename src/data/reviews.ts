/**
 * Google reviews — a hand-picked, STATIC selection. Nothing here updates automatically.
 *
 * Every quote is copied word for word from the public Google Business Profile.
 * Each excerpt is one exact sentence from the review; nothing is reworded.
 * Google shows only relative dates ("4 months ago"), so we keep that wording together
 * with the date it was captured.
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
}

/**
 * Topics Google lists above the reviews (with the number of reviews mentioning each),
 * as shown on `googleRating.capturedOn`.
 */
export const googleTopics = [
  { label: 'Fish and chips', count: 21 },
  { label: 'Oysters', count: 14 },
  { label: 'Shrimp tacos', count: 13 },
  { label: 'Lobster roll', count: 13 },
];

// Quotes are off the site until the restaurant confirms permission to reuse them (2026-09-24).
// The previous selection is in git history; add entries back here once approved.
export const reviews: Review[] = [];
