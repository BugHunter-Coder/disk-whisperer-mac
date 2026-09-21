import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import type { Faq } from "@/components/landing/content";
import { AppPageShell } from "@/components/site/AppPageShell";
import { FaqList } from "@/components/site/FaqList";
import { Reveal } from "@/components/site/motion";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/apps/insectscan/support")({
  head: () =>
    pageHead({
      path: "/apps/insectscan/support",
      title: "Support – InsectScan",
      description:
        "Get help with InsectScan: identification tips, managing your subscription, and how to contact us.",
    }),
  component: InsectScanSupportPage,
});

const faqs: Faq[] = [
  {
    q: "Why can't InsectScan identify my photo?",
    a: "Get the whole subject in frame, in good light, and as close as is safe. Very blurry, dark or heavily obstructed photos are the most common reason for a low-confidence or missing result.",
  },
  {
    q: "Does InsectScan work without an internet connection?",
    a: "Yes for the 20+ fully profiled species and hundreds more in the bundled offline model. A connection is only used when that model isn't confident and InsectScan asks an AI provider for a second opinion.",
  },
  {
    q: "How do I cancel or manage my subscription?",
    a: "Subscriptions are billed and managed by Apple. On your iPhone, open Settings → [your name] → Subscriptions, choose InsectScan, and change or cancel your plan there.",
  },
  {
    q: "I resubscribed or switched phones — how do I get Pro back?",
    a: "Open InsectScan → Settings and tap Restore Purchases. If you're still signed in with the same Apple ID that bought Pro, it will be restored immediately.",
  },
  {
    q: "How do I delete a scan, or all my history?",
    a: "Swipe to delete any entry in the Library tab. Scan history lives only on your iPhone, so removing the app deletes all of it too.",
  },
  {
    q: "How do I delete my account?",
    a: "Email us and we'll delete your account and any data tied to it within 30 days.",
  },
];

function InsectScanSupportPage() {
  return (
    <AppPageShell appName="InsectScan" appIcon="/product/insectscan-icon.png">
      <p className="text-xs font-bold tracking-[0.2em] text-ink/45 uppercase">Support</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Here to help.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink/65">
        Answers to the most common questions. Can't find yours? Email us directly.
      </p>

      <Reveal className="mt-10">
        <a
          href="mailto:pawha1996@gmail.com"
          className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-bold text-cream transition-transform hover:-translate-y-0.5"
        >
          <Mail className="size-4" /> pawha1996@gmail.com
        </a>
      </Reveal>

      <Reveal className="mt-12">
        <FaqList items={faqs} />
      </Reveal>
    </AppPageShell>
  );
}
