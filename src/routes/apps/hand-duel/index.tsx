import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Camera,
  Hand,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Video,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { Faq } from "@/components/landing/content";
import { PageShell } from "@/components/site/SiteFooter";
import { FaqList } from "@/components/site/FaqList";
import { Reveal, Stagger, StaggerItem, WordReveal } from "@/components/site/motion";
import { faqJsonLd, HANDDUEL_SOCIAL, pageHead, SITE_URL } from "@/lib/seo";

const PATH = "/apps/hand-duel";
const TITLE = "Rock Paper Scissors: Hand Duel – Camera Hand Game for iPhone";
const DESCRIPTION =
  "Play rock, paper, scissors with your real hand. Hand Duel reads your gesture with the iPhone camera. Duel Nova, a friend on one camera, or players nearby with live video.";

const faqs: Faq[] = [
  {
    q: "How does Hand Duel know which move I made?",
    a: "Hold your hand up to the camera when GO appears. Hand Duel tracks the joints of your hand on your iPhone and recognises a closed fist as rock, an open palm as paper and a V sign as scissors.",
  },
  {
    q: "Can I play with a friend?",
    a: "Yes, three ways: side by side in front of one camera (left hand plays right hand), phone to phone with anyone nearby, or online with your Game Center friends.",
  },
  {
    q: "Can I see my rival?",
    a: "In a nearby duel you see each other live in a small picture-in-picture tile, like a video call. You can hide your camera at any time.",
  },
  {
    q: "Is Hand Duel free?",
    a: "Yes. Hand Duel is free with ads on menu screens and after some matches, never during a round. A one-time Remove Ads purchase turns them off for good.",
  },
  {
    q: "Is my camera recorded?",
    a: "No. Gesture recognition happens on your iPhone and nothing is saved or uploaded. Nearby duels send small live preview frames straight to your rival's phone only while you play.",
  },
  {
    q: "What if I don't want to use the camera?",
    a: "Button practice lets you tap rock, paper or scissors instead, and online matches fall back to buttons if your camera is off.",
  },
];

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Rock Paper Scissors: Hand Duel",
  alternateName: ["Hand Duel", "Hand Duel RPS"],
  description: DESCRIPTION,
  url: `${SITE_URL}${PATH}`,
  applicationCategory: "GameApplication",
  applicationSubCategory: "Casual game",
  operatingSystem: "iOS 17 or later",
  image: `${SITE_URL}/product/handduel-icon.png`,
  screenshot: [
    `${SITE_URL}/product/handduel-home.jpg`,
    `${SITE_URL}/product/handduel-arena.jpg`,
    `${SITE_URL}/product/handduel-moves.jpg`,
    `${SITE_URL}/product/handduel-round.jpg`,
  ],
  featureList: [
    "Camera hand-gesture recognition",
    "Duel a friend on one camera",
    "Nearby duels with live video",
    "Online play with Game Center friends",
    "Automatic rounds, first to 3 wins",
    "Leaderboard and points",
    "Button practice mode",
  ],
  offers: [
    { "@type": "Offer", name: "Hand Duel", price: "0", priceCurrency: "USD" },
    { "@type": "Offer", name: "Remove Ads", price: "2.99", priceCurrency: "USD" },
  ],
};

export const Route = createFileRoute("/apps/hand-duel/")({
  head: () =>
    pageHead({
      ...HANDDUEL_SOCIAL,
      path: PATH,
      title: TITLE,
      description: DESCRIPTION,
      jsonLd: [appJsonLd, faqJsonLd(faqs)],
    }),
  component: HandDuelPage,
});

const screenshots = [
  {
    src: "/product/handduel-home.jpg",
    alt: "Hand Duel home screen with Play Nova, Play online, Duel a friend and Button practice",
  },
  {
    src: "/product/handduel-arena.jpg",
    alt: "Hand Duel arena counting down to GO with the score first to 3",
  },
  {
    src: "/product/handduel-moves.jpg",
    alt: "Hand Duel intro teaching rock as a fist, paper as an open palm and scissors as a V sign",
  },
  {
    src: "/product/handduel-round.jpg",
    alt: "Hand Duel intro explaining a round: get ready, show your move, the reveal",
  },
];

const features = [
  {
    icon: Hand,
    title: "Play with your real hand",
    body: "Show rock, paper or scissors to the camera. No buttons, no taps, just the game you know.",
  },
  {
    icon: Users,
    title: "Duel a friend on one phone",
    body: "Stand side by side. The left hand plays the right hand, and the camera keeps score.",
  },
  {
    icon: Video,
    title: "Nearby duels with live video",
    body: "Find players around you and see each other live while you play, phone to phone.",
  },
  {
    icon: Trophy,
    title: "Online with friends",
    body: "Challenge your Game Center friends anywhere, or take on a random player.",
  },
  {
    icon: RefreshCw,
    title: "Rounds start on their own",
    body: "A 3‑2‑1 countdown, GO, reveal, and on to the next round. First to 3 wins.",
  },
  {
    icon: Sparkles,
    title: "Learn in a minute",
    body: "A quick intro teaches the shapes and a guided tour shows you around the app.",
  },
  {
    icon: Camera,
    title: "No camera? No problem",
    body: "Button practice lets anyone play, and online matches fall back to buttons.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    body: "Your hand is read on your iPhone. Nothing is recorded or uploaded.",
  },
];

const steps = [
  { n: "1", title: "Get ready", body: "A 3‑2‑1 countdown while you put your hand in frame." },
  { n: "2", title: "GO!", body: "Hold one clear shape still for a moment. Moves stay sealed." },
  { n: "3", title: "Reveal", body: "Both moves appear and the winner takes the point." },
];

function LaunchVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    if (muted) {
      v.currentTime = 0;
      void v.play();
    }
    v.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="relative mx-auto w-full max-w-[20rem]">
      <video
        ref={ref}
        src="/product/handduel-launch.mp4"
        poster="/product/handduel-launch.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        width={1080}
        height={1920}
        aria-label="Hand Duel launch video: rock, paper, scissors played with your hand"
        className="aspect-[9/16] w-full rounded-[2rem] border border-ink/10 object-cover shadow-2xl"
      />
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Play with sound" : "Mute"}
        className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-2 text-xs font-bold text-cream backdrop-blur hover:bg-ink"
      >
        {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        {muted ? "Sound on" : "Mute"}
      </button>
    </div>
  );
}

function HandDuelPage() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden px-6 pt-36 pb-16 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_85%_0%,rgba(237,131,71,0.22),transparent),radial-gradient(40%_50%_at_10%_20%,rgba(121,90,160,0.12),transparent)]"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/55 hover:text-ink"
            >
              <ArrowLeft className="size-4" /> All products
            </Link>

            <div className="mt-6 flex items-center gap-4">
              <img
                src="/product/handduel-icon.png"
                alt="Rock Paper Scissors: Hand Duel app icon"
                className="size-16 rounded-2xl shadow-lg"
              />
              <span className="rounded-full bg-coral px-3 py-1 text-xs font-bold text-cream">
                Coming soon on iPhone
              </span>
            </div>

            <p className="mt-6 text-sm font-bold tracking-[0.2em] text-ink/45 uppercase">
              Rock Paper Scissors: Hand Duel
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.95] font-extrabold tracking-tight">
              <WordReveal text="Rock, paper, scissors." />{" "}
              <WordReveal text="Played with your hand." className="text-coral" delay={0.2} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-5 max-w-2xl text-lg text-ink/65"
            >
              Hand Duel turns your iPhone camera into the referee. Show your move when GO appears,
              and duel Nova, a friend side by side, or players nearby with live video.
            </motion.p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-xl border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink/60">
                Coming soon to the App Store
              </span>
              <Link
                to="/apps/hand-duel/support"
                className="text-sm font-semibold text-ink/55 underline-offset-4 hover:text-ink hover:underline"
              >
                Support
              </Link>
              <Link
                to="/apps/hand-duel/privacy"
                className="text-sm font-semibold text-ink/55 underline-offset-4 hover:text-ink hover:underline"
              >
                Privacy
              </Link>
              <Link
                to="/apps/hand-duel/terms"
                className="text-sm font-semibold text-ink/55 underline-offset-4 hover:text-ink hover:underline"
              >
                Terms
              </Link>
            </div>
          </div>
          <LaunchVideo />
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
          The game you know, played the way you remember
        </h2>
        <p className="mt-3 max-w-2xl text-ink/60">
          Solo, side by side, nearby or online. Your hand is the controller.
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
          How a round works
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
          Free to play
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-ink/10 p-6">
            <h3 className="font-display text-xl font-bold">Hand Duel</h3>
            <p className="mt-1 text-sm text-ink/60">
              Every mode, the leaderboard and online play. Ads appear on menus and after some
              matches, never during a round.
            </p>
            <p className="mt-4 font-display text-3xl font-extrabold">Free</p>
          </div>
          <div className="rounded-3xl border-2 border-coral p-6">
            <h3 className="font-display text-xl font-bold">Remove Ads</h3>
            <p className="mt-1 text-sm text-ink/60">
              One purchase turns off banner and full-screen ads for good, on all your devices.
            </p>
            <p className="mt-4 font-display text-3xl font-extrabold">
              $2.99<span className="text-base font-bold text-ink/50"> one-time</span>
            </p>
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
