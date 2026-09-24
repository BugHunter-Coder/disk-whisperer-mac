import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Camera, Globe2, HeartPulse, Leaf, ScanBarcode, Trophy, Users } from "lucide-react";
import type { Faq } from "@/components/landing/content";
import { PageShell } from "@/components/site/SiteFooter";
import { FaqList } from "@/components/site/FaqList";
import { Reveal, Stagger, StaggerItem, WordReveal } from "@/components/site/motion";
import { faqJsonLd, pageHead, SITE_URL, SPRIGLY_SOCIAL } from "@/lib/seo";

const PATH = "/apps/sprigly";
const TITLE = "Sprigly: AI Calorie Counter & Macro Tracker for iPhone";
const DESCRIPTION =
  "Snap a photo of any meal and Sprigly counts the calories, protein, carbs and fat in seconds. Barcode scanner, 390+ world dishes, Apple Health sync, streaks and a friendly community.";

const faqs: Faq[] = [
  {
    q: "How does Sprigly count calories from a photo?",
    a: "Take a picture of your plate and Sprigly's AI recognises each food, estimates the portion and returns calories, protein, carbs, fat and key nutrients in a few seconds. You can adjust the portion before you log it.",
  },
  {
    q: "Is Sprigly free?",
    a: "Yes. Sprigly is free to download with food search, barcode scanning, Apple Health sync and 3 AI photo scans every week. Sprigly Pro adds unlimited AI scans, full trends and complete nutrient insights for $9.99 a month or $39.99 a year, with a 3-day free trial on the yearly plan.",
  },
  {
    q: "Does Sprigly work with Apple Health?",
    a: "Yes. Sprigly reads your active calories, steps, weight and height to keep your targets accurate, and saves every meal you log (calories, macros and nutrients) back to Apple Health.",
  },
  {
    q: "Can Sprigly track Indian, Asian and other world foods?",
    a: "Yes. Beyond everyday basics, Sprigly includes over 390 dishes from South Asia, East and Southeast Asia, Europe, the Americas, Africa and Oceania, from biryani and dal to poke bowls and shakshuka, each with real macros.",
  },
  {
    q: "Can I scan barcodes on packaged food?",
    a: "Yes. Point the camera at a barcode and Sprigly looks the product up in Open Food Facts. If the product isn't listed, it can read the nutrition label from a photo instead.",
  },
  {
    q: "Does Sprigly help with weight loss?",
    a: "Sprigly sets a daily calorie and macro target from your goal, body and activity level, adds back calories you burn, and tracks your progress with streaks, milestones and weight trends. It is a tracking tool, not medical advice.",
  },
  {
    q: "What is the Sprigly community?",
    a: "An optional feed where you can share meals and milestones, follow friends and cheer each other on. Only the name and bio you choose are public; your weight, targets and health data stay private.",
  },
  {
    q: "Is my data private?",
    a: "Your food log and health data are tied to your account and synced securely so they're there on any device. Photos are only used to identify the food, and we never sell your data. See the privacy policy for details.",
  },
];

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Sprigly",
  alternateName: ["Sprigly AI Calorie Counter", "Sprigly Calorie Counter"],
  description: DESCRIPTION,
  url: `${SITE_URL}${PATH}`,
  applicationCategory: "HealthApplication",
  applicationSubCategory: "Calorie counter and macro tracker",
  operatingSystem: "iOS 18 or later",
  image: `${SITE_URL}/product/sprigly-icon.png`,
  screenshot: [
    `${SITE_URL}/product/sprigly-today.jpg`,
    `${SITE_URL}/product/sprigly-dishes.jpg`,
    `${SITE_URL}/product/sprigly-progress.jpg`,
    `${SITE_URL}/product/sprigly-community.jpg`,
  ],
  featureList: [
    "AI food photo calorie counter",
    "Barcode scanner",
    "Macro tracker for protein, carbs and fat",
    "390+ dishes from world cuisines",
    "Apple Health sync",
    "Streaks, milestones and weight trends",
    "Meal and water reminders",
    "Community feed",
  ],
  offers: [
    { "@type": "Offer", name: "Sprigly Free", price: "0", priceCurrency: "USD" },
    { "@type": "Offer", name: "Sprigly Pro Monthly", price: "9.99", priceCurrency: "USD" },
    { "@type": "Offer", name: "Sprigly Pro Yearly", price: "39.99", priceCurrency: "USD" },
  ],
};

export const Route = createFileRoute("/apps/sprigly/")({
  head: () =>
    pageHead({
      ...SPRIGLY_SOCIAL,
      path: PATH,
      title: TITLE,
      description: DESCRIPTION,
      jsonLd: [appJsonLd, faqJsonLd(faqs)],
    }),
  component: SpriglyPage,
});

const screenshots = [
  { src: "/product/sprigly-today.jpg", alt: "Sprigly calorie counter dashboard with calories eaten, burned and left" },
  { src: "/product/sprigly-dishes.jpg", alt: "Sprigly food search showing Indian dishes like biryani with macros" },
  { src: "/product/sprigly-progress.jpg", alt: "Sprigly progress screen with weight-loss journey and 14-day streak" },
  { src: "/product/sprigly-community.jpg", alt: "Sprigly community feed with a milestone post and people to follow" },
  { src: "/product/sprigly-nutrients.jpg", alt: "Sprigly nutrient tracker for fiber, vitamins and minerals" },
  { src: "/product/sprigly-signin.jpg", alt: "Sprigly sign-in with Apple and Google" },
];

const features = [
  {
    icon: Camera,
    title: "AI photo calorie counter",
    body: "Snap your plate and get calories, protein, carbs and fat in seconds. No weighing, no typing.",
  },
  {
    icon: ScanBarcode,
    title: "Barcode scanner",
    body: "Scan packaged food to log it instantly, or read the nutrition label when a product isn't listed.",
  },
  {
    icon: Globe2,
    title: "390+ world dishes",
    body: "Biryani, dal, ramen, poke, tacos, shakshuka. Real macros for the food you actually eat.",
  },
  {
    icon: HeartPulse,
    title: "Apple Health sync",
    body: "Burned calories, steps and weigh-ins flow in automatically, and every meal is saved to Health.",
  },
  {
    icon: Leaf,
    title: "Macro & nutrient tracker",
    body: "Daily protein, carb and fat targets plus fiber, sugar, sodium, iron, calcium and vitamins C and D.",
  },
  {
    icon: Trophy,
    title: "Streaks & milestones",
    body: "Logging streaks, weekly wins and a weight-loss journey that celebrates every step.",
  },
  {
    icon: Users,
    title: "Friendly community",
    body: "Share meals and milestones, follow friends and cheer each other on.",
  },
];

const steps = [
  { n: "1", title: "Snap", body: "Point your camera at a meal, a package or a barcode." },
  { n: "2", title: "Know", body: "Sprigly shows calories, macros and any allergens you told it about." },
  { n: "3", title: "Grow", body: "Log it in one tap, and watch your streak and progress build." },
];

function SpriglyPage() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden px-6 pt-36 pb-16 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_85%_0%,rgba(43,176,122,0.25),transparent),radial-gradient(40%_50%_at_10%_20%,rgba(250,17,79,0.08),transparent)]"
        />
        <div className="mx-auto max-w-6xl">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/55 hover:text-ink"
          >
            <ArrowLeft className="size-4" /> All products
          </Link>

          <div className="mt-6 flex items-center gap-4">
            <img src="/product/sprigly-icon.png" alt="Sprigly app icon" className="size-16 rounded-2xl shadow-lg" />
            <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-ink">
              Coming soon on iPhone
            </span>
          </div>

          <p className="mt-6 text-sm font-bold tracking-[0.2em] text-ink/45 uppercase">
            Sprigly · AI calorie counter & macro tracker
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.95] font-extrabold tracking-tight">
            <WordReveal text="Snap your plate." />{" "}
            <WordReveal text="Know what's inside." className="text-mint" delay={0.2} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-5 max-w-2xl text-lg text-ink/65"
          >
            Sprigly is the AI calorie counter for iPhone that turns a photo of your meal into
            calories, protein, carbs and fat in seconds. It syncs with Apple Health, knows dishes
            from every cuisine, and makes eating well feel like a win.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-xl border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink/60">
              Coming soon to the App Store
            </span>
            <Link
              to="/apps/sprigly/support"
              className="text-sm font-semibold text-ink/55 underline-offset-4 hover:text-ink hover:underline"
            >
              Support
            </Link>
            <Link
              to="/apps/sprigly/privacy"
              className="text-sm font-semibold text-ink/55 underline-offset-4 hover:text-ink hover:underline"
            >
              Privacy
            </Link>
            <Link
              to="/apps/sprigly/terms"
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
          Everything you need to count calories, without the chore
        </h2>
        <p className="mt-3 max-w-2xl text-ink/60">
          A calorie tracker, macro counter and food diary in one simple app.
        </p>
      </section>
      <Stagger className="mx-auto grid max-w-6xl gap-4 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
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
          How the AI food scanner works
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-3xl border border-ink/10 p-6">
              <span className="font-display text-4xl font-extrabold text-mint">{s.n}</span>
              <h3 className="mt-2 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-ink/60">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Free, or go Pro</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-ink/10 p-6">
            <h3 className="font-display text-xl font-bold">Sprigly Free</h3>
            <p className="mt-1 text-sm text-ink/60">
              Food search, barcode scanner, Apple Health sync, reminders, community and 3 AI photo
              scans every week.
            </p>
            <p className="mt-4 font-display text-3xl font-extrabold">$0</p>
          </div>
          <div className="rounded-3xl border-2 border-mint p-6">
            <h3 className="font-display text-xl font-bold">Sprigly Pro</h3>
            <p className="mt-1 text-sm text-ink/60">
              Unlimited AI photo scans, full weight and calorie trends, and complete 7-day nutrient
              insights.
            </p>
            <p className="mt-4 font-display text-3xl font-extrabold">
              $39.99<span className="text-base font-bold text-ink/50">/year</span>
            </p>
            <p className="text-sm text-ink/55">3-day free trial · or $9.99/month</p>
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
