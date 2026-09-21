import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppPageShell } from "@/components/site/AppPageShell";
import { Reveal } from "@/components/site/motion";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/apps/insectscan/privacy")({
  head: () =>
    pageHead({
      path: "/apps/insectscan/privacy",
      title: "Privacy Policy – InsectScan",
      description:
        "How InsectScan handles your data: identification happens on your iPhone by default, scan history stays on your device, and only low-confidence photos are ever sent off-device.",
      noindex: false,
    }),
  component: InsectScanPrivacyPage,
});

const LAST_UPDATED = "September 21, 2026";

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "Identifying a photo",
    body: (
      <>
        <p>
          When you photograph an insect, plant or animal, InsectScan first crops the subject and
          runs identification entirely on your iPhone, using a bundled offline model (168 insect
          species) or an optional custom model you install. For most scans, the photo never leaves
          your device.
        </p>
        <p>
          If the on-device model isn't confident in a result, InsectScan sends a resized, compressed
          copy of the photo (at most 512px on the long edge) to an AI provider (Anthropic) to get a
          more specific identification. That copy is used only to return an answer to you and is not
          linked to your identity or stored by InsectScan.
        </p>
      </>
    ),
  },
  {
    title: "Your account",
    body: (
      <>
        <p>
          InsectScan requires an account (email address and password) to use the app, handled by
          Firebase Authentication. We use your email only to sign you in and to let you reset your
          password — the app has no analytics or advertising SDKs enabled.
        </p>
      </>
    ),
  },
  {
    title: "Scan history",
    body: (
      <p>
        Every past scan — the photo and the full identification result — is stored locally on your
        iPhone only, never uploaded or synced. You can delete individual scans from your Library at
        any time, or remove all of it by deleting the app.
      </p>
    ),
  },
  {
    title: "Subscriptions and payments",
    body: (
      <p>
        InsectScan Pro is billed by Apple through StoreKit. Apple handles your payment details and
        billing; InsectScan never sees your card number and receives only your subscription status
        from Apple.
      </p>
    ),
  },
  {
    title: "Who we share data with",
    body: (
      <>
        <p>We share data only with the services needed to run InsectScan:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Firebase (Google)</strong>, for sign-in;
          </li>
          <li>
            <strong>Anthropic</strong>, for the small share of photos the on-device model can't
            confidently identify;
          </li>
          <li>
            <strong>Apple</strong>, for subscription billing.
          </li>
        </ul>
        <p>We don't use advertising, and we don't sell or share your data for marketing.</p>
      </>
    ),
  },
  {
    title: "Your choices",
    body: (
      <p>
        To access, correct or delete your account and data, email{" "}
        <a href="mailto:pawha1996@gmail.com" className="underline hover:text-ink">
          pawha1996@gmail.com
        </a>{" "}
        and we'll respond within 30 days.
      </p>
    ),
  },
  {
    title: "Changes to this policy",
    body: (
      <p>
        If we change how InsectScan handles data, we'll update this page and the date at the top.
      </p>
    ),
  },
];

function InsectScanPrivacyPage() {
  return (
    <AppPageShell appName="InsectScan" appIcon="/product/insectscan-icon.png">
      <p className="text-xs font-bold tracking-[0.2em] text-ink/45 uppercase">
        Privacy policy · Updated {LAST_UPDATED}
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Your photos are yours.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink/65">
        InsectScan identifies on your iPhone by default. This page explains the little data the app
        and its services do handle, and why.
      </p>

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
