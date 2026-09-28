import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import type { Faq } from "@/components/landing/content";
import { AppPageShell } from "@/components/site/AppPageShell";
import { FaqList } from "@/components/site/FaqList";
import { Reveal } from "@/components/site/motion";
import { HANDDUEL_SOCIAL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/apps/hand-duel/support")({
  head: () =>
    pageHead({
      ...HANDDUEL_SOCIAL,
      path: "/apps/hand-duel/support",
      title: "Support – Rock Paper Scissors: Hand Duel",
      description:
        "Get help with Hand Duel: gestures not recognised, finding players nearby, Game Center, Remove Ads and how to contact us.",
    }),
  component: HandDuelSupportPage,
});

const faqs: Faq[] = [
  {
    q: "My gesture isn't recognised. What can I do?",
    a: "Use good light, keep one hand in frame with your palm facing the camera, and hold the shape still for a moment after GO. Rock is a closed fist, paper an open palm, scissors a V sign. You can always switch to button practice.",
  },
  {
    q: "The other phone doesn't show up under Nearby now.",
    a: "Both phones need Hand Duel open on Online duel → See who's online, Wi‑Fi or Bluetooth turned on, and Local Network allowed (iPhone Settings → Privacy & Security → Local Network → Hand Duel).",
  },
  {
    q: "How do I play a friend who isn't nearby?",
    a: "Sign in to Game Center, add them as a Game Center friend, then tap Duel next to their name in the lobby or use Invite with Game Center. They'll get an invite on their phone.",
  },
  {
    q: "Can my rival see me?",
    a: "Only in a nearby duel, where you see each other live so the game feels face to face. Tap the camera button in the arena to hide your camera at any time. Nothing is recorded, and online matches send moves only.",
  },
  {
    q: "How do I remove ads?",
    a: "Open Settings (the gear on the home screen) and tap Remove ads. It's a one-time purchase. If you reinstall or change phones, tap Restore purchase.",
  },
  {
    q: "How do I see the intro or tour again?",
    a: "Tap ? on the home screen for the how-to-play intro, or open Settings and choose How to play or App tour.",
  },
  {
    q: "How do I reset my points?",
    a: "Open Settings and tap Reset local progress. Your points and wins are stored only on your iPhone.",
  },
];

function HandDuelSupportPage() {
  return (
    <AppPageShell appName="Hand Duel" appIcon="/product/handduel-icon.png">
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
