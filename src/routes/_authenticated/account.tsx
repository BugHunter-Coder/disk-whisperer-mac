import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Copy, Download, Laptop, Loader2, LogOut } from "lucide-react";
import { PageShell } from "@/components/site/SiteFooter";
import { WordReveal, fadeUp, staggerParent } from "@/components/site/motion";
import { supabase } from "@/integrations/supabase/client";
import { getMyLicense, removeDevice, getDownloadLink } from "@/lib/license.functions";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "Your MacDissect Pro license" },
      {
        name: "description",
        content:
          "View your MacDissect Pro license key, manage activated Macs, and download the app.",
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
    <PageShell>
      <section className="relative isolate overflow-hidden px-6 pt-36 pb-20 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_20%_10%,rgba(255,201,60,0.22),transparent)]"
        />
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] leading-[0.95] font-extrabold tracking-tight">
              <WordReveal text="Your Pro license" />
            </h1>
            <button
              onClick={signOut}
              className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold transition-colors hover:bg-cream"
            >
              <LogOut className="size-4" /> Sign out
            </button>
          </div>

          {isLoading && (
            <div className="mt-8 space-y-3">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  className="h-28 rounded-3xl bg-ink/5"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          )}

          {!isLoading && !data && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-[2rem] border border-sun/50 bg-sun/25 p-8"
            >
              <h2 className="font-display text-2xl font-bold">No active license yet</h2>
              <p className="mt-2 text-ink/70">
                We couldn't find an active subscription for this email address. If you just paid,
                give it a minute and refresh. Otherwise, subscribe with the same email.
              </p>
              <Link
                to="/pricing"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-ink px-6 py-3 font-bold text-cream"
              >
                Go to pricing <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          )}

          {data && (
            <motion.div initial="hidden" animate="show" variants={staggerParent(0.1, 0.2)}>
              <motion.div
                variants={fadeUp}
                className="relative mt-8 overflow-hidden rounded-[2rem] bg-ink p-8 text-cream shadow-[10px_10px_0_0_#34D399]"
              >
                <motion.div
                  aria-hidden
                  className="absolute -top-28 -right-28 size-72 rounded-full bg-[conic-gradient(#34d399,#38bdf8,#a78bfa,#34d399)] opacity-25 blur-3xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative">
                  <span className="text-xs font-bold tracking-widest text-cream/50 uppercase">
                    License key
                  </span>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <code className="rounded-xl bg-cream/10 px-4 py-3 font-mono text-lg font-bold tracking-wider">
                      {data.licenseKey}
                    </code>
                    <motion.button
                      onClick={copyKey}
                      whileTap={{ scale: 0.94 }}
                      className="flex items-center gap-2 rounded-xl bg-mint px-4 py-3 text-sm font-bold text-ink"
                    >
                      <Copy className="size-4" /> Copy
                    </motion.button>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-cream/60">
                      <span>Macs activated</span>
                      <span className="font-semibold text-cream">
                        {data.activations} of {data.maxActivations}
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-cream/10">
                      <motion.div
                        className="h-full origin-left rounded-full bg-mint"
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: Math.min(1, data.activations / Math.max(1, data.maxActivations)),
                        }}
                        transition={{
                          type: "spring",
                          visualDuration: 0.8,
                          bounce: 0.1,
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </div>
                  <motion.button
                    onClick={handleDownload}
                    disabled={downloading}
                    whileHover={downloading ? {} : { y: -2 }}
                    whileTap={downloading ? {} : { scale: 0.98 }}
                    className="mt-7 flex items-center gap-2 rounded-2xl bg-sun px-7 py-4 text-base font-bold text-ink disabled:opacity-50"
                  >
                    {downloading ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      <Download className="size-5" />
                    )}
                    {downloading ? "Preparing…" : "Download MacDissect"}
                  </motion.button>
                </div>
              </motion.div>

              <motion.section variants={fadeUp} className="mt-10">
                <h2 className="font-display text-2xl font-bold">Activated Macs</h2>
                {data.devices.length === 0 ? (
                  <p className="mt-2 text-ink/60">
                    No Macs yet. Paste your key into MacDissect's Settings, or use the{" "}
                    <Link to="/activate" className="font-semibold underline underline-offset-4">
                      activation page
                    </Link>
                    .
                  </p>
                ) : (
                  <ul className="mt-4 space-y-2.5">
                    <AnimatePresence initial={false}>
                      {data.devices.map((d) => (
                        <motion.li
                          key={d.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
                          className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-cream px-5 py-4"
                        >
                          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sky/30">
                            <Laptop className="size-5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold">{d.deviceName ?? "Unnamed Mac"}</p>
                            <p className="truncate font-mono text-xs text-ink/45">{d.deviceId}</p>
                          </div>
                          <button
                            onClick={() => handleRemove(d.id)}
                            className="rounded-xl border border-coral/50 px-3 py-2 text-sm font-semibold transition-colors hover:bg-coral/20"
                          >
                            Remove
                          </button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </motion.section>
            </motion.div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
