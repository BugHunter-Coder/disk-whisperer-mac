import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppPageShell } from "@/components/site/AppPageShell";
import { Reveal } from "@/components/site/motion";
import { pageHead, SPRIGLY_SOCIAL } from "@/lib/seo";

export const Route = createFileRoute("/apps/sprigly/terms")({
  head: () =>
    pageHead({
      ...SPRIGLY_SOCIAL,
      path: "/apps/sprigly/terms",
      title: "Terms of Use – Sprigly AI Calorie Counter",
      description: "The terms of use, subscription terms and community guidelines for Sprigly, the AI calorie counter for iPhone.",
    }),
  component: SpriglyTermsPage,
});

const LAST_UPDATED = "September 24, 2026";

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "The app",
    body: (
      <p>
        Sprigly estimates the calories and nutrients in the food you log, from photos, barcodes or
        search, and helps you track your intake, activity and progress. Estimates can be wrong and are
        for general information only. Sprigly is not a medical device and does not give medical or
        dietary advice; talk to a doctor or dietitian before making significant changes to your diet,
        especially if you are pregnant, have a medical condition or have a history of disordered
        eating.
      </p>
    ),
  },
  {
    title: "Free trial and subscriptions",
    body: (
      <>
        <p>
          Sprigly is free to use with 3 AI photo scans each week. Sprigly Pro (monthly, or yearly with
          a 3-day free trial) unlocks unlimited AI scans, full trends and complete nutrient insights,
          billed through your Apple ID. Any unused portion of a free trial is forfeited when you buy a
          subscription.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Payment is charged to your Apple ID at confirmation of purchase.</li>
          <li>
            Subscriptions renew automatically unless auto-renew is turned off at least 24 hours
            before the end of the current period.
          </li>
          <li>
            Your account is charged for renewal within 24 hours of the end of the current period, at
            the price you agreed to.
          </li>
          <li>
            Manage or cancel any subscription in iPhone Settings → [your name] → Subscriptions.
          </li>
          <li>No refund is given for the unused portion of a period if you cancel mid-cycle.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Acceptable use",
    body: (
      <p>
        Use Sprigly only for lawful purposes. Don't attempt to reverse-engineer, resell or abuse the
        food recognition service (for example, by sending it images unrelated to food at high
        volume).
      </p>
    ),
  },
  {
    title: "Community guidelines",
    body: (
      <>
        <p>
          There is zero tolerance for objectionable content or abusive users in the Sprigly
          community. Do not post:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>bullying, harassment, body-shaming or hate speech;</li>
          <li>content promoting extreme dieting, eating disorders or self-harm;</li>
          <li>nudity, sexual or violent content;</li>
          <li>spam, links, advertising or impersonation;</li>
          <li>medical claims or advice presented as fact.</li>
        </ul>
        <p>
          You can report any post, comment or profile, and block any user. We review reports within
          24 hours and remove content and ban accounts that break these rules. You keep ownership of
          what you post, and give us permission to display it to other Sprigly users.
        </p>
      </>
    ),
  },
  {
    title: "No warranty",
    body: (
      <p>
        Sprigly is provided "as is". We don't guarantee that any calorie or nutrient estimate is
        complete or accurate, and we're not liable for decisions made based on the app's output.
      </p>
    ),
  },
  {
    title: "Changes",
    body: (
      <p>
        We may update these terms as the app changes. Continuing to use Sprigly after an update
        means you accept the revised terms.
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

function SpriglyTermsPage() {
  return (
    <AppPageShell appName="Sprigly" appIcon="/product/sprigly-icon.png">
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
