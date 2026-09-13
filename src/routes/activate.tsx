import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { activateDevice, checkLicenseKey } from "@/lib/license.functions";

export const Route = createFileRoute("/activate")({
  head: () => ({
    meta: [
      { title: "Activate MacDissect Pro" },
      {
        name: "description",
        content:
          "Enter your MacDissect Pro license key to check it or activate it on one of your Macs.",
      },
      { property: "og:title", content: "Activate MacDissect Pro" },
      {
        property: "og:description",
        content: "Check or activate your MacDissect Pro license key.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
      toast.error("Enter the device id shown in MacDissect Pro.");
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

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-6 pt-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-ink font-display text-lg font-extrabold text-cream">
            M
          </span>
          <span className="font-display text-2xl font-extrabold tracking-tight">MacDissect</span>
        </Link>
        <Link to="/account" className="text-sm font-semibold text-ink/70 hover:text-ink">
          My license
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] leading-tight font-extrabold tracking-tight">
          Activate MacDissect Pro
        </h1>
        <p className="mt-3 max-w-lg text-ink/70">
          MacDissect Pro normally activates itself when you paste your key into the app. You can
          also check or activate a key here.
        </p>

        <div className="mt-8 rounded-3xl border-2 border-ink/10 bg-cream p-7 shadow-[6px_6px_0_0_#191925]">
          <label className="block text-xs font-bold tracking-wide text-ink/60 uppercase">
            License key
            <input
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              placeholder="MACD-XXXX-XXXX-XXXX-XXXX"
              className="mt-1.5 w-full rounded-xl border-2 border-ink/15 bg-paper px-4 py-3 font-mono text-sm font-semibold tracking-wider uppercase outline-none focus:border-mint"
            />
          </label>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="block text-xs font-bold tracking-wide text-ink/60 uppercase">
              Device id
              <input
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                placeholder="Shown in MacDissect Pro"
                className="mt-1.5 w-full rounded-xl border-2 border-ink/15 bg-paper px-4 py-3 text-sm font-medium normal-case outline-none focus:border-mint"
              />
            </label>
            <label className="block text-xs font-bold tracking-wide text-ink/60 uppercase">
              Mac name (optional)
              <input
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                placeholder="Ada's MacBook Pro"
                className="mt-1.5 w-full rounded-xl border-2 border-ink/15 bg-paper px-4 py-3 text-sm font-medium normal-case outline-none focus:border-mint"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleActivate}
              disabled={busy || !licenseKey}
              className="rounded-2xl bg-ink px-7 py-3.5 font-bold text-cream shadow-[4px_4px_0_0_#34D399] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {busy ? "Working…" : "Activate this Mac"}
            </button>
            <button
              onClick={handleCheck}
              disabled={busy || !licenseKey}
              className="rounded-2xl border-2 border-ink/15 bg-paper px-7 py-3.5 font-bold disabled:opacity-50"
            >
              Just check the key
            </button>
          </div>

          {result && (
            <p
              className={`mt-5 rounded-xl px-4 py-3 text-sm font-semibold ${
                result.ok ? "bg-mint/25" : "bg-coral/20"
              }`}
            >
              {result.message}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
