import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppPageShell } from "@/components/site/AppPageShell";
import { Reveal } from "@/components/site/motion";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/apps/insectscan/terms")({
  head: () =>
    pageHead({
      path: "/apps/insectscan/terms",
      title: "Terms of Use – InsectScan",
      description: "The terms of use and subscription terms for InsectScan.",
    }),
  component: InsectScanTermsPage,
});

const LAST_UPDATED = "September 21, 2026";

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "The app",
    body: (
      <p>
        InsectScan identifies insects, plants and animals from a photo and provides reference
        information such as habitat, diet, lifecycle and a general safety rating. Results are
        provided for informational purposes only — they aren't a substitute for professional advice,
        and you should use your own judgement (and, where risk is involved, a qualified
        professional) before acting on any identification.
      </p>
    ),
  },
  {
    title: "Free trial and subscriptions",
    body: (
      <>
        <p>
          New accounts get a limited number of free scans. Continued or unlimited use requires an
          InsectScan Pro subscription (weekly or yearly), billed through your Apple ID.
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
        Use InsectScan only for lawful purposes. Don't attempt to reverse-engineer, resell, or abuse
        the identification service (for example, by sending it images unrelated to insects, plants
        or animals at high volume).
      </p>
    ),
  },
  {
    title: "No warranty",
    body: (
      <p>
        InsectScan is provided "as is". We don't guarantee that any identification or safety rating
        is complete or accurate for your situation, and we're not liable for decisions made based on
        the app's output.
      </p>
    ),
  },
  {
    title: "Changes",
    body: (
      <p>
        We may update these terms as the app changes. Continuing to use InsectScan after an update
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

function InsectScanTermsPage() {
  return (
    <AppPageShell appName="InsectScan" appIcon="/product/insectscan-icon.png">
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
