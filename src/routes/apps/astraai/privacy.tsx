import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppPageShell } from "@/components/site/AppPageShell";
import { Reveal } from "@/components/site/motion";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/apps/astraai/privacy")({
  head: () =>
    pageHead({
      siteName: "AstraAI",
      path: "/apps/astraai/privacy",
      title: "Privacy Policy – AstraAI: Astrology & Kundli",
      description:
        "How AstraAI handles your birth details, chart and questions: what stays on your iPhone, what is sent to AI providers, and how to delete it.",
    }),
  component: AstraAIPrivacyPage,
});

const LAST_UPDATED = "September 25, 2026";
const EMAIL = "pawha1996@gmail.com";

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "No account needed",
    body: (
      <p>
        AstraAI works without an account. You never give us an email address or password.
      </p>
    ),
  },
  {
    title: "What stays on your iPhone",
    body: (
      <>
        <p>
          The birth details you enter (name, date, time and place of birth) and those of any people
          you add for compatibility, your chats with the astrologers, and the readings generated for
          you are stored only on your iPhone. Your natal chart, kundli, dashas, Panchang, numerology
          and tarot draws are calculated on the device.
        </p>
        <p>
          To turn a birthplace into coordinates and a time zone, the place name you type is looked up
          with Apple's location services.
        </p>
      </>
    ),
  },
  {
    title: "AI readings and questions",
    body: (
      <>
        <p>
          To write a reading or answer a question, AstraAI sends your question together with a text
          summary of the relevant charts (which includes the first name and birth details used to
          calculate them) to an AI provider: Pollinations.ai for free readings, and Anthropic
          (Claude), through our server, for AstraAI Pro. The answer is sent back to your iPhone.
        </p>
        <p>
          Our server only passes requests through. It does not store your questions or answers; it
          keeps an anonymous device and subscriber ID for a day to enforce daily limits and to check
          your Pro status.
        </p>
      </>
    ),
  },
  {
    title: "Daily horoscopes",
    body: (
      <p>
        The horoscopes for each zodiac sign are fetched from public horoscope services
        (ohmanda.com and horoscope-app-api.vercel.app). Only the sign's name is sent.
      </p>
    ),
  },
  {
    title: "Subscriptions",
    body: (
      <p>
        AstraAI Pro is sold through Apple. Purchase status is managed by RevenueCat, which receives an
        anonymous ID and your purchase history so Pro can be restored. We never see your payment
        details.
      </p>
    ),
  },
  {
    title: "What we don't do",
    body: (
      <p>
        AstraAI has no advertising and no third-party analytics or tracking SDKs, and we never sell
        your data. Daily horoscope reminders are scheduled on your iPhone.
      </p>
    ),
  },
  {
    title: "Deleting your data",
    body: (
      <p>
        Open AstraAI → the profile icon → Reset app to permanently delete every profile, chat and
        reading on your iPhone. Deleting the app does the same. You can also email{" "}
        <a href={`mailto:${EMAIL}`} className="underline hover:text-ink">
          {EMAIL}
        </a>{" "}
        with any privacy question and we'll respond within 30 days.
      </p>
    ),
  },
  {
    title: "Children",
    body: <p>AstraAI is not directed at children under 13, and we don't knowingly collect their data.</p>,
  },
  {
    title: "Changes to this policy",
    body: <p>If we change how AstraAI handles data, we'll update this page and the date at the top.</p>,
  },
];

function AstraAIPrivacyPage() {
  return (
    <AppPageShell appName="AstraAI" appIcon="/product/astraai-icon.png">
      <p className="text-xs font-bold tracking-[0.2em] text-ink/45 uppercase">
        Privacy policy · Updated {LAST_UPDATED}
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Your stars, your data.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink/65">
        What stays on your iPhone, what is sent to AI providers, and how to delete it all.
      </p>

      <div className="mt-14 space-y-10">
        {sections.map((s) => (
          <Reveal key={s.title}>
            <h2 className="font-display text-2xl font-bold">{s.title}</h2>
            <div className="mt-3 space-y-3 text-[1.05rem] leading-relaxed text-ink/75">{s.body}</div>
          </Reveal>
        ))}
      </div>
    </AppPageShell>
  );
}
