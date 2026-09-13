import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createDodoCheckout } from "@/lib/dodo.functions";
import { AppPreview } from "@/components/landing/AppPreview";
import {
  CleanupSection,
  FaqSection,
  FeaturesSection,
  MonitorSection,
  PlansSection,
  PrivacySection,
} from "@/components/landing/Sections";

const description =
  "MacDissect shows what's filling your Mac with a treemap and sunburst, finds large files, cleans caches and build files safely, and tracks disk growth over time. Scans stay on your Mac.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MacDissect — See Every Gigabyte on Your Mac" },
      { name: "description", content: description },
      { property: "og:title", content: "MacDissect — See Every Gigabyte on Your Mac" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const startCheckout = useServerFn(createDodoCheckout);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("subscribed") === "1") {
      setSubscribed(true);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const handleSubscribe = async () => {
    if (!email || !name) {
      toast.error("Enter your name and email to subscribe.");
      return;
    }
    setBusy(true);
    try {
      const result = await startCheckout({ data: { email, name } });
      if (result.ok) {
        window.location.href = result.checkoutUrl;
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper font-sans text-ink antialiased">
      {subscribed && (
        <div className="bg-mint px-6 py-3 text-center text-sm font-bold text-ink">
          You're subscribed! Sign in with the same email to get your license key and download.
        </div>
      )}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8">
        <div className="flex items-center gap-2.5">
          <div className="grid size-9 place-items-center rounded-xl bg-ink font-display text-lg font-extrabold text-cream">
            M
          </div>
          <span className="font-display text-2xl font-extrabold tracking-tight">MacDissect</span>
        </div>
        <nav className="hidden items-center gap-8 font-medium text-ink/70 md:flex">
          <a href="#features" className="hover:text-ink">
            Features
          </a>
          <a href="#cleanup" className="hover:text-ink">
            Cleanup
          </a>
          <a href="#privacy" className="hover:text-ink">
            Privacy
          </a>
          <a href="#download" className="hover:text-ink">
            Pricing
          </a>
          <Link to="/account" className="hover:text-ink">
            My license
          </Link>
        </nav>
        <a
          href="#download"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream shadow-[3px_3px_0_0_#34D399] transition-transform hover:-translate-y-0.5"
        >
          Get MacDissect
        </a>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-16 pb-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-mint/40 bg-mint/20 px-4 py-1.5 text-xs font-semibold text-ink">
            <span className="size-2 rounded-full bg-mint"></span> Native macOS app · scans stay on
            your Mac
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.7rem,7vw,5.25rem)] leading-[0.95] font-extrabold tracking-tight">
            See every <span className="text-coral">gigabyte.</span>
            <br />
            Reclaim them safely.
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink/70">
            MacDissect scans your Mac and lays it out as a treemap you can click through. Find the
            files, caches and forgotten projects eating your disk, then clean them up without
            touching anything macOS needs.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#download"
              className="rounded-2xl bg-sun px-7 py-4 text-base font-bold text-ink shadow-[4px_4px_0_0_#191925] transition-transform hover:-translate-y-1"
            >
              Get MacDissect Pro
            </a>
            <a
              href="#features"
              className="rounded-2xl border-2 border-ink/15 bg-cream px-7 py-4 text-base font-bold transition-colors hover:bg-cream/60"
            >
              See what it does
            </a>
          </div>
          <p className="mt-5 text-sm text-ink/50">
            7-day free trial of every Pro feature · macOS 14 Sonoma or later
          </p>
        </div>
        <div className="lg:col-span-6">
          <AppPreview />
        </div>
      </section>

      <FeaturesSection />
      <CleanupSection />
      <MonitorSection />
      <PrivacySection />
      <PlansSection />

      <section id="download" className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-[2.5rem] bg-sun px-8 py-14 text-center text-ink shadow-[10px_10px_0_0_#191925] sm:px-14">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight font-extrabold tracking-tight">
            Ready to dissect your disk?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-ink/75">
            MacDissect Pro — one subscription, every feature, up to 3 Macs. Secure checkout by Dodo
            Payments.
          </p>
          <div className="mx-auto mt-8 max-w-md rounded-3xl border-2 border-ink/10 bg-cream p-6 text-left shadow-[6px_6px_0_0_#191925]">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-lg font-bold">MacDissect Pro</span>
              <span className="text-sm font-semibold text-ink/50">
                billed yearly · cancel anytime
              </span>
            </div>
            <label className="mt-5 block text-xs font-bold tracking-wide text-ink/60 uppercase">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className="mt-1.5 w-full rounded-xl border-2 border-ink/15 bg-paper px-4 py-3 text-sm font-medium normal-case outline-none focus:border-mint"
              />
            </label>
            <label className="mt-3 block text-xs font-bold tracking-wide text-ink/60 uppercase">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ada@example.com"
                className="mt-1.5 w-full rounded-xl border-2 border-ink/15 bg-paper px-4 py-3 text-sm font-medium normal-case outline-none focus:border-mint"
              />
            </label>
            <button
              type="button"
              onClick={handleSubscribe}
              disabled={busy}
              className="mt-5 w-full rounded-2xl bg-ink px-8 py-4 text-lg font-bold text-cream shadow-[4px_4px_0_0_#A78BFA] transition-transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {busy ? "Opening secure checkout…" : "Subscribe with Dodo Payments"}
            </button>
            <p className="mt-3 text-center text-xs text-ink/50">
              After paying, sign in with the same email to get your license key and the download.
            </p>
          </div>
        </div>
      </section>

      <FaqSection />

      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 pt-4 pb-12 text-sm text-ink/50 sm:flex-row">
        <span>© 2026 macdissect.com · made for people who love their Macs</span>
        <div className="flex gap-6">
          <Link to="/account" className="hover:text-ink">
            My license
          </Link>
          <Link to="/activate" className="hover:text-ink">
            Activate
          </Link>
          <a href="#faq" className="hover:text-ink">
            FAQ
          </a>
        </div>
      </footer>
    </div>
  );
}
