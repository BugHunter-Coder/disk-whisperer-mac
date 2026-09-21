// The product gallery on /products. Add an entry here for every app in the
// lineup — MacDissect is the flagship, the rest are cross-promoted.

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  screenshot: string;
  platform: string;
  price: string;
  status: "live" | "coming-soon";
  accent: "mint" | "coral";
  cta: { label: string; href: string } | null;
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
    screenshot: "/product/explore-treemap.png",
    platform: "macOS 14+",
    price: "Free · Pro $10 lifetime",
    status: "live",
    accent: "mint",
    cta: { label: "Download for Mac", href: "/download" },
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
    screenshot: "/product/insectscan-result.png",
    platform: "iOS",
    price: "Free trial, then subscription",
    status: "coming-soon",
    accent: "coral",
    cta: null,
    privacyHref: "/apps/insectscan/privacy",
    supportHref: "/apps/insectscan/support",
  },
];
