import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { products } from "@/components/landing/products";
import { PageShell } from "@/components/site/SiteFooter";
import { Reveal, Stagger, StaggerItem, WordReveal } from "@/components/site/motion";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/products")({
  head: () =>
    pageHead({
      path: "/products",
      title: "Products – MacDissect",
      description:
        "Every app we make: MacDissect for Mac disk cleanup, and InsectScan for identifying insects, plants and animals from a photo.",
    }),
  component: ProductsPage,
});

const accentClasses = {
  mint: "bg-mint text-ink",
  coral: "bg-coral text-ink",
} as const;

function ProductsPage() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden px-6 pt-36 pb-12 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_15%_0%,rgba(52,211,153,0.2),transparent),radial-gradient(40%_50%_at_85%_10%,rgba(255,107,107,0.18),transparent)]"
        />
        <div className="mx-auto max-w-6xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold tracking-[0.2em] text-ink/45 uppercase"
          >
            Our apps
          </motion.span>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.95] font-extrabold tracking-tight">
            <WordReveal text="Small, focused apps." />{" "}
            <WordReveal text="No bloat, no nonsense." className="text-mint" delay={0.2} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-5 max-w-2xl text-lg text-ink/65"
          >
            Everything we've shipped, in one place.
          </motion.p>
        </div>
      </section>

      <Stagger className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 sm:grid-cols-2" gap={0.1}>
        {products.map((p) => (
          <StaggerItem key={p.slug}>
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-cream/80 backdrop-blur">
              <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
                <img
                  src={p.screenshot}
                  alt={`${p.name} screenshot`}
                  className="size-full object-cover object-top"
                  loading="lazy"
                />
                {p.status === "coming-soon" && (
                  <span className="absolute top-4 right-4 rounded-full bg-ink px-3 py-1 text-xs font-bold text-cream">
                    Coming soon
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center gap-3">
                  <img src={p.icon} alt="" className="size-11 rounded-2xl" />
                  <div>
                    <h2 className="font-display text-xl font-bold">{p.name}</h2>
                    <p className="text-sm text-ink/55">{p.tagline}</p>
                  </div>
                </div>

                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink/70">
                  {p.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-ink/50">
                  <span className={`rounded-full px-2.5 py-1 ${accentClasses[p.accent]}`}>
                    {p.platform}
                  </span>
                  <span>{p.price}</span>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {p.cta ? (
                    <Link
                      to={p.cta.href}
                      className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-bold text-cream transition-transform hover:-translate-y-0.5"
                    >
                      {p.cta.label} <ArrowRight className="size-4" />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-xl border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink/60">
                      Coming soon to the App Store
                    </span>
                  )}
                  {p.supportHref && (
                    <Link
                      to={p.supportHref}
                      className="text-sm font-semibold text-ink/55 underline-offset-4 hover:text-ink hover:underline"
                    >
                      Support
                    </Link>
                  )}
                  <Link
                    to={p.privacyHref}
                    className="text-sm font-semibold text-ink/55 underline-offset-4 hover:text-ink hover:underline"
                  >
                    Privacy
                  </Link>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex flex-col items-start gap-4 rounded-3xl bg-ink p-8 text-cream sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-6 text-mint" />
            <p className="max-w-md text-cream/75">
              Every app we make keeps your data on your device by default. No ads, no data selling.
            </p>
          </div>
        </div>
      </Reveal>
    </PageShell>
  );
}
