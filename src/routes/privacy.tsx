import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CreditCard, HardDrive, KeyRound, ShieldCheck, UserRound } from "lucide-react";
import { PageShell } from "@/components/site/SiteFooter";
import { Reveal, Stagger, StaggerItem, WordReveal } from "@/components/site/motion";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — MacDissect" },
      {
        name: "description",
        content:
          "How MacDissect handles your data: scans stay on your Mac, and the website only keeps what's needed for your subscription and license.",
      },
      { property: "og:title", content: "Privacy Policy — MacDissect" },
      {
        property: "og:description",
        content: "Scans stay on your Mac. Here's exactly what the app and website do with data.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

const LAST_UPDATED = "September 13, 2026";

const summary = [
  {
    icon: HardDrive,
    title: "Scans stay local",
    body: "File names, sizes and folders never leave your Mac.",
  },
  { icon: ShieldCheck, title: "No tracking", body: "No analytics, ads or telemetry in the app." },
  {
    icon: KeyRound,
    title: "License only",
    body: "The app sends your key and an anonymous Mac ID.",
  },
  {
    icon: CreditCard,
    title: "No card data",
    body: "Dodo Payments handles checkout. We never see your card.",
  },
];

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "app",
    title: "The MacDissect app",
    body: (
      <>
        <p>
          MacDissect scans the folders you choose and analyzes them entirely on your Mac. File and
          folder names, sizes, scan results and cleanup choices are never uploaded, and the app
          contains no analytics, advertising or crash-reporting services.
        </p>
        <p>The app stores the following on your Mac only:</p>
        <ul>
          <li>
            <strong>Scan history</strong>: summaries of past scans, in the app's Application Support
            folder, so History can show what changed. You can delete them from the History view.
          </li>
          <li>
            <strong>License and trial state</strong>: your license key, activation details and the
            trial start date, in your login Keychain.
          </li>
          <li>
            <strong>Preferences</strong>: settings such as menu bar and low-space alert options.
          </li>
        </ul>
        <p>
          When you click Empty Trash, macOS may ask you to allow MacDissect to control Finder. The
          app only asks Finder to empty the Trash and does nothing else with that permission.
        </p>
      </>
    ),
  },
  {
    id: "license",
    title: "License activation",
    body: (
      <>
        <p>
          The only network requests the app makes are to our license server, when you activate or
          deactivate a license and about every three days to confirm it's still active. Each request
          contains:
        </p>
        <ul>
          <li>your license key;</li>
          <li>
            an anonymous Mac ID: a one-way hash of your Mac's hardware identifier, so the real
            identifier never leaves your Mac;
          </li>
          <li>
            the name of your Mac (for example "Ada's MacBook Pro"), when activating, so you can tell
            your Macs apart on your account page.
          </li>
        </ul>
        <p>
          We store each activated Mac's ID, name and when it last checked in, and use them only to
          enforce the number of Macs a license allows and to show them on your account page. You can
          remove a Mac there at any time.
        </p>
      </>
    ),
  },
  {
    id: "purchases",
    title: "Purchases and payments",
    body: (
      <>
        <p>
          Checkout is run by <strong>Dodo Payments</strong>, which acts as the merchant of record.
          When you subscribe, you give us your name and email address, which we pass to Dodo
          Payments to start checkout. Dodo Payments collects your payment details and billing
          address under its own privacy policy; we never receive your card number.
        </p>
        <p>
          Dodo Payments sends us your subscription status, subscription ID, customer ID, email
          address and next billing date. We use these to issue, renew or revoke your license key.
        </p>
      </>
    ),
  },
  {
    id: "account",
    title: "Your website account",
    body: (
      <>
        <p>
          To see your license key and download the app, you create an account with your email
          address and a password. Accounts are managed by our hosting and database provider,
          Supabase, which stores your password in hashed form. Signing in keeps a session token in
          your browser's local storage so you stay signed in.
        </p>
        <p>
          The website doesn't use advertising or analytics cookies, and doesn't sell or share your
          information for marketing.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share data with",
    body: (
      <>
        <p>We share personal data only with the service providers needed to run MacDissect:</p>
        <ul>
          <li>
            <strong>Dodo Payments</strong>, for checkout, billing, tax and subscription management;
          </li>
          <li>
            <strong>Supabase</strong>, which hosts our database and accounts;
          </li>
          <li>our website hosting provider, which processes requests to this site.</li>
        </ul>
        <p>We may also disclose information when required by law.</p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Retention and your choices",
    body: (
      <>
        <p>
          We keep your subscription, license and activation records while your account exists, and
          as long as needed afterwards for accounting and legal obligations. Everything the app
          stores locally stays under your control: delete scan history in the app, or remove the app
          and its Keychain items.
        </p>
        <p>
          You can ask us to access, correct or delete your personal data. Reply to your purchase
          receipt email, or contact us from the email address on your account, and we'll respond
          within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        If we change how MacDissect handles data, we'll update this page and the date at the top.
        Significant changes will also be announced by email to subscribers.
      </p>
    ),
  },
];

function PolicySection({
  id,
  title,
  index,
  children,
  onVisible,
}: {
  id: string;
  title: string;
  index: number;
  children: ReactNode;
  onVisible: (id: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -55% 0px" });
  useEffect(() => {
    if (inView) onVisible(id);
  }, [inView, id, onVisible]);

  return (
    <section ref={ref} id={id} className="scroll-mt-28">
      <Reveal>
        <div className="flex items-baseline gap-3">
          <span className="font-display text-sm font-bold text-ink/30 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight">{title}</h2>
        </div>
        <div className="mt-4 space-y-4 text-[1.05rem] leading-relaxed text-ink/75 [&_li]:pl-1 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </Reveal>
    </section>
  );
}

function PrivacyPage() {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  return (
    <PageShell>
      <section className="relative isolate overflow-hidden px-6 pt-36 pb-12 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_20%_0%,rgba(52,211,153,0.22),transparent),radial-gradient(40%_50%_at_90%_10%,rgba(167,139,250,0.2),transparent)]"
        />
        <div className="mx-auto max-w-6xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold tracking-[0.2em] text-ink/45 uppercase"
          >
            Privacy policy · Updated {LAST_UPDATED}
          </motion.span>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.95] font-extrabold tracking-tight">
            <WordReveal text="Your files are" />{" "}
            <WordReveal text="none of our business." className="text-mint" delay={0.2} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-5 max-w-2xl text-lg text-ink/65"
          >
            MacDissect is built so your disk contents never leave your Mac. This page explains the
            small amount of data the app and this website do handle, and why.
          </motion.p>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
            {summary.map((s) => (
              <StaggerItem key={s.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="h-full rounded-3xl border border-ink/10 bg-cream/80 p-6 backdrop-blur"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-ink text-cream">
                    <s.icon className="size-4" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink/60">{s.body}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ul className="sticky top-28 space-y-1 border-l border-ink/10">
            {sections.map((s) => (
              <li key={s.id} className="relative">
                {active === s.id && (
                  <motion.span
                    layoutId="toc-active"
                    className="absolute top-0 -left-px h-full w-0.5 bg-ink"
                    transition={{ type: "spring", visualDuration: 0.3, bounce: 0.2 }}
                  />
                )}
                <a
                  href={`#${s.id}`}
                  className={`block py-1.5 pl-4 text-sm font-semibold transition-colors ${
                    active === s.id ? "text-ink" : "text-ink/45 hover:text-ink/75"
                  }`}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="max-w-3xl space-y-14">
          {sections.map((s, i) => (
            <PolicySection key={s.id} id={s.id} title={s.title} index={i} onVisible={setActive}>
              {s.body}
            </PolicySection>
          ))}
          <Reveal>
            <div className="rounded-3xl bg-ink p-8 text-cream">
              <UserRound className="size-6 text-mint" />
              <h2 className="mt-4 font-display text-2xl font-bold">Manage your data</h2>
              <p className="mt-2 text-cream/65">
                See your license key and remove activated Macs from your account page.
              </p>
              <Link
                to="/account"
                className="mt-5 inline-block rounded-xl bg-mint px-5 py-3 font-bold text-ink transition-transform hover:-translate-y-0.5"
              >
                Go to my license
              </Link>
            </div>
          </Reveal>
        </article>
      </div>
    </PageShell>
  );
}
