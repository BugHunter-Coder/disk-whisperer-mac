import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppPageShell } from "@/components/site/AppPageShell";
import { Reveal } from "@/components/site/motion";
import { HANDDUEL_SOCIAL, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/apps/hand-duel/terms")({
  head: () =>
    pageHead({
      ...HANDDUEL_SOCIAL,
      path: "/apps/hand-duel/terms",
      title: "Terms of Use – Rock Paper Scissors: Hand Duel",
      description:
        "The terms of use for Hand Duel, the camera rock, paper, scissors game for iPhone, including the Remove Ads purchase and fair play.",
    }),
  component: HandDuelTermsPage,
});

const LAST_UPDATED = "September 28, 2026";
const EMAIL = "pawha1996@gmail.com";

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "The game",
    body: (
      <p>
        Hand Duel is a rock, paper, scissors game you play by showing hand shapes to your iPhone's
        camera, or by tapping buttons. Points and leaderboard rankings are for fun, have no cash
        value and can't be exchanged or transferred. The demo leaderboard includes example players.
      </p>
    ),
  },
  {
    title: "Ads and Remove Ads",
    body: (
      <>
        <p>
          Hand Duel is free and supported by ads. Remove Ads is an optional one-time purchase that
          turns off banner and full-screen ads on devices signed in with the same Apple Account.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Payment is charged to your Apple Account when you confirm the purchase.</li>
          <li>It is not a subscription and never renews.</li>
          <li>
            If you reinstall the app or switch iPhones, tap Restore purchase in Hand Duel →
            Settings.
          </li>
          <li>Refunds are handled by Apple under its standard purchase terms.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Playing with others",
    body: (
      <>
        <p>
          Be respectful. Don't show anything offensive, explicit or harmful on camera in a nearby
          duel, and don't use names that impersonate or harass others. You can leave any match at
          any time, and you can hide your camera from your rival.
        </p>
        <p>
          Moves are sealed until both players lock in. Attempts to tamper with a match end it
          without points.
        </p>
      </>
    ),
  },
  {
    title: "Play safely",
    body: (
      <p>
        Hand Duel uses your camera, so play somewhere you have room to move and stay aware of your
        surroundings. Don't play while driving or walking in traffic.
      </p>
    ),
  },
  {
    title: "Availability",
    body: (
      <p>
        We work to keep Hand Duel running well, but features that depend on Apple Game Center, your
        network or third-party ad services may sometimes be unavailable. The app is provided "as
        is", to the extent the law allows.
      </p>
    ),
  },
  {
    title: "Apple's terms",
    body: (
      <p>
        Hand Duel is licensed to you under Apple's standard Licensed Application End User License
        Agreement. Apple is not responsible for the app or its content.
      </p>
    ),
  },
  {
    title: "Contact",
    body: (
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${EMAIL}`} className="underline hover:text-ink">
          {EMAIL}
        </a>
        .
      </p>
    ),
  },
];

function HandDuelTermsPage() {
  return (
    <AppPageShell appName="Hand Duel" appIcon="/product/handduel-icon.png">
      <p className="text-xs font-bold tracking-[0.2em] text-ink/45 uppercase">
        Terms of use · Updated {LAST_UPDATED}
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Fair play.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink/65">
        The short version: have fun, be kind, and Remove Ads is yours for good.
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
