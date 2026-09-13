import { Link } from "@tanstack/react-router";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  Check,
  HardDrive,
  LogIn,
  Lock,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/site/motion";
import { FaqList } from "@/components/site/FaqList";
import { cleanupCategories, productFaqs, sections, tintClasses } from "./content";

function SectionHeading({
  eyebrow,
  title,
  body,
  center,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="text-xs font-bold tracking-[0.2em] text-ink/45 uppercase">{eyebrow}</span>
      <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-extrabold tracking-tight">
        {title}
      </h2>
      {body && <p className="mt-4 text-lg text-ink/65">{body}</p>}
    </Reveal>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        eyebrow="Six views"
        title="One very clear picture of your disk."
        body="Scan your home folder, any folder you pick, or the whole Mac. Then jump between views from the sidebar or the keyboard."
      />
      <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
        {sections.map((s) => {
          const tint = tintClasses[s.tint];
          return (
            <StaggerItem key={s.title} className={s.wide ? "sm:col-span-2" : ""}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", visualDuration: 0.3, bounce: 0.3 }}
                className={`group relative h-full overflow-hidden rounded-3xl border border-ink/10 bg-cream p-7 ring-2 ring-transparent transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(25,25,37,0.35)] ${tint.ring}`}
              >
                <div
                  className={`absolute -top-16 -right-16 size-44 rounded-full opacity-60 blur-2xl transition-transform duration-500 group-hover:scale-125 ${tint.soft}`}
                />
                <div className="relative flex items-center justify-between">
                  <kbd
                    className={`grid h-10 min-w-10 place-items-center rounded-xl px-2 font-display text-sm font-extrabold text-ink ${tint.solid}`}
                  >
                    {s.shortcut}
                  </kbd>
                  {s.pro && (
                    <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold tracking-wider text-cream">
                      PRO
                    </span>
                  )}
                </div>
                <h3 className="relative mt-6 font-display text-2xl font-bold">{s.title}</h3>
                <p className="relative mt-2 text-ink/65">{s.body}</p>
              </motion.div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

function AnimatedGb({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => v.toFixed(1));
  useEffect(() => {
    const controls = animate(mv, value, { type: "spring", visualDuration: 0.6, bounce: 0 });
    return () => controls.stop();
  }, [mv, value]);
  return <motion.span className="tabular-nums">{text}</motion.span>;
}

export function CleanupSection() {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(cleanupCategories.filter((c) => c.regenerable).map((c) => c.name)),
  );
  const total = useMemo(
    () =>
      cleanupCategories
        .filter((c) => selected.has(c.name))
        .reduce((sum, c) => sum + c.exampleGb, 0),
    [selected],
  );
  const toggle = (name: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  return (
    <section id="cleanup" className="scroll-mt-24 bg-ink py-24 text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="text-xs font-bold tracking-[0.2em] text-cream/45 uppercase">
              Smart Cleanup · Pro
            </span>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-extrabold tracking-tight">
              Knows where the gigabytes hide.
            </h2>
            <p className="mt-5 text-lg text-cream/65">
              MacDissect recognizes 14 kinds of reclaimable data, from Xcode DerivedData to
              forgotten node_modules. Each item is counted once, so the total is the space you
              actually get back.
            </p>
            <p className="mt-4 text-cream/65">
              <strong className="text-cream">Select Regenerable</strong> picks only data that
              rebuilds itself. Anything holding your own data is flagged for review.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 rounded-3xl border border-cream/10 bg-cream/5 p-6">
            <p className="text-sm font-semibold text-cream/50">Selected in this example scan</p>
            <p className="mt-1 font-display text-6xl font-extrabold tracking-tight">
              <AnimatedGb value={total} />
              <span className="ml-2 text-2xl text-cream/50">GB</span>
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  setSelected(
                    new Set(cleanupCategories.filter((c) => c.regenerable).map((c) => c.name)),
                  )
                }
                className="rounded-full bg-mint px-4 py-2 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
              >
                Select Regenerable
              </button>
              <button
                type="button"
                onClick={() => setSelected(new Set())}
                className="rounded-full border border-cream/20 px-4 py-2 text-sm font-bold transition-colors hover:bg-cream/10"
              >
                Clear
              </button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-cream/45">
              <RotateCcw className="size-3.5" /> Items go to the Trash, so you can restore them.
            </p>
          </Reveal>
        </div>

        <Stagger
          as="ul"
          className="grid content-start gap-2 sm:grid-cols-2 lg:col-span-7"
          gap={0.035}
        >
          {cleanupCategories.map((c) => {
            const on = selected.has(c.name);
            return (
              <StaggerItem as="li" key={c.name}>
                <motion.button
                  type="button"
                  onClick={() => toggle(c.name)}
                  whileTap={{ scale: 0.97 }}
                  aria-pressed={on}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-200 ${
                    on
                      ? "border-mint/50 bg-mint/10"
                      : "border-cream/10 bg-cream/[0.03] hover:bg-cream/[0.07]"
                  }`}
                >
                  <span
                    className={`grid size-5 shrink-0 place-items-center rounded-md border transition-colors ${
                      on ? "border-mint bg-mint text-ink" : "border-cream/30"
                    }`}
                  >
                    <motion.span
                      initial={false}
                      animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }}
                      transition={{ type: "spring", visualDuration: 0.2, bounce: 0.4 }}
                    >
                      <Check className="size-3.5" strokeWidth={3} />
                    </motion.span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-semibold">
                      {c.name}
                      {!c.regenerable && (
                        <span className="rounded-full bg-sun/20 px-1.5 py-0.5 text-[10px] font-bold text-sun">
                          Your data
                        </span>
                      )}
                    </span>
                    <span className="block truncate text-xs text-cream/50">{c.detail}</span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-cream/60 tabular-nums">
                    {c.exampleGb.toFixed(1)} GB
                  </span>
                </motion.button>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

export function MonitorSection() {
  const items = [
    {
      icon: HardDrive,
      title: "Free space in your menu bar",
      body: "Glance at what's left, start a scan, and see what changed since last time without opening the app.",
      tint: "bg-sky",
    },
    {
      icon: Bell,
      title: "Low-space alerts",
      body: "Pick a warning level. When free space drops below it, a notification takes you straight to Smart Cleanup.",
      tint: "bg-sun",
    },
    {
      icon: LogIn,
      title: "Scans at login",
      body: "Open MacDissect at login and let it scan in the background, so History always has fresh data.",
      tint: "bg-lilac",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Monitoring · Pro"
        title="Catch a full disk before it happens."
        center
      />
      <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
        {items.map((i) => (
          <StaggerItem key={i.title}>
            <div className="h-full rounded-3xl border border-ink/10 bg-cream p-7">
              <motion.span
                whileInView={{ rotate: [0, -12, 10, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`grid size-12 place-items-center rounded-2xl text-ink ${i.tint}`}
              >
                <i.icon className="size-5" />
              </motion.span>
              <h3 className="mt-5 font-display text-xl font-bold">{i.title}</h3>
              <p className="mt-2 text-ink/65">{i.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export function PrivacyTeaser() {
  const points = [
    { icon: HardDrive, text: "Scans and analysis run entirely on your Mac" },
    { icon: RotateCcw, text: "Items go to the Trash, so you can restore them" },
    { icon: Lock, text: "macOS system files and essential folders are off-limits" },
    { icon: ShieldCheck, text: "No telemetry. Only your license key is ever sent" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-mint/30 via-sky/20 to-lilac/30 p-8 sm:p-14">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-ink/50 uppercase">
                Private and safe
              </span>
              <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-extrabold tracking-tight">
                Your files never leave your Mac.
              </h2>
              <Link
                to="/privacy"
                className="group mt-6 inline-flex items-center gap-2 font-bold underline-offset-4 hover:underline"
              >
                Read the privacy policy
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <Stagger as="ul" className="space-y-3" gap={0.08}>
              {points.map((p) => (
                <StaggerItem as="li" key={p.text}>
                  <div className="flex items-center gap-3 rounded-2xl bg-cream/80 px-5 py-4 backdrop-blur">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-ink text-cream">
                      <p.icon className="size-4" />
                    </span>
                    <span className="font-semibold">{p.text}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-sun px-8 py-16 text-center shadow-[10px_10px_0_0_#191925] sm:px-14">
          <motion.div
            aria-hidden
            className="absolute -top-24 -left-24 size-72 rounded-full bg-coral/30 blur-3xl"
            animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -right-24 -bottom-24 size-72 rounded-full bg-mint/40 blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <h2 className="relative font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1] font-extrabold tracking-tight">
            Ready to dissect your disk?
          </h2>
          <p className="relative mx-auto mt-5 max-w-md text-lg text-ink/75">
            Try every Pro feature free for 7 days. Keep them for $10 a year on up to 3 Macs.
          </p>
          <motion.div
            className="relative mt-8 inline-block"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/download"
              className="inline-flex items-center gap-2 rounded-2xl bg-ink px-8 py-4 text-lg font-bold text-cream shadow-[4px_4px_0_0_#A78BFA]"
            >
              Download free <ArrowRight className="size-5" />
            </Link>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-6 pb-12">
      <SectionHeading eyebrow="FAQ" title="Questions, answered." center />
      <Reveal className="mt-10">
        <FaqList items={productFaqs} />
      </Reveal>
      <p className="mt-6 text-center text-sm text-ink/55">
        Billing questions?{" "}
        <Link
          to="/pricing"
          hash="billing"
          className="font-semibold text-ink underline underline-offset-4"
        >
          See the pricing FAQ
        </Link>
      </p>
    </section>
  );
}
