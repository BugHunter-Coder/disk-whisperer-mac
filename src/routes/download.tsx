import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Check, Copy, FolderInput, MousePointerClick, ShieldCheck, Sparkles } from "lucide-react";
import { DownloadButton } from "@/components/site/DownloadButton";
import { PageShell } from "@/components/site/SiteFooter";
import { Reveal, Stagger, StaggerItem, WordReveal } from "@/components/site/motion";
import { DOWNLOAD } from "@/lib/download";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Download MacDissect for Mac" },
      {
        name: "description",
        content: `Download MacDissect ${DOWNLOAD.version} for ${DOWNLOAD.requirements}. Free forever, Pro is $10 a year.`,
      },
      { property: "og:title", content: "Download MacDissect for Mac" },
      {
        property: "og:description",
        content: "See what's filling your Mac. Free to download, Pro is $10 a year.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DownloadPage,
});

const steps = [
  {
    icon: FolderInput,
    title: "Drag to Applications",
    body: "Open MacDissect.dmg and drag MacDissect into your Applications folder.",
    tint: "bg-sky",
  },
  {
    icon: MousePointerClick,
    title: "Open MacDissect",
    body: "Open it from Applications. macOS checks Apple\u2019s notarization and may ask you to confirm an app downloaded from the internet \u2014 click Open.",
    tint: "bg-coral",
  },
  {
    icon: Sparkles,
    title: "Scan your Mac",
    body: "Scan your home folder for free. With Pro, scan your whole Mac or any folder and use Smart Cleanup.",
    tint: "bg-mint",
  },
];

function DownloadPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <PageShell>
      <section className="relative isolate overflow-hidden px-6 pt-36 pb-16 text-center sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_50%_0%,rgba(56,189,248,0.22),transparent),radial-gradient(35%_40%_at_80%_60%,rgba(52,211,153,0.16),transparent)]"
        />
        <motion.img
          src="/product/explore-treemap.png"
          alt=""
          aria-hidden
          initial={{ opacity: 0, y: 30, rotateX: 18 }}
          animate={{ opacity: 1, y: 0, rotateX: 8 }}
          transition={{ type: "spring", visualDuration: 0.9, bounce: 0.15, delay: 0.2 }}
          style={{ transformPerspective: 1400 }}
          className="mx-auto mb-10 w-full max-w-md rounded-2xl shadow-[0_40px_80px_-30px_rgba(25,25,37,0.45)]"
        />
        <h1 className="mx-auto max-w-3xl font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.95] font-extrabold tracking-tight">
          <WordReveal text="Download" />{" "}
          <WordReveal text="MacDissect." className="text-coral" delay={0.15} />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-5 max-w-xl text-lg text-ink/65"
        >
          Free to download, and the essentials stay free forever. Unlock every Pro feature for $10 a
          year.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <DownloadButton
            label={`Download MacDissect ${DOWNLOAD.version}`}
            className="px-8 py-4 text-lg"
          />
          <p className="text-sm text-ink/50">
            {DOWNLOAD.size} · {DOWNLOAD.requirements}
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-extrabold tracking-tight">
            Install in three steps
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-3" gap={0.1}>
          {steps.map((s, i) => (
            <StaggerItem key={s.title}>
              <div className="relative h-full rounded-3xl border border-ink/10 bg-cream p-7">
                <span className="absolute top-6 right-6 font-display text-4xl font-extrabold text-ink/10">
                  {i + 1}
                </span>
                <span className={`grid size-12 place-items-center rounded-2xl text-ink ${s.tint}`}>
                  <s.icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-ink/65">{s.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <Reveal>
          <div className="rounded-3xl bg-ink p-8 text-cream">
            <ShieldCheck className="size-6 text-mint" />
            <h2 className="mt-4 font-display text-2xl font-bold">
              Signed &amp; notarized by Apple
            </h2>
            <p className="mt-2 text-cream/70">
              MacDissect is signed with an Apple Developer ID and notarized by Apple, so it opens
              like any app from a trusted developer &mdash; no security workarounds. It doesn&apos;t
              upload anything and only reads the folders you choose.
            </p>
            <div className="mt-6 rounded-2xl bg-cream/5 p-4">
              <p className="text-xs font-bold tracking-widest text-cream/50 uppercase">
                SHA-256 checksum
              </p>
              <div className="mt-2 flex items-center gap-3">
                <code className="min-w-0 flex-1 truncate font-mono text-xs text-cream/80">
                  {DOWNLOAD.sha256}
                </code>
                <button
                  type="button"
                  onClick={() => copy(DOWNLOAD.sha256)}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-cream/10 px-3 py-1.5 text-xs font-bold hover:bg-cream/20"
                >
                  {copied === DOWNLOAD.sha256 ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  {copied === DOWNLOAD.sha256 ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
        <p className="mt-8 text-center text-sm text-ink/55">
          Ready to keep Pro?{" "}
          <Link to="/pricing" className="font-semibold text-ink underline underline-offset-4">
            $10 a year
          </Link>{" "}
          · Already subscribed?{" "}
          <Link to="/activate" className="font-semibold text-ink underline underline-offset-4">
            Activate your Mac
          </Link>
        </p>
      </section>
    </PageShell>
  );
}
