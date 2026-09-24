import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import type { Faq } from "@/components/landing/content";
import { AppPageShell } from "@/components/site/AppPageShell";
import { FaqList } from "@/components/site/FaqList";
import { Reveal } from "@/components/site/motion";
import { pageHead, SPRIGLY_SOCIAL } from "@/lib/seo";

export const Route = createFileRoute("/apps/sprigly/support")({
  head: () =>
    pageHead({
      ...SPRIGLY_SOCIAL,
      path: "/apps/sprigly/support",
      title: "Support – Sprigly AI Calorie Counter",
      description:
        "Get help with Sprigly: photo scan tips, barcodes, Apple Health, managing Sprigly Pro, and how to contact us.",
    }),
  component: SpriglySupportPage,
});

const faqs: Faq[] = [
  {
    q: "Why is a photo scan estimate off?",
    a: "Shoot from above in good light with the whole plate in frame. Mixed or hidden ingredients (sauces, oils) are hard to see, so check the portion and edit the servings before you log.",
  },
  {
    q: "The barcode isn't found. What now?",
    a: "Sprigly looks barcodes up in Open Food Facts. If a product isn't listed, take a photo of the nutrition label and Sprigly will read it, or search for a similar food.",
  },
  {
    q: "How do I connect or reconnect Apple Health?",
    a: "Open the iPhone Settings app → Health → Data Access & Devices → Sprigly and turn on the categories you want. Burned calories and weigh-ins appear in Sprigly shortly after.",
  },
  {
    q: "How do I cancel or manage Sprigly Pro?",
    a: "Subscriptions are billed and managed by Apple. On your iPhone, open Settings → [your name] → Subscriptions, choose Sprigly, and change or cancel your plan there.",
  },
  {
    q: "I switched phones. How do I get Pro back?",
    a: "Sign in with the same account, then open Sprigly → Profile → Sprigly Pro and tap Restore purchases.",
  },
  {
    q: "How do I report someone in the community?",
    a: "Tap ••• on any post, or press and hold a comment, and choose Report or Block. We review every report within 24 hours.",
  },
  {
    q: "How do I delete my account?",
    a: "In Sprigly go to Profile → Delete account. This permanently removes your food log, weigh-ins and community posts. You can also email us and we'll do it within 30 days.",
  },
];

function SpriglySupportPage() {
  return (
    <AppPageShell appName="Sprigly" appIcon="/product/sprigly-icon.png">
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
