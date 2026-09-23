/**
 * Photo library. All images are the restaurant's own photography from the previous website
 * repository. Source files live in src/assets/photos and are resized/converted (AVIF/WebP)
 * automatically at build time.
 *
 * To add a photo: drop a JPG into src/assets/photos, import it below and give it
 * descriptive alt text (what is actually visible — no marketing claims).
 */
import seafoodBoilHero from '../assets/photos/seafood-boil-hero.jpg';
import seafoodBoilBowl from '../assets/photos/seafood-boil-bowl.jpg';
import sauteedJumboShrimp from '../assets/photos/sauteed-jumbo-shrimp.jpg';
import dirtyFries from '../assets/photos/dirty-fries.jpg';
import oystersNeon from '../assets/photos/oysters-neon.jpg';
import storefrontEvening from '../assets/photos/storefront-evening.jpg';
import signDaytime from '../assets/photos/sign-daytime.jpg';
import fishOverGreens from '../assets/photos/fish-over-greens.jpg';
import tostadas from '../assets/photos/tostadas.jpg';
import dessertCreamPour from '../assets/photos/dessert-cream-pour.jpg';
import ribeyeWithShrimp from '../assets/photos/ribeye-with-shrimp.jpg';
import dessertSlice from '../assets/photos/dessert-slice.jpg';

export const photos = {
  seafoodBoilHero: {
    src: seafoodBoilHero,
    alt: 'Cajun seafood boil piled with crab legs, corn, potatoes and lemon, dusted with spices and fresh herbs',
  },
  seafoodBoilBowl: {
    src: seafoodBoilBowl,
    alt: 'A steel bowl of seafood boil with crab legs, corn, mussels, clams and a cup of dipping sauce, held by a server in a Blue Seafood & Grill shirt',
  },
  sauteedJumboShrimp: {
    src: sauteedJumboShrimp,
    alt: 'Plump sautéed jumbo shrimp on toasted sourdough, garnished with microgreens',
  },
  dirtyFries: {
    src: dirtyFries,
    alt: 'A fry basket of golden dirty fries tossed with parmesan and herbs, lifted by a gloved hand in the kitchen',
  },
  oystersNeon: {
    src: oystersNeon,
    alt: 'A platter of oysters on the half shell beneath the restaurant’s glowing blue “BLUE” neon sign',
  },
  storefrontEvening: {
    src: storefrontEvening,
    alt: 'Blue Seafood & Grill storefront on East Grand Avenue at dusk, windows lit and the blue sign glowing',
  },
  signDaytime: {
    src: signDaytime,
    alt: 'The Blue Seafood & Grill sign against a clear blue sky',
  },
  fishOverGreens: {
    src: fishOverGreens,
    alt: 'A seared fish fillet over mixed greens with cucumber, tomato and red onion',
  },
  tostadas: {
    src: tostadas,
    alt: 'Two tostadas topped with avocado, microgreens and a wedge of lime',
  },
  dessertCreamPour: {
    src: dessertCreamPour,
    alt: 'Cream being poured over a dessert topped with whipped cream and fresh berries',
  },
  ribeyeWithShrimp: {
    src: ribeyeWithShrimp,
    alt: 'Bone-in ribeye with sauce and grilled asparagus, topped with jumbo shrimp',
  },
  dessertSlice: {
    src: dessertSlice,
    alt: 'A slice of pie with toasted meringue, a lime wheel and edible flowers',
  },
} as const;

export type PhotoKey = keyof typeof photos;
