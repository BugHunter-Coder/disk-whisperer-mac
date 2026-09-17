import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { ArticleCta, ArticleHero, proseClass } from "@/components/site/ArticleCta";
import { PageShell } from "@/components/site/SiteFooter";
import {
  comparisons,
  COMPARE_UPDATED,
  findComparison,
  macdissectFacts,
} from "@/components/landing/compare";
import { articleJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/compare/$slug")({
  loader: ({ params }) => {
    const comparison = findComparison(params.slug);
    if (!comparison) throw notFound();
    return comparison;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const path = `/compare/${loaderData.slug}`;
    return pageHead({
      path,
      title: loaderData.metaTitle,
      description: loaderData.description,
      jsonLd: [
        articleJsonLd({
          path,
          title: `MacDissect vs ${loaderData.name}`,
          description: loaderData.description,
          updated: COMPARE_UPDATED,
        }),
      ],
    });
  },
  component: ComparePage,
});

function ReasonList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="h-full rounded-3xl border border-ink/10 bg-cream p-7">
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-ink/75">
            <Check className="mt-1 size-4 shrink-0 text-mint" strokeWidth={3} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComparePage() {
  const c = Route.useLoaderData();
  const others = comparisons.filter((o) => o.slug !== c.slug);

  return (
    <PageShell>
      <ArticleHero
        eyebrow="Compare"
        title={`MacDissect vs ${c.name}`}
        intro={`Both help you understand what's using your Mac's disk. Here's how MacDissect and ${c.name} differ, so you can pick the one that fits.`}
      />
      <article className="mx-auto max-w-3xl px-6 pb-16">
        <section className={proseClass}>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
            About {c.name}
          </h2>
          <p>
            {c.summary} Pricing: {c.pricing.toLowerCase()}. Made by {c.maker}; see{" "}
            <a href={c.website} rel="noopener nofollow" className="underline underline-offset-4">
              their website
            </a>{" "}
            for current details.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">
            What MacDissect offers
          </h2>
          <dl className="mt-5 divide-y divide-ink/10 overflow-hidden rounded-3xl border border-ink/10 bg-cream">
            {macdissectFacts.map((f) => (
              <div key={f.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[11rem_1fr]">
                <dt className="font-semibold">{f.label}</dt>
                <dd className="text-ink/70">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <ReasonList title={`Choose ${c.name} if…`} items={c.chooseThem} />
          <ReasonList title="Choose MacDissect if…" items={c.chooseUs} />
        </section>

        <p className="mt-6 text-sm text-ink/45">
          Last reviewed {COMPARE_UPDATED}. {c.name} is a trademark of {c.maker}. This page is not
          affiliated with or endorsed by them.
        </p>

        <ArticleCta body="Try MacDissect on your home folder for free. Upgrade to Pro only if you want full-Mac scans, Smart Cleanup, History and alerts." />

        <nav aria-label="Other comparisons" className="mt-12 border-t border-ink/10 pt-10">
          <h2 className="font-display text-xl font-bold">Other comparisons</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  to="/compare/$slug"
                  params={{ slug: o.slug }}
                  className="inline-block rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold hover:bg-cream"
                >
                  MacDissect vs {o.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/guides"
                className="inline-block rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream"
              >
                Disk space guides
              </Link>
            </li>
          </ul>
        </nav>
      </article>
    </PageShell>
  );
}
