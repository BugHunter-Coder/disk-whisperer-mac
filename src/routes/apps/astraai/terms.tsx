import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppPageShell } from "@/components/site/AppPageShell";
import { Reveal } from "@/components/site/motion";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/apps/astraai/terms")({
  head: () =>
    pageHead({
      siteName: "AstraAI",
      path: "/apps/astraai/terms",
      title: "Terms of Use – AstraAI: Astrology & Kundli",
      description: "The terms of use and subscription terms for AstraAI, the AI astrologer for iPhone.",
    }),
  component: AstraAITermsPage,
});

const LAST_UPDATED = "September 25, 2026";

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "The app",
    body: (
      <p>
        AstraAI calculates astrological charts and uses AI to write readings, horoscopes and answers
        about them. Astrology, numerology and tarot are offered for reflection and entertainment. AI
        readings can be wrong, and nothing in AstraAI is medical, legal, financial or psychological
        advice; please consult a qualified professional for those decisions.
      </p>
    ),
  },
  {
    title: "Free use and AstraAI Pro",
    body: (
      <>
        <p>
          AstraAI is free to use with today's horoscope, your birth charts, daily sign horoscopes, the
          card of the day, and 3 astrologer questions a day. AstraAI Pro (monthly, or yearly with a
          1-week free trial) unlocks weekly, monthly and yearly forecasts, full chart and
          compatibility readings, all tarot spreads, and up to 20 astrologer questions a day.
        </p>
        <p>
          Payment is charged to your Apple ID when you confirm the purchase, or when a free trial
          ends. Subscriptions renew automatically at the same price unless cancelled at least 24 hours
          before the end of the current period. You can manage or cancel in Settings → your name →
          Subscriptions. Any unused part of a free trial ends when you buy a subscription.
        </p>
      </>
    ),
  },
  {
    title: "Fair use",
    body: (
      <p>
        Daily limits keep the service fast and affordable for everyone. Please don't try to get
        around them or use AstraAI to generate content for other services.
      </p>
    ),
  },
  {
    title: "Apple's standard terms",
    body: (
      <p>
        Your use of AstraAI is also governed by Apple's{" "}
        <a
          href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
          className="underline hover:text-ink"
        >
          Standard Licensed Application End User License Agreement
        </a>
        .
      </p>
    ),
  },
  {
    title: "Contact",
    body: (
      <p>
        Questions about these terms? Email{" "}
        <a href="mailto:pawha1996@gmail.com" className="underline hover:text-ink">
          pawha1996@gmail.com
        </a>
        .
      </p>
    ),
  },
];

function AstraAITermsPage() {
  return (
    <AppPageShell appName="AstraAI" appIcon="/product/astraai-icon.png">
      <p className="text-xs font-bold tracking-[0.2em] text-ink/45 uppercase">
        Terms of use · Updated {LAST_UPDATED}
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        The fine print.
      </h1>

      <div className="mt-14 space-y-10">
        {sections.map((s) => (
          <Reveal key={s.title}>
            <h2 className="font-display text-2xl font-bold">{s.title}</h2>
            <div className="mt-3 space-y-3 text-[1.05rem] leading-relaxed text-ink/75">
              {s.body}
            </div>
          </Reveal>
        ))}
      </div>
    </AppPageShell>
  );
}
