import { createFileRoute, useServerFn } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createDodoCheckout } from "@/lib/dodo.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MacDissect — See Every Gigabyte on Your Mac" },
      {
        name: "description",
        content:
          "MacDissect maps your Mac's disk into a color map: find large files, drill into folders, and empty the trash in one click. 100% on-device.",
      },
      { property: "og:title", content: "MacDissect — See Every Gigabyte on Your Mac" },
      {
        property: "og:description",
        content:
          "Visualize disk usage, find large files, drill into folders and empty the trash in one click. Private, on-device, macOS only.",
      },
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
          You're subscribed! Your MacDissect Pro access is being activated — check your email.
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
          <a href="#privacy" className="hover:text-ink">
            Privacy
          </a>
          <a href="#download" className="hover:text-ink">
            Pricing
          </a>
        </nav>
        <a
          href="#download"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream shadow-[3px_3px_0_0_#34D399] transition-transform hover:-translate-y-0.5"
        >
          Get the app
        </a>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-16 pb-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-mint/40 bg-mint/20 px-4 py-1.5 text-xs font-semibold text-ink">
            <span className="size-2 rounded-full bg-mint"></span> 100% on-device · no cloud
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.7rem,7vw,5.25rem)] leading-[0.95] font-extrabold tracking-tight">
            See every <span className="text-coral">gigabyte.</span>
            <br />
            Reclaim them all.
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink/70">
            MacDissect maps your whole disk into a living color map, so the space hogging 40&nbsp;GB
            stops being a mystery and becomes one click away.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#download"
              className="rounded-2xl bg-sun px-7 py-4 text-base font-bold text-ink shadow-[4px_4px_0_0_#191925] transition-transform hover:-translate-y-1"
            >
              Download free
            </a>
            <a
              href="#features"
              className="rounded-2xl border-2 border-ink/15 bg-cream px-7 py-4 text-base font-bold transition-colors hover:bg-cream/60"
            >
              Watch it dissect
            </a>
          </div>
          <p className="mt-5 text-sm text-ink/50">Free for personal use · 4.9★ from 2,300 Macs</p>
        </div>
        <div className="lg:col-span-6">
          <div className="relative">
            <div className="absolute -top-3 -left-3 size-16 -rotate-6 rounded-2xl bg-sky/30"></div>
            <div className="absolute -right-3 -bottom-4 size-20 rotate-12 rounded-full bg-coral/25"></div>
            <div className="relative overflow-hidden rounded-[2rem] border-2 border-ink/10 bg-cream shadow-[10px_10px_0_0_#191925]">
              <div className="flex items-center gap-2 border-b-2 border-ink/10 px-5 py-3.5">
                <span className="size-3 rounded-full bg-coral"></span>
                <span className="size-3 rounded-full bg-sun"></span>
                <span className="size-3 rounded-full bg-mint"></span>
                <span className="ml-3 text-xs font-semibold text-ink/40">
                  MacDissect — /Users/you
                </span>
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-end justify-between">
                  <span className="font-display text-lg font-bold">Disk usage</span>
                  <span className="text-xs font-semibold text-ink/50">412 GB of 512 GB</span>
                </div>
                <div className="flex h-16 gap-0.5 overflow-hidden rounded-2xl border-2 border-ink/10">
                  <div style={{ width: "44%" }}></div>
                  <div className="flex-1 bg-sky"></div>
                  <div className="bg-sun" style={{ width: "14%" }}></div>
                  <div className="bg-mint" style={{ width: "10%" }}></div>
                  <div className="flex-1 bg-lilac"></div>
                </div>
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between rounded-xl bg-mint/15 px-4 py-2.5">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <span className="size-3 rounded-full bg-mint"></span>~/Library/Caches
                    </span>
                    <span className="text-sm font-bold">128 GB</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-sky/10 px-4 py-2.5">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <span className="size-3 rounded-full bg-sky"></span>~/Movies
                    </span>
                    <span className="text-sm font-bold">96 GB</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-sun/10 px-4 py-2.5">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <span className="size-3 rounded-full bg-sun"></span>~/Downloads
                    </span>
                    <span className="text-sm font-bold">54 GB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="font-display text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold tracking-tight">
          Four ways it finds your space
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-mint/40 bg-mint/20 p-6">
            <div className="grid size-11 place-items-center rounded-2xl bg-mint font-display text-lg font-extrabold text-ink">
              1
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">Color visualization</h3>
            <p className="mt-1.5 text-sm text-ink/70">
              Every folder becomes a block of color, sized to how much it eats.
            </p>
          </div>
          <div className="rounded-3xl border-2 border-sky/40 bg-sky/20 p-6">
            <div className="grid size-11 place-items-center rounded-2xl bg-sky font-display text-lg font-extrabold text-ink">
              2
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">One-click empty trash</h3>
            <p className="mt-1.5 text-sm text-ink/70">
              Spot the deletables, clear them in a single confident tap.
            </p>
          </div>
          <div className="rounded-3xl border-2 border-sun/50 bg-sun/25 p-6">
            <div className="grid size-11 place-items-center rounded-2xl bg-sun font-display text-lg font-extrabold text-ink">
              3
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">Folder drill-down</h3>
            <p className="mt-1.5 text-sm text-ink/70">
              Zoom from the whole disk down to a single stubborn file.
            </p>
          </div>
          <div className="rounded-3xl border-2 border-coral/40 bg-coral/20 p-6">
            <div className="grid size-11 place-items-center rounded-2xl bg-coral font-display text-lg font-extrabold text-ink">
              4
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">Large file finder</h3>
            <p className="mt-1.5 text-sm text-ink/70">
              Surface the 3&nbsp;GB monsters hiding in plain sight.
            </p>
          </div>
        </div>
      </section>

      <section id="privacy" className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid items-center gap-10 rounded-[2.5rem] bg-ink px-8 py-14 text-cream sm:px-14 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border-2 border-lilac/50 bg-lilac/25 px-4 py-1.5 text-xs font-semibold text-cream">
              Privacy first
            </span>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] leading-tight font-extrabold">
              Your disk never leaves your Mac.
            </h2>
            <p className="mt-4 text-lg text-cream/70">
              No accounts, no telemetry, no uploads. MacDissect reads and analyzes locally, then
              does its work right on your machine.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl bg-cream/10 px-5 py-4">
              <span className="grid size-9 place-items-center rounded-xl bg-mint font-bold text-ink">
                ✓
              </span>
              <span className="font-semibold">Fully on-device analysis</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-cream/10 px-5 py-4">
              <span className="grid size-9 place-items-center rounded-xl bg-sun font-bold text-ink">
                ✓
              </span>
              <span className="font-semibold">No data collection, ever</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-cream/10 px-5 py-4">
              <span className="grid size-9 place-items-center rounded-xl bg-coral font-bold text-ink">
                ✓
              </span>
              <span className="font-semibold">Permission-safe, sandboxed access</span>
            </div>
          </div>
        </div>
      </section>

      <section id="download" className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-[2.5rem] bg-sun px-8 py-14 text-center text-ink shadow-[10px_10px_0_0_#191925] sm:px-14">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight font-extrabold tracking-tight">
            Ready to dissect your disk?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-ink/75">
            MacDissect Pro — one simple subscription, every feature unlocked. Secure checkout by
            Dodo Payments.
          </p>
          <div className="mx-auto mt-8 max-w-md rounded-3xl border-2 border-ink/10 bg-cream p-6 text-left shadow-[6px_6px_0_0_#191925]">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-lg font-bold">MacDissect Pro</span>
              <span className="text-sm font-semibold text-ink/50">billed yearly · cancel anytime</span>
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
              You'll be redirected to Dodo's secure checkout to finish payment.
            </p>
          </div>
        </div>
        <footer className="mt-12 flex flex-col items-center justify-between gap-3 text-sm text-ink/50 sm:flex-row">
          <span>© 2026 macdissect.com · made for people who love their Macs</span>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-ink">
              Docs
            </a>
            <a href="#privacy" className="hover:text-ink">
              Changelog
            </a>
            <a href="#download" className="hover:text-ink">
              Contact
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
}
