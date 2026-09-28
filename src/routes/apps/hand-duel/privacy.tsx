import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppPageShell } from "@/components/site/AppPageShell";
import { Reveal } from "@/components/site/motion";
import { HANDDUEL_SOCIAL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/apps/hand-duel/privacy")({
  head: () =>
    pageHead({
      ...HANDDUEL_SOCIAL,
      path: "/apps/hand-duel/privacy",
      title: "Privacy Policy – Rock Paper Scissors: Hand Duel",
      description:
        "How Hand Duel uses your camera, what nearby and online play share, how ads work, and how to control it all.",
    }),
  component: HandDuelPrivacyPage,
});

const LAST_UPDATED = "September 28, 2026";
const EMAIL = "pawha1996@gmail.com";

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "No account needed",
    body: (
      <p>
        Hand Duel has no sign-up and no account of its own. Your points, wins and settings are kept
        only on your iPhone.
      </p>
    ),
  },
  {
    title: "Your camera",
    body: (
      <>
        <p>
          The camera is used to read the shape of your hand. Recognition runs entirely on your
          iPhone with Apple's Vision framework. Nothing is recorded or saved, and camera frames are
          never sent to us or to any server.
        </p>
        <p>
          In a nearby duel, small live preview frames go straight from your iPhone to your rival's
          iPhone over Wi‑Fi or Bluetooth so you can see each other while you play. They are not
          stored anywhere, stop when the match ends, and you can hide your camera from your rival at
          any time with the camera button in the arena.
        </p>
      </>
    ),
  },
  {
    title: "Playing with others",
    body: (
      <>
        <p>
          Nearby duels use Apple's peer-to-peer networking. Other players nearby see your Game
          Center name while you have the lobby open. Only your sealed moves and, if you allow it,
          your camera preview are exchanged.
        </p>
        <p>
          Online matches with Game Center friends or random players run through Apple Game Center,
          which shows your Game Center name to your rival and sends only your moves. Game Center is
          provided by Apple under Apple's privacy policy.
        </p>
      </>
    ),
  },
  {
    title: "Advertising",
    body: (
      <>
        <p>
          Hand Duel is free and shows ads from Google AdMob: a small banner on menu screens and,
          after some matches, a full-screen ad. Ads never appear during a round.
        </p>
        <p>
          To show and measure ads, Google may collect your device's advertising identifier (only if
          you allow tracking), approximate location based on your IP address, how you interact with
          ads, and diagnostic data such as crashes and performance. See{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            className="underline hover:text-ink"
            target="_blank"
            rel="noreferrer"
          >
            how Google uses information from apps that use its services
          </a>
          .
        </p>
        <p>
          iOS asks whether Hand Duel may track you. If you choose Ask App Not to Track, ads are not
          personalised with your advertising identifier. Where the law requires it, for example in
          the EU and UK, Google's consent form lets you choose how your data is used for ads, and
          you can change it later in Hand Duel → Settings → Ad privacy choices.
        </p>
      </>
    ),
  },
  {
    title: "Remove Ads",
    body: (
      <p>
        The optional Remove Ads purchase is sold and processed by Apple. We never see your payment
        details; Apple only tells the app that the purchase is active so ads stay off on your
        devices.
      </p>
    ),
  },
  {
    title: "What we don't do",
    body: (
      <p>
        We don't run our own servers for Hand Duel, we don't collect your name, email or contacts,
        and we never sell your data.
      </p>
    ),
  },
  {
    title: "Your choices",
    body: (
      <p>
        You can turn tracking off in the iPhone Settings app → Privacy &amp; Security → Tracking,
        change camera access in Settings → Hand Duel, and reset your local progress in Hand Duel →
        Settings. Deleting the app removes everything it stored on your iPhone. Questions? Email{" "}
        <a href={`mailto:${EMAIL}`} className="underline hover:text-ink">
          {EMAIL}
        </a>{" "}
        and we'll respond within 30 days.
      </p>
    ),
  },
  {
    title: "Children",
    body: (
      <p>
        Hand Duel is not directed at children under 13, and we don't knowingly collect their data.
      </p>
    ),
  },
  {
    title: "Changes to this policy",
    body: (
      <p>If we change how Hand Duel handles data, we'll update this page and the date at the top.</p>
    ),
  },
];

function HandDuelPrivacyPage() {
  return (
    <AppPageShell appName="Hand Duel" appIcon="/product/handduel-icon.png">
      <p className="text-xs font-bold tracking-[0.2em] text-ink/45 uppercase">
        Privacy policy · Updated {LAST_UPDATED}
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Your hand, your data.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink/65">
        How Hand Duel uses your camera, what playing with others shares, and how ads work.
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
