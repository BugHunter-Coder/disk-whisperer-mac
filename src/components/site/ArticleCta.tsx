import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DownloadButton } from "@/components/site/DownloadButton";

/** Closing pitch on guide and comparison pages. */
export function ArticleCta({ body }: { body: string }) {
  return (
    <div className="mt-14 overflow-hidden rounded-[2rem] bg-ink p-8 text-cream sm:p-10">
      <span className="text-xs font-bold tracking-[0.2em] text-cream/45 uppercase">
        Do it in MacDissect
      </span>
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
        See every gigabyte, then reclaim it safely.
      </h2>
      <p className="mt-3 max-w-2xl text-cream/70">{body}</p>
      <div className="mt-7 flex flex-wrap items-center gap-4">
        <DownloadButton variant="sun" label="Download MacDissect free" />
        <Link
          to="/pricing"
          className="group inline-flex items-center gap-2 font-bold text-cream/80 hover:text-cream"
        >
          Pro is $10 once, for life
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

/** Hero block shared by guide and comparison pages. */
export function ArticleHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: React.ReactNode;
  title: string;
  intro: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-10 sm:pt-44">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_20%_0%,rgba(56,189,248,0.2),transparent),radial-gradient(40%_50%_at_90%_10%,rgba(52,211,153,0.18),transparent)]"
      />
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-xs font-bold tracking-[0.2em] text-ink/45 uppercase">{eyebrow}</div>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,5.5vw,3.75rem)] leading-[1] font-extrabold tracking-tight">
          {title}
        </h1>
        <p className="mt-5 text-lg text-ink/65">{intro}</p>
      </div>
    </section>
  );
}

/** Body text styles for long-form pages. */
export const proseClass =
  "space-y-4 text-[1.05rem] leading-relaxed text-ink/75 [&_li]:pl-1 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5";
