import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Leaf, MapPin, ShieldCheck, WifiOff } from "lucide-react";
import { PageShell } from "@/components/site/SiteFooter";
import { Reveal, Stagger, StaggerItem, WordReveal } from "@/components/site/motion";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/apps/insectscan/")({
  head: () =>
    pageHead({
      path: "/apps/insectscan",
      title: "InsectScan – Point. Shoot. Know.",
      description:
        "Photograph any insect, plant or animal and get a species identification in seconds — with habitat, diet, lifecycle, range and a clear safety rating. 20+ species fully profiled offline.",
    }),
  component: InsectScanDetailPage,
});

const screenshots = [
  "/product/insectscan-home.png",
  "/product/insectscan-result.png",
  "/product/insectscan-species.png",
  "/product/insectscan-safety.png",
  "/product/insectscan-library.png",
];

const highlights = [
  {
    icon: WifiOff,
    title: "Works offline",
    body: "20+ species are fully profiled and available with no connection at all, and the bundled model covers hundreds more.",
  },
  {
    icon: ShieldCheck,
    title: "Know before you touch",
    body: "Every result comes with a clear risk rating, so you know instantly whether to look closer or step back.",
  },
  {
    icon: Leaf,
    title: "The whole story",
    body: "Habitat, diet, lifecycle and range — not just a name.",
  },
  {
    icon: MapPin,
    title: "Anywhere you are",
    body: "On the trail, in the garden, or on your kitchen wall — point your camera and shoot.",
  },
];

function InsectScanDetailPage() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden px-6 pt-36 pb-16 sm:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_85%_0%,rgba(255,107,107,0.2),transparent),radial-gradient(40%_50%_at_10%_20%,rgba(52,211,153,0.15),transparent)]"
        />
        <div className="mx-auto max-w-6xl">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/55 hover:text-ink"
          >
            <ArrowLeft className="size-4" /> All products
          </Link>

          <div className="mt-6 flex items-center gap-4">
            <img
              src="/product/insectscan-icon.png"
              alt=""
              className="size-16 rounded-2xl shadow-lg"
            />
            <span className="rounded-full bg-coral px-3 py-1 text-xs font-bold text-ink">
              Coming soon on iOS
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[0.95] font-extrabold tracking-tight">
            <WordReveal text="Point. Shoot." />{" "}
            <WordReveal text="Know." className="text-coral" delay={0.2} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-5 max-w-2xl text-lg text-ink/65"
          >
            Photograph any insect, plant or animal and get a species identification in seconds — on
            the trail, in the garden, or on your kitchen wall.
          </motion.p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-xl border border-ink/15 px-5 py-2.5 text-sm font-bold text-ink/60">
              Coming soon to the App Store
            </span>
            <Link
              to="/apps/insectscan/support"
              className="text-sm font-semibold text-ink/55 underline-offset-4 hover:text-ink hover:underline"
            >
              Support
            </Link>
            <Link
              to="/apps/insectscan/privacy"
              className="text-sm font-semibold text-ink/55 underline-offset-4 hover:text-ink hover:underline"
            >
              Privacy
            </Link>
            <Link
              to="/apps/insectscan/terms"
              className="text-sm font-semibold text-ink/55 underline-offset-4 hover:text-ink hover:underline"
            >
              Terms
            </Link>
          </div>
        </div>
      </section>

      <Reveal className="mx-auto max-w-6xl px-6 pb-4">
        <div className="flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">
          {screenshots.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`InsectScan screenshot ${i + 1}`}
              className="h-[32rem] shrink-0 snap-start rounded-[2rem] border border-ink/10 object-cover shadow-2xl"
              loading="lazy"
            />
          ))}
        </div>
      </Reveal>

      <Stagger
        className="mx-auto grid max-w-6xl gap-4 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4"
        gap={0.08}
      >
        {highlights.map((h) => (
          <StaggerItem key={h.title}>
            <div className="h-full rounded-3xl border border-ink/10 bg-cream/80 p-6">
              <span className="grid size-10 place-items-center rounded-xl bg-ink text-cream">
                <h.icon className="size-4" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{h.title}</h3>
              <p className="mt-1 text-sm text-ink/60">{h.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </PageShell>
  );
}
