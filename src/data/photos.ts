/**
 * Photo library. All images are the restaurant's own photography: from the previous website
 * repository, plus storefront and back-entrance photos supplied in September 2026.
 * Source files live in src/assets/photos and are resized/converted (AVIF/WebP)
 * automatically at build time.
 *
 * To add a photo: drop a JPG into src/assets/photos, import it below and give it
 * descriptive alt text (what is actually visible — no marketing claims).
 */
import seafoodBoilHero from '../assets/photos/seafood-boil-hero.jpg';
import seafoodBoilBowl from '../assets/photos/seafood-boil-bowl.jpg';
import sauteedJumboShrimp from '../assets/photos/sauteed-jumbo-shrimp.jpg';
import dirtyFries from '../assets/photos/dirty-fries.jpg';
import oystersWide from '../assets/photos/oysters-wide.jpg';
import oystersTall from '../assets/photos/oysters-tall.jpg';
import oystersFeature from '../assets/photos/oysters-feature.jpg';
import storefrontEvening from '../assets/photos/storefront-evening.jpg';
import storefrontDay from '../assets/photos/storefront-day.jpg';
import backEntranceNight from '../assets/photos/back-entrance-night.jpg';
import fishOverGreens from '../assets/photos/fish-over-greens.jpg';
import tostadas from '../assets/photos/tostadas.jpg';
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
  oystersWide: {
    src: oystersWide,
    alt: 'Oysters on the half shell on a platter of ice with sauce cups, in front of a glowing blue “BLUE” neon sign',
  },
  oystersTall: {
    src: oystersTall,
    alt: 'Oysters on the half shell on a platter of ice with sauce cups, lit by a blue neon sign',
  },
  oystersFeature: {
    src: oystersFeature,
    alt: 'Close-up of oysters on the half shell arranged on ice around cups of sauce',
  },
  storefrontEvening: {
    src: storefrontEvening,
    alt: 'The Blue Seafood & Grill storefront at dusk: the lit blue sign above the awning and “Seafood” and “Oysters” neon in the windows',
  },
  storefrontDay: {
    src: storefrontDay,
    alt: 'The blue Blue Seafood & Grill storefront at 1351 E Grand Ave on a sunny day, with the Blue sign above the awning and “Seafood” and “Oysters” neon in the front windows',
  },
  backEntranceNight: {
    src: backEntranceNight,
    alt: 'The Blue Seafood & Grill sign on the lattice fence at the back entrance at night, lit by a lamp post beside white roses',
  },
  fishOverGreens: {
    src: fishOverGreens,
    alt: 'A seared fish fillet over mixed greens with cucumber, tomato and red onion',
  },
  tostadas: {
    src: tostadas,
    alt: 'Two tostadas topped with avocado, microgreens and a wedge of lime',
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
