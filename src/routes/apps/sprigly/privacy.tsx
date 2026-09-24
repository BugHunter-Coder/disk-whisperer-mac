import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppPageShell } from "@/components/site/AppPageShell";
import { Reveal } from "@/components/site/motion";
import { pageHead, SPRIGLY_SOCIAL } from "@/lib/seo";

export const Route = createFileRoute("/apps/sprigly/privacy")({
  head: () =>
    pageHead({
      ...SPRIGLY_SOCIAL,
      path: "/apps/sprigly/privacy",
      title: "Privacy Policy – Sprigly AI Calorie Counter",
      description:
        "How Sprigly handles your food log, meal photos and Apple Health data: what is stored, why, who processes it, and how to delete it.",
    }),
  component: SpriglyPrivacyPage,
});

const LAST_UPDATED = "September 24, 2026";
const EMAIL = "pawha1996@gmail.com";

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "Your account",
    body: (
      <p>
        Sprigly needs an account so your food log follows you to any device. You can sign in with
        Apple, Google or an email address and password; sign-in is handled by Google Firebase
        Authentication. We use your email only to sign you in and to let you reset your password.
      </p>
    ),
  },
  {
    title: "What we store",
    body: (
      <>
        <p>
          To run the app we store, in Google Firebase (Cloud Firestore), the information you enter
          or allow: your profile and goals (name, age, sex, height, weight, target weight, activity
          level, diet and allergens), the meals you log with their nutrients and a small photo
          thumbnail, your weigh-ins, reminder settings, and a daily summary of calories, nutrients,
          water and activity.
        </p>
        <p>This data is private to your account. Only you can read or change it.</p>
      </>
    ),
  },
  {
    title: "Meal photos",
    body: (
      <p>
        When you scan a meal or a package, a compressed copy of the photo is sent to our AI
        provider (Anthropic) to identify the food and estimate its nutrients. The photo is used only
        to return that answer to you; Sprigly does not send any other personal information with it.
        Barcode numbers are looked up in the public Open Food Facts database.
      </p>
    ),
  },
  {
    title: "Apple Health",
    body: (
      <>
        <p>
          With your permission, Sprigly reads active and resting energy, steps, water, weight,
          height, sex and date of birth from Apple Health to set accurate targets and add back the
          calories you burn, and writes the meals, water and weigh-ins you log back to Apple Health.
        </p>
        <p>
          Health data is used only to provide these features. It is never used for advertising or
          marketing, never sold, and never shared with third parties for their own purposes.
        </p>
      </>
    ),
  },
  {
    title: "Community",
    body: (
      <>
        <p>
          The community is optional. If you join, the name and bio you choose, and anything you post
          (text, photos, meals, milestones, comments and likes), are visible to other Sprigly users,
          along with who you follow. Your weight, targets and health data are never shown unless
          you choose to post them.
        </p>
        <p>
          You can report or block anyone. Reports are reviewed within 24 hours, and content or
          accounts that break the community guidelines are removed.
        </p>
      </>
    ),
  },
  {
    title: "Subscriptions",
    body: (
      <p>
        Sprigly Pro is sold through Apple. Purchase status is managed by RevenueCat, which receives
        an anonymous account ID and your purchase history so Pro works on all your devices. We never
        see your payment details.
      </p>
    ),
  },
  {
    title: "What we don't do",
    body: (
      <p>
        Sprigly has no advertising and no third-party analytics or tracking SDKs, and we never sell
        your data. Reminders are scheduled on your iPhone; no notification content leaves your
        device.
      </p>
    ),
  },
  {
    title: "Deleting your data",
    body: (
      <p>
        Delete your account any time in Sprigly → Profile → Delete account. This permanently removes
        your profile, food log, weigh-ins, daily summaries and all community posts, comments and
        follows. Data already written to Apple Health stays there under your control. You can also
        email{" "}
        <a href={`mailto:${EMAIL}`} className="underline hover:text-ink">
          {EMAIL}
        </a>{" "}
        to access, correct or delete your data, and we'll respond within 30 days.
      </p>
    ),
  },
  {
    title: "Children",
    body: <p>Sprigly is not directed at children under 13, and we don't knowingly collect their data.</p>,
  },
  {
    title: "Changes to this policy",
    body: <p>If we change how Sprigly handles data, we'll update this page and the date at the top.</p>,
  },
];

function SpriglyPrivacyPage() {
  return (
    <AppPageShell appName="Sprigly" appIcon="/product/sprigly-icon.png">
      <p className="text-xs font-bold tracking-[0.2em] text-ink/45 uppercase">
        Privacy policy · Updated {LAST_UPDATED}
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Your plate, your data.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink/65">
        What Sprigly stores, why, who helps us run it, and how to delete it all.
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
