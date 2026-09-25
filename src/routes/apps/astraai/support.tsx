import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import type { Faq } from "@/components/landing/content";
import { AppPageShell } from "@/components/site/AppPageShell";
import { FaqList } from "@/components/site/FaqList";
import { Reveal } from "@/components/site/motion";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/apps/astraai/support")({
  head: () =>
    pageHead({
      siteName: "AstraAI",
      path: "/apps/astraai/support",
      title: "Support – AstraAI: Astrology & Kundli",
      description:
        "Get help with AstraAI: birth time and place, chart accuracy, managing AstraAI Pro, and how to contact us.",
    }),
  component: AstraAISupportPage,
});

const faqs: Faq[] = [
  {
    q: "I don't know my exact birth time. Can I still use AstraAI?",
    a: "Yes. Turn off \"I know my birth time\" when entering your details. Planets and signs stay accurate; your rising sign, houses and Vedic lagna are skipped because they depend on the exact time.",
  },
  {
    q: "My rising sign looks wrong.",
    a: "Check the birth time and birthplace in the profile icon → Edit birth details. Even a few minutes can change the rising sign, and the time is always taken in the birthplace's own time zone.",
  },
  {
    q: "Why does my Vedic sign differ from my Western sign?",
    a: "Western astrology uses the tropical zodiac; Vedic (Jyotish) uses the sidereal zodiac with the Lahiri ayanamsa, which is about 24° behind. Many people's Vedic signs are one sign earlier.",
  },
  {
    q: "How do I cancel or manage AstraAI Pro?",
    a: "Subscriptions are billed and managed by Apple. On your iPhone, open Settings → [your name] → Subscriptions, choose AstraAI, and change or cancel your plan there.",
  },
  {
    q: "I got a new phone. How do I get Pro back?",
    a: "Open AstraAI → profile icon → Restore purchases, while signed in to the same Apple ID you subscribed with.",
  },
  {
    q: "How do I delete my data?",
    a: "Open AstraAI → profile icon → Reset app. This permanently deletes every profile, chat and reading stored on your iPhone.",
  },
];

function AstraAISupportPage() {
  return (
    <AppPageShell appName="AstraAI" appIcon="/product/astraai-icon.png">
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
