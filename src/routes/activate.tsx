import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { PageShell } from "@/components/site/SiteFooter";
import { WordReveal } from "@/components/site/motion";
import { activateDevice, checkLicenseKey } from "@/lib/license.functions";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/activate")({
  head: () =>
    pageHead({
      path: "/activate",
      title: "Activate MacDissect Pro",
      description: "Check or activate your MacDissect Pro license key.",
      noindex: true,
    }),
  component: ActivatePage,
});

function ActivatePage() {
  const check = useServerFn(checkLicenseKey);
  const activate = useServerFn(activateDevice);
  const [licenseKey, setLicenseKey] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const handleCheck = async () => {
    setBusy(true);
    setResult(null);
    try {
      const res = await check({ data: { licenseKey } });
      setResult(
        res.valid
          ? {
              ok: true,
              message: `Valid license — used on ${res.activations} of ${res.maxActivations} Macs.`,
            }
          : { ok: false, message: res.reason },
      );
    } catch {
      toast.error("Could not check that key. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleActivate = async () => {
    if (!deviceId.trim()) {
      toast.error("Enter the Mac ID shown in MacDissect's Settings.");
      return;
    }
    setBusy(true);
    setResult(null);
    try {
      const res = await activate({
        data: { licenseKey, deviceId, deviceName: deviceName || undefined },
      });
      setResult({ ok: res.ok, message: res.message });
    } catch {
      toast.error("Could not activate. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm font-medium normal-case transition-colors outline-none focus:border-ink/40 focus:bg-cream";

  return (
    <PageShell>
      <section className="relative isolate overflow-hidden px-6 pt-36 pb-20 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_70%_10%,rgba(52,211,153,0.22),transparent)]"
        />
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] leading-[0.95] font-extrabold tracking-tight">
            <WordReveal text="Activate MacDissect Pro" />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 max-w-lg text-lg text-ink/65"
          >
            MacDissect normally activates itself when you paste your key into the app. You can also
            check or activate a key here, using the Mac ID shown in the app's Settings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", visualDuration: 0.6, bounce: 0.15, delay: 0.35 }}
            className="mt-10 rounded-[2rem] border border-ink/10 bg-cream p-7 shadow-[0_30px_60px_-30px_rgba(25,25,37,0.35)] sm:p-9"
          >
            <label className="block text-xs font-bold tracking-wide text-ink/60 uppercase">
              License key
              <input
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="MACD-XXXX-XXXX-XXXX-XXXX"
                className={`${inputClass} font-mono font-semibold tracking-wider uppercase`}
              />
            </label>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="block text-xs font-bold tracking-wide text-ink/60 uppercase">
                Mac ID
                <input
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  placeholder="Settings › License › Mac ID"
                  className={`${inputClass} font-mono`}
                />
              </label>
              <label className="block text-xs font-bold tracking-wide text-ink/60 uppercase">
                Mac name (optional)
                <input
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  placeholder="Ada's MacBook Pro"
                  className={inputClass}
                />
              </label>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <motion.button
                onClick={handleActivate}
                disabled={busy || !licenseKey}
                whileHover={busy || !licenseKey ? {} : { y: -2 }}
                whileTap={busy || !licenseKey ? {} : { scale: 0.98 }}
                className="flex items-center gap-2 rounded-2xl bg-ink px-7 py-3.5 font-bold text-cream shadow-[4px_4px_0_0_#34D399] disabled:opacity-50"
              >
                {busy && <Loader2 className="size-4 animate-spin" />}
                {busy ? "Working…" : "Activate this Mac"}
              </motion.button>
              <button
                onClick={handleCheck}
                disabled={busy || !licenseKey}
                className="rounded-2xl border border-ink/15 bg-paper px-7 py-3.5 font-bold transition-colors hover:bg-ink/5 disabled:opacity-50"
              >
                Just check the key
              </button>
            </div>

            <AnimatePresence mode="wait">
              {result && (
                <motion.p
                  key={result.message}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  className={`mt-6 flex items-start gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${
                    result.ok ? "bg-mint/25" : "bg-coral/20"
                  }`}
                >
                  {result.ok ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                  ) : (
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  )}
                  {result.message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
          <p className="mt-6 text-sm text-ink/55">
            Lost your key?{" "}
            <Link to="/account" className="font-semibold text-ink underline underline-offset-4">
              Sign in to see it
            </Link>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
