// The product gallery on /products. Add an entry here for every app in the
// lineup — MacDissect is the flagship, the rest are cross-promoted.

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  /** One landscape screenshot ("desktop") or several portrait phone shots ("phone"), shown as a filmstrip. */
  screenshots: { layout: "desktop" | "phone"; images: string[] };
  platform: string;
  price: string;
  status: "live" | "coming-soon";
  accent: "mint" | "coral";
  cta: { label: string; href: string } | null;
  /** Where clicking the card itself goes to read more about this product. */
  detailHref: string;
  privacyHref: string;
  supportHref: string | null;
};

export const products: Product[] = [
  {
    slug: "macdissect",
    name: "MacDissect",
    tagline: "See what's eating your Mac's disk space.",
    description:
      "Treemap and sunburst views, a large-file finder, and safe cleanup of caches and build junk. Free for your home folder — Pro unlocks full-disk scans for a one-time $10.",
    icon: "/icon-192.png",
    screenshots: { layout: "desktop", images: ["/product/explore-treemap.png"] },
    platform: "macOS 14+",
    price: "Free · Pro $10 lifetime",
    status: "live",
    accent: "mint",
    cta: { label: "Download for Mac", href: "/download" },
    detailHref: "/",
    privacyHref: "/privacy",
    supportHref: null,
  },
  {
    slug: "insectscan",
    name: "InsectScan",
    tagline: "Point. Shoot. Know.",
    description:
      "Photograph any insect, plant or animal and get a species ID in seconds, with habitat, diet, lifecycle and a clear safety rating. 20+ species are fully profiled offline.",
    icon: "/product/insectscan-icon.png",
    screenshots: {
      layout: "phone",
      images: [
        "/product/insectscan-home.png",
        "/product/insectscan-result.png",
        "/product/insectscan-species.png",
        "/product/insectscan-safety.png",
        "/product/insectscan-library.png",
      ],
    },
    platform: "iOS",
    price: "Free trial, then subscription",
    status: "coming-soon",
    accent: "coral",
    cta: null,
    detailHref: "/apps/insectscan",
    privacyHref: "/apps/insectscan/privacy",
    supportHref: "/apps/insectscan/support",
  },
  {
    slug: "sprigly",
    name: "Sprigly",
    tagline: "Snap your plate. Know what's inside.",
    description:
      "An AI calorie counter and macro tracker for iPhone: snap a meal for calories, protein, carbs and fat in seconds, scan barcodes, sync with Apple Health and celebrate streaks with friends.",
    icon: "/product/sprigly-icon.png",
    screenshots: {
      layout: "phone",
      images: [
        "/product/sprigly-today.jpg",
        "/product/sprigly-dishes.jpg",
        "/product/sprigly-progress.jpg",
        "/product/sprigly-community.jpg",
        "/product/sprigly-nutrients.jpg",
      ],
    },
    platform: "iOS",
    price: "Free · Pro $39.99/year",
    status: "coming-soon",
    accent: "mint",
    cta: null,
    detailHref: "/apps/sprigly",
    privacyHref: "/apps/sprigly/privacy",
    supportHref: "/apps/sprigly/support",
  },
  {
    slug: "hand-duel",
    name: "Rock Paper Scissors: Hand Duel",
    tagline: "Rock, paper, scissors. Played with your hand.",
    description:
      "Show rock, paper or scissors to your iPhone camera and it reads your hand. Duel Nova, a friend on one camera, or players nearby with live video. First to 3 wins.",
    icon: "/product/handduel-icon.png",
    screenshots: {
      layout: "phone",
      images: [
        "/product/handduel-home.jpg",
        "/product/handduel-arena.jpg",
        "/product/handduel-moves.jpg",
        "/product/handduel-round.jpg",
      ],
    },
    platform: "iOS",
    price: "Free · Remove Ads $2.99",
    status: "coming-soon",
    accent: "coral",
    cta: null,
    detailHref: "/apps/hand-duel",
    privacyHref: "/apps/hand-duel/privacy",
    supportHref: "/apps/hand-duel/support",
  },
  {
    slug: "astraai",
    name: "AstraAI",
    tagline: "Your personal AI astrologer.",
    description:
      "Daily horoscopes from your own birth chart, a Vedic kundli with dashas and Panchang, tarot, compatibility and AI astrologers you can ask anything, all calculated precisely on your iPhone.",
    icon: "/product/astraai-icon.png",
    screenshots: {
      layout: "phone",
      images: [
        "/product/astraai-today.jpg",
        "/product/astraai-chart.jpg",
        "/product/astraai-kundli.jpg",
        "/product/astraai-ask.jpg",
        "/product/astraai-tarot.jpg",
      ],
    },
    platform: "iOS",
    price: "Free · Pro $34.99/year",
    status: "coming-soon",
    accent: "coral",
    cta: null,
    detailHref: "/apps/astraai",
    privacyHref: "/apps/astraai/privacy",
    supportHref: "/apps/astraai/support",
  },
];
