import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getMyLicense, removeDevice, getDownloadLink } from "@/lib/license.functions";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "Your MacDissect Pro license" },
      {
        name: "description",
        content: "View your MacDissect Pro license key, manage activated Macs, and download the app.",
      },
      { property: "og:title", content: "Your MacDissect Pro license" },
      {
        property: "og:description",
        content: "License key, activated Macs, and the MacDissect Pro download.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchLicense = useServerFn(getMyLicense);
  const remove = useServerFn(removeDevice);
  const download = useServerFn(getDownloadLink);
  const [downloading, setDownloading] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["my-license"],
    queryFn: () => fetchLicense(),
  });

  const copyKey = async () => {
    if (!data) return;
    await navigator.clipboard.writeText(data.licenseKey);
    toast.success("License key copied.");
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const result = await download();
      if (result.ok) window.location.href = result.url;
      else toast.info(result.message);
    } finally {
      setDownloading(false);
    }
  };

  const handleRemove = async (activationId: string) => {
    const result = await remove({ data: { activationId } });
    if (result.ok) {
      toast.success(result.message);
      await queryClient.invalidateQueries({ queryKey: ["my-license"] });
    } else {
      toast.error(result.message);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    await navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 pt-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-ink font-display text-lg font-extrabold text-cream">
            M
          </span>
          <span className="font-display text-2xl font-extrabold tracking-tight">MacDissect</span>
        </Link>
        <button
          onClick={signOut}
          className="rounded-full border-2 border-ink/15 px-4 py-2 text-sm font-semibold hover:bg-cream"
        >
          Sign out
        </button>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] leading-tight font-extrabold tracking-tight">
          Your Pro license
        </h1>

        {isLoading && <p className="mt-6 text-ink/60">Loading your license…</p>}

        {!isLoading && !data && (
          <div className="mt-6 rounded-3xl border-2 border-sun/50 bg-sun/25 p-7">
            <h2 className="font-display text-xl font-bold">No active license yet</h2>
            <p className="mt-2 text-ink/70">
              We couldn't find an active subscription for this email address. If you just paid, give
              it a minute and refresh — otherwise subscribe from the home page with the same email.
            </p>
            <Link
              to="/"
              hash="download"
              className="mt-5 inline-block rounded-2xl bg-ink px-6 py-3 font-bold text-cream"
            >
              Go to pricing
            </Link>
          </div>
        )}

        {data && (
          <>
            <div className="mt-6 rounded-3xl border-2 border-ink/10 bg-cream p-7 shadow-[6px_6px_0_0_#191925]">
              <span className="text-xs font-bold tracking-wide text-ink/50 uppercase">
                License key
              </span>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <code className="rounded-xl bg-paper px-4 py-3 font-mono text-lg font-bold tracking-wider">
                  {data.licenseKey}
                </code>
                <button
                  onClick={copyKey}
                  className="rounded-xl bg-mint px-4 py-3 text-sm font-bold text-ink"
                >
                  Copy
                </button>
              </div>
              <p className="mt-3 text-sm text-ink/60">
                Activated on {data.activations} of {data.maxActivations} Macs.
              </p>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="mt-6 rounded-2xl bg-ink px-7 py-4 text-base font-bold text-cream shadow-[4px_4px_0_0_#34D399] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {downloading ? "Preparing…" : "Download MacDissect Pro"}
              </button>
            </div>

            <section className="mt-8">
              <h2 className="font-display text-xl font-bold">Activated Macs</h2>
              {data.devices.length === 0 ? (
                <p className="mt-2 text-ink/60">
                  No Macs yet. Paste your key into MacDissect Pro, or use the{" "}
                  <Link to="/activate" className="font-semibold underline">
                    activation page
                  </Link>
                  .
                </p>
              ) : (
                <ul className="mt-3 space-y-2.5">
                  {data.devices.map((d) => (
                    <li
                      key={d.id}
                      className="flex items-center justify-between rounded-2xl bg-cream px-5 py-4"
                    >
                      <div>
                        <p className="font-semibold">{d.deviceName ?? "Unnamed Mac"}</p>
                        <p className="text-xs text-ink/50">{d.deviceId}</p>
                      </div>
                      <button
                        onClick={() => handleRemove(d.id)}
                        className="rounded-xl border-2 border-coral/50 px-3 py-2 text-sm font-semibold text-ink hover:bg-coral/20"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
