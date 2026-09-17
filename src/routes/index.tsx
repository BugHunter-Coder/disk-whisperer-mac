import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { MacTeardown } from "@/components/teardown/MacTeardown";
import {
  CleanupSection,
  CtaBand,
  FaqSection,
  FeaturesSection,
  MonitorSection,
  PrivacyTeaser,
  ScreenshotsSection,
} from "@/components/landing/Sections";
import { PageShell } from "@/components/site/SiteFooter";
import { easeOut, fadeUp, staggerParent, WordReveal } from "@/components/site/motion";
import { productFaqs } from "@/components/landing/content";
import { faqJsonLd, organizationJsonLd, pageHead, softwareJsonLd, websiteJsonLd } from "@/lib/seo";

const description =
  "MacDissect shows what's filling your Mac with a treemap and sunburst, finds large files, cleans caches and build files safely, and tracks disk growth over time. Scans stay on your Mac.";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      path: "/",
      title: "MacDissect – Disk Space Analyzer & Cleaner for Mac",
      description,
      jsonLd: [websiteJsonLd, organizationJsonLd, softwareJsonLd, faqJsonLd(productFaqs)],
    }),
  component: Index,
});

const stats = [
  { value: "6", label: "views, from treemap to history" },
  { value: "14", label: "kinds of reclaimable data" },
  { value: "0", label: "files uploaded, ever" },
];

function Index() {
  return (
    <PageShell>
      <MacTeardown />
      <ScreenshotsSection />
      <FeaturesSection />
      <CleanupSection />
      <MonitorSection />
      <PrivacyTeaser />
      <CtaBand />
      <FaqSection />
    </PageShell>
  );
}
