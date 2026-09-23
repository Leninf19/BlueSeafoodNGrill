/**
 * Business details used across every page, the structured data (JSON-LD) and the footer.
 * Edit this file when hours, phone numbers or links change — everything else updates from here.
 *
 * Verified against the Google Business Profile, Instagram and Facebook on 2026-09-23.
 */

export const business = {
  name: 'Blue Seafood & Grill',
  shortName: 'Blue',
  tagline: 'Fresh surf & turf on the Central Coast',
  /** Year the restaurant opened (SLO Tribune coverage, March 2023). */
  openedYear: 2023,

  phone: {
    display: '(805) 202-8166',
    href: 'tel:+18052028166',
    e164: '+1-805-202-8166',
  },

  address: {
    street: '1351 E Grand Ave',
    city: 'Arroyo Grande',
    region: 'CA',
    postalCode: '93420',
    country: 'US',
  },

  /** Coordinates from the Google Business Profile pin. */
  geo: { latitude: 35.1205183, longitude: -120.6048423 },

  /**
   * Opening hours, 24-hour "HH:MM" strings. Use `null` for closed days.
   * Keep this in sync with the Google Business Profile.
   */
  hours: [
    { day: 'Monday', short: 'Mon', schema: 'Monday', open: null, close: null },
    { day: 'Tuesday', short: 'Tue', schema: 'Tuesday', open: '11:30', close: '20:00' },
    { day: 'Wednesday', short: 'Wed', schema: 'Wednesday', open: '11:30', close: '20:00' },
    { day: 'Thursday', short: 'Thu', schema: 'Thursday', open: '11:30', close: '20:00' },
    { day: 'Friday', short: 'Fri', schema: 'Friday', open: '11:30', close: '20:30' },
    { day: 'Saturday', short: 'Sat', schema: 'Saturday', open: '11:30', close: '20:30' },
    { day: 'Sunday', short: 'Sun', schema: 'Sunday', open: '11:30', close: '20:30' },
  ] as const,

  /** Grouped hours for compact display. */
  hoursSummary: [
    { label: 'Tuesday – Thursday', value: '11:30 AM – 8:00 PM' },
    { label: 'Friday – Sunday', value: '11:30 AM – 8:30 PM' },
    { label: 'Monday', value: 'Closed' },
  ],

  links: {
    /**
     * Online ordering (pickup or delivery). Verified 2026-09-23: DoorDash store 25401228,
     * "Blue Seafood and Grill", 1351 E Grand Ave, Arroyo Grande. Prices are shown by DoorDash,
     * never on this site.
     */
    order: 'https://www.doordash.com/store/blue-seafood-and-grill-arroyo-grande-25401228/',
    /** The same DoorDash store's own-branded ordering page (order.online). */
    orderOnline: 'https://order.online/store/blue-seafood-and-grill-25401228',
    /** "Reserve with Google" — booking times are provided by Yelp. */
    reserve: 'https://www.google.com/maps/reserve/v/dine/c/Eq2GgEo4YCc?source=pa&hl=en-US',
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=Blue+Seafood+%26+Grill%2C+1351+E+Grand+Ave%2C+Arroyo+Grande%2C+CA+93420',
    appleMaps:
      'https://maps.apple.com/?daddr=1351+E+Grand+Ave,+Arroyo+Grande,+CA+93420&q=Blue+Seafood+%26+Grill',
    googleProfile: 'https://www.google.com/maps?cid=8498994274118114284',
    googleReviews: 'https://www.google.com/maps?cid=8498994274118114284',
    mapEmbed:
      'https://www.google.com/maps?q=Blue+Seafood+%26+Grill,+1351+E+Grand+Ave,+Arroyo+Grande,+CA+93420&z=16&output=embed',
    instagram: 'https://www.instagram.com/blueseafoodandgrill/',
    instagramHandle: '@blueseafoodandgrill',
    facebook: 'https://www.facebook.com/blueseafoodandgrill',
  },
} as const;

export const fullAddress = `${business.address.street}, ${business.address.city}, ${business.address.region} ${business.address.postalCode}`;

/** Format "20:30" as "8:30 PM". */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}
