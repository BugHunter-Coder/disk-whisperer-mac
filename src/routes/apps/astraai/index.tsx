import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Hash,
  HeartHandshake,
  Layers,
  LayoutGrid,
  MessagesSquare,
  MoonStar,
  Orbit,
  Sun,
} from "lucide-react";
import type { Faq } from "@/components/landing/content";
import { PageShell } from "@/components/site/SiteFooter";
import { FaqList } from "@/components/site/FaqList";
import { Reveal, Stagger, StaggerItem, WordReveal } from "@/components/site/motion";
import { ASTRAAI_SOCIAL, faqJsonLd, pageHead, SITE_URL } from "@/lib/seo";

const PATH = "/apps/astraai";
const TITLE = "AstraAI: AI Astrologer, Horoscope & Kundli for iPhone";
const DESCRIPTION =
  "Your personal AI astrologer. Daily horoscopes from your own birth chart, a Vedic kundli with dashas and Panchang, tarot, compatibility and Guna Milan, and AI astrologers you can ask anything.";

const faqs: Faq[] = [
  {
    q: "How is AstraAI different from a normal horoscope app?",
    a: "Most horoscope apps write one message for everyone with your Sun sign. AstraAI calculates your full birth chart and today's planetary transits on your iPhone, then writes a horoscope from your own placements: your Moon, rising sign, houses and the transits hitting them today.",
  },
  {
    q: "Does AstraAI do Vedic astrology and kundli?",
    a: "Yes. AstraAI draws your kundli in the South Indian style with the Lahiri ayanamsa, and shows your lagna, rashi, janma nakshatra and pada, every graha's bhava, your Vimshottari dasha timeline, Mangal dosha and a gemstone suggestion. Today's Panchang (tithi, nakshatra, yoga, karana and vara) is on the home screen.",
  },
  {
    q: "What do I need to get started?",
    a: "Your birth date, time and city. The exact time unlocks your rising sign, houses and lagna; if you don't know it, AstraAI still calculates every planet and sign accurately.",
  },
  {
    q: "Who are the AI astrologers?",
    a: "Six AI specialists, each focused on a different area: an all-round astrologer, a Vedic jyotishi, and specialists in love, career, tarot and numerology. They already know your chart and today's sky, so you can simply ask. They are AI, clearly labelled as such, and not real people.",
  },
  {
    q: "Can AstraAI check compatibility?",
    a: "Yes. Add a partner, crush, friend or family member to see a Western synastry score with the key cross-chart aspects, plus the Vedic Ashtakoota Guna Milan out of 36 with every koota explained.",
  },
  {
    q: "Is AstraAI free?",
    a: "Yes. AstraAI is free with today's horoscope, your charts and kundli, horoscopes for every sign, the tarot card of the day and 3 astrologer questions a day. AstraAI Pro adds weekly, monthly and yearly forecasts, full chart and compatibility readings, all tarot spreads and 20 questions a day for $4.99 a month or $34.99 a year, with a 1-week free trial on the yearly plan.",
  },
  {
    q: "Is my birth data private?",
    a: "Your birth details, charts and chats are stored only on your iPhone, and there's no account to create. To write a reading, your question and chart summary are sent to an AI provider. See the privacy policy for details.",
  },
];

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "AstraAI",
  alternateName: ["AstraAI: Astrology & Kundli", "AstraAI Astrologer"],
  description: DESCRIPTION,
  url: `${SITE_URL}${PATH}`,
  applicationCategory: "LifestyleApplication",
  applicationSubCategory: "Astrology, horoscope and kundli",
  operatingSystem: "iOS 17 or later",
  image: `${SITE_URL}/product/astraai-icon.png`,
  screenshot: [
    `${SITE_URL}/product/astraai-today.jpg`,
    `${SITE_URL}/product/astraai-chart.jpg`,
    `${SITE_URL}/product/astraai-kundli.jpg`,
    `${SITE_URL}/product/astraai-ask.jpg`,
    `${SITE_URL}/product/astraai-tarot.jpg`,
  ],
  featureList: [
    "Personal daily horoscope from your birth chart",
    "Western natal chart with houses and aspects",
    "Vedic kundli with nakshatra and Vimshottari dasha",
    "Daily Panchang",
    "AI astrologers for love, career, Vedic, tarot and numerology",
    "Tarot card of the day and spreads",
    "Compatibility with synastry and Guna Milan",
    "Numerology",
  ],
  offers: [
    { "@type": "Offer", name: "AstraAI Free", price: "0", priceCurrency: "USD" },
    { "@type": "Offer", name: "AstraAI Pro Monthly", price: "4.99", priceCurrency: "USD" },
    { "@type": "Offer", name: "AstraAI Pro Yearly", price: "34.99", priceCurrency: "USD" },
  ],
};

export const Route = createFileRoute("/apps/astraai/")({
  head: () =>
    pageHead({
      ...ASTRAAI_SOCIAL,
      path: PATH,
      title: TITLE,
      description: DESCRIPTION,
      jsonLd: [appJsonLd, faqJsonLd(faqs)],
    }),
  component: AstraAIPage,
});

const screenshots = [
  {
    src: "/product/astraai-today.jpg",
    alt: "AstraAI personal daily horoscope written from the user's transits",
  },
  {
    src: "/product/astraai-chart.jpg",
    alt: "AstraAI natal chart wheel with planets, houses and aspects",
  },
  {
    src: "/product/astraai-kundli.jpg",
    alt: "AstraAI Vedic kundli with lagna, rashi and nakshatra",
  },
  {
    src: "/product/astraai-ask.jpg",
    alt: "AstraAI AI astrologers for love, career, Vedic, tarot and numerology",
  },
  {
    src: "/product/astraai-tarot.jpg",
    alt: "AstraAI tarot card of the day with a personal reading",
  },
];

const features = [
  {
    icon: Sun,
    title: "Your own daily horoscope",
    body: "Written from your Moon, rising sign and today's transits, not a one-size-fits-all Sun sign blurb.",
  },
  {
    icon: Orbit,
    title: "Birth chart",
    body: "A natal chart wheel with every planet, Placidus houses and aspects. Tap a planet to learn what it means for you.",
  },
  {
    icon: LayoutGrid,
    title: "Vedic kundli",
    body: "Lagna, rashi, nakshatra and pada, bhavas, Vimshottari dashas, Mangal dosha and a gemstone suggestion.",
  },
  {
    icon: MoonStar,
    title: "Daily Panchang",
    body: "Tithi, nakshatra, yoga, karana and vara for today, with a heads-up when it's a day to avoid new starts.",
  },
  {
    icon: MessagesSquare,
    title: "Ask an AI astrologer",
    body: "Six AI specialists for love, career, Vedic astrology, tarot and numerology who already know your chart.",
  },
  {
    icon: Layers,
    title: "Tarot",
    body: "A new card of the day, plus Yes/No, Past–Present–Future, love and career spreads read against your chart.",
  },
  {
    icon: HeartHandshake,
    title: "Compatibility",
    body: "Western synastry and the Vedic 36-point Guna Milan for partners, friends and family.",
  },
  {
    icon: Hash,
    title: "Numerology",
    body: "Life Path, Expression, Soul Urge, Personality and your Personal Year number.",
  },
];

const steps = [
  { n: "1", title: "Enter", body: "Your birth date, time and city. That's all AstraAI needs." },
  {
    n: "2",
    title: "Calculate",
    body: "Your chart, kundli and today's sky are worked out precisely on your iPhone.",
  },
  {
    n: "3",
    title: "Ask",
    body: "Read your horoscope, then ask an AI astrologer anything about love, work or timing.",
  },
];

function AstraAIPage() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden px-6 pt-36 pb-16 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_85%_0%,rgba(90,70,170,0.28),transparent),radial-gradient(40%_50%_at_10%_20%,rgba(217,191,138,0.18),transparent)]"
        />
        <div className="mx-auto max-w-6xl">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/55 hover:text-ink"
          >
            <ArrowLeft className="size-4" /> All products
          </Link>

          <div className="mt-6 flex items-center gap-4">
            <img
              src="/product/astraai-icon.png"
              alt="AstraAI app icon"
              className="size-16 rounded-2xl shadow-lg"
            />
            <span className="rounded-full bg-coral px-3 py-1 text-xs font-bold text-ink">
              Coming soon on iPhone
            </span>
          </div>

          <p className="mt-6 text-sm font-bold tracking-[0.2em] text-ink/45 uppercase">
            AstraAI · AI astrologer, horoscope & kundli
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.95] font-extrabold tracking-tight">
            <WordReveal text="Your chart." />{" "}
            <WordReveal text="Your stars. Your answers." className="text-coral" delay={0.2} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-5 max-w-2xl text-lg text-ink/65"
          >
            AstraAI is a personal AI astrologer for iPhone. It calculates your Western birth chart
            and Vedic kundli from your exact birth time and place, writes a horoscope from your own
            transits every day, and lets you ask AI astrologers anything about love, career and
            timing.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-xl border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink/60">
              Coming soon to the App Store
            </span>
            <Link
              to="/apps/astraai/support"
              className="text-sm font-semibold text-ink/55 underline-offset-4 hover:text-ink hover:underline"
            >
              Support
            </Link>
            <Link
              to="/apps/astraai/privacy"
              className="text-sm font-semibold text-ink/55 underline-offset-4 hover:text-ink hover:underline"
            >
              Privacy
            </Link>
            <Link
              to="/apps/astraai/terms"
              className="text-sm font-semibold text-ink/55 underline-offset-4 hover:text-ink hover:underline"
            >
              Terms
            </Link>
          </div>
        </div>
      </section>

      <Reveal className="mx-auto max-w-6xl px-6 pb-4">
        <div className="flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">
          {screenshots.map((s) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              width={506}
              height={1100}
              className="h-[32rem] w-auto shrink-0 snap-start rounded-[2rem] border border-ink/10 object-cover shadow-2xl"
              loading="lazy"
            />
          ))}
        </div>
      </Reveal>

      <section className="mx-auto max-w-6xl px-6 pt-16">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Western astrology, Vedic jyotish and tarot in one app
        </h2>
        <p className="mt-3 max-w-2xl text-ink/60">
          Every chart is calculated on your iPhone. AI explains what it means for you.
        </p>
      </section>
      <Stagger
        className="mx-auto grid max-w-6xl gap-4 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4"
        gap={0.06}
      >
        {features.map((f) => (
          <StaggerItem key={f.title}>
            <div className="h-full rounded-3xl border border-ink/10 bg-cream/80 p-6">
              <span className="grid size-10 place-items-center rounded-xl bg-ink text-cream">
                <f.icon className="size-4" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-ink/60">{f.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          How it works
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-3xl border border-ink/10 p-6">
              <span className="font-display text-4xl font-extrabold text-coral">{s.n}</span>
              <h3 className="mt-2 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-ink/60">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Free, or go Pro
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-ink/10 p-6">
            <h3 className="font-display text-xl font-bold">AstraAI Free</h3>
            <p className="mt-1 text-sm text-ink/60">
              Today's horoscope, your birth chart and kundli, Panchang, horoscopes for every sign,
              the tarot card of the day and 3 astrologer questions a day.
            </p>
            <p className="mt-4 font-display text-3xl font-extrabold">$0</p>
          </div>
          <div className="rounded-3xl border-2 border-coral p-6">
            <h3 className="font-display text-xl font-bold">AstraAI Pro</h3>
            <p className="mt-1 text-sm text-ink/60">
              Weekly, monthly and yearly forecasts, full chart and kundli readings, deep
              compatibility readings, all tarot spreads and 20 astrologer questions a day.
            </p>
            <p className="mt-4 font-display text-3xl font-extrabold">
              $34.99<span className="text-base font-bold text-ink/50">/year</span>
            </p>
            <p className="text-sm text-ink/55">1-week free trial · or $4.99/month</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
        <Reveal className="mt-8">
          <FaqList items={faqs} />
        </Reveal>
      </section>
    </PageShell>
  );
}
