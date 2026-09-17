import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ArticleHero } from "@/components/site/ArticleCta";
import { PageShell } from "@/components/site/SiteFooter";
import { Stagger, StaggerItem } from "@/components/site/motion";
import { comparisons } from "@/components/landing/compare";
import { guides } from "@/components/landing/guides";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/")({
  head: () =>
    pageHead({
      path: "/guides",
      title: "Mac Disk Space Guides – MacDissect",
      description:
        "Practical guides to freeing up disk space on a Mac: System Data, Xcode DerivedData, node_modules, Docker, large files and more.",
    }),
  component: GuidesIndex,
});

function GuidesIndex() {
  return (
    <PageShell>
      <ArticleHero
        eyebrow="Guides"
        title="Get your Mac's disk space back."
        intro="Step-by-step guides to finding what fills your disk and cleaning it up safely, with or without MacDissect."
      />
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <Stagger as="ul" className="space-y-4" gap={0.06}>
          {guides.map((g) => (
            <StaggerItem as="li" key={g.slug}>
              <Link
                to="/guides/$slug"
                params={{ slug: g.slug }}
                className="group block rounded-3xl border border-ink/10 bg-cream p-7 transition-shadow hover:shadow-[0_24px_48px_-24px_rgba(25,25,37,0.35)]"
              >
                <h2 className="font-display text-xl font-bold">{g.title}</h2>
                <p className="mt-2 text-ink/65">{g.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
                  Read guide
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <h2 className="mt-16 font-display text-2xl font-extrabold tracking-tight">
          Comparing disk tools?
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {comparisons.map((c) => (
            <li key={c.slug}>
              <Link
                to="/compare/$slug"
                params={{ slug: c.slug }}
                className="block rounded-2xl border border-ink/10 bg-cream px-5 py-4 font-semibold hover:bg-cream/60"
              >
                MacDissect vs {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
