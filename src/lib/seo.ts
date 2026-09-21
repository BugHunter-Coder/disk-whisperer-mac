import type { ComponentProps } from "react";
import type { Faq } from "@/components/landing/content";
import { comparisons } from "@/components/landing/compare";
import { guides } from "@/components/landing/guides";
import { DOWNLOAD } from "@/lib/download";

export const SITE_URL = "https://macdissect.com";
export const SITE_NAME = "MacDissect";
/** 1200×630 social preview, shown when a page is shared (Slack, X, iMessage, LinkedIn…). */
export const OG_IMAGE = { url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 };

type HeadOptions = {
  /** Route path, e.g. "/pricing". Used for the canonical URL and og:url. */
  path: string;
  title: string;
  description: string;
  /** Pages that must stay out of search results (sign-in, account, activation). */
  noindex?: boolean;
  /** Schema.org objects rendered as JSON-LD for rich results. */
  jsonLd?: Record<string, unknown>[];
};

type MetaTag = ComponentProps<"meta">;

/** Everything a page needs for search engines and link previews, from one place. */
export function pageHead({ path, title, description, noindex, jsonLd = [] }: HeadOptions): {
  meta: MetaTag[];
  links: ComponentProps<"link">[];
} {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "robots",
        content: noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
      },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: OG_IMAGE.url },
      { property: "og:image:width", content: String(OG_IMAGE.width) },
      { property: "og:image:height", content: String(OG_IMAGE.height) },
      { property: "og:image:alt", content: "MacDissect disk space analyzer for Mac" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE.url },
      // TanStack Router renders `script:ld+json` entries as JSON-LD scripts; its meta type doesn't model them.
      ...jsonLd.map((data) => ({ "script:ld+json": data }) as unknown as MetaTag),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "Mac Dissect",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  sameAs: [
    "https://github.com/BugHunter-Coder/disk-whisperer-mac",
    "https://peerpush.com/p/macdissect",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "Mac Dissect",
  url: SITE_URL,
};

/** The app itself: lets Google show it as software with its price and platform. */
export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  alternateName: "Mac Dissect",
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  description:
    "Disk space analyzer for Mac: treemap and sunburst views, large file finder, safe cleanup of caches and build files, and disk growth history. Scans stay on your Mac.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "macOS 14 Sonoma or later",
  softwareVersion: DOWNLOAD.version,
  fileSize: DOWNLOAD.size,
  downloadUrl: `${SITE_URL}/download`,
  url: SITE_URL,
  screenshot: [
    `${SITE_URL}/product/explore-treemap.png`,
    `${SITE_URL}/product/explore-sunburst.png`,
    `${SITE_URL}/product/cleanup.png`,
  ],
  offers: [
    { "@type": "Offer", name: "MacDissect Free", price: "0", priceCurrency: "USD" },
    {
      "@type": "Offer",
      name: "MacDissect Pro (lifetime license)",
      price: "10.00",
      priceCurrency: "USD",
      url: `${SITE_URL}/pricing`,
    },
  ],
};

export function faqJsonLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** A how-to or comparison page, so search engines know who wrote it and when. */
export function articleJsonLd({
  path,
  title,
  description,
  updated,
}: {
  path: string;
  title: string;
  description: string;
  updated: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    image: OG_IMAGE.url,
    datePublished: updated,
    dateModified: updated,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

/** Public pages listed in the sitemap. Sign-in, account and activation pages are excluded. */
export const SITEMAP_PAGES: { path: string; priority: string; changefreq: string }[] = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/download", priority: "0.9", changefreq: "weekly" },
  { path: "/pricing", priority: "0.8", changefreq: "monthly" },
  { path: "/guides", priority: "0.7", changefreq: "weekly" },
  ...guides.map((g) => ({ path: `/guides/${g.slug}`, priority: "0.7", changefreq: "monthly" })),
  ...comparisons.map((c) => ({
    path: `/compare/${c.slug}`,
    priority: "0.6",
    changefreq: "monthly",
  })),
  { path: "/privacy", priority: "0.4", changefreq: "yearly" },
  { path: "/products", priority: "0.6", changefreq: "monthly" },
  { path: "/apps/insectscan/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/apps/insectscan/support", priority: "0.3", changefreq: "monthly" },
  { path: "/apps/insectscan/terms", priority: "0.3", changefreq: "yearly" },
];
