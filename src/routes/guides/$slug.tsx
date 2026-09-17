import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArticleCta, ArticleHero, proseClass } from "@/components/site/ArticleCta";
import { PageShell } from "@/components/site/SiteFooter";
import { findGuide, guides, GUIDES_UPDATED } from "@/components/landing/guides";
import { articleJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const guide = findGuide(params.slug);
    if (!guide) throw notFound();
    return guide;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const path = `/guides/${loaderData.slug}`;
    return pageHead({
      path,
      title: loaderData.metaTitle,
      description: loaderData.description,
      jsonLd: [
        articleJsonLd({
          path,
          title: loaderData.title,
          description: loaderData.description,
          updated: GUIDES_UPDATED,
        }),
      ],
    });
  },
  component: GuidePage,
});

function GuidePage() {
  const guide = Route.useLoaderData();
  const others = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <PageShell>
      <ArticleHero
        eyebrow={
          <Link to="/guides" className="hover:text-ink">
            Guides
          </Link>
        }
        title={guide.title}
        intro={guide.intro}
      />
      <article className="mx-auto max-w-3xl px-6 pb-16">
        <div className="space-y-12">
          {guide.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl font-extrabold tracking-tight">{s.heading}</h2>
              <div className={`mt-4 ${proseClass}`}>
                {s.paragraphs?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.bullets && (
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {s.code && (
                  <pre className="overflow-x-auto rounded-2xl bg-ink px-5 py-4 font-mono text-sm leading-relaxed text-cream">
                    <code>{s.code}</code>
                  </pre>
                )}
              </div>
            </section>
          ))}
        </div>

        <ArticleCta body={guide.cta} />

        <p className="mt-10 text-sm text-ink/45">Last updated {GUIDES_UPDATED}</p>

        <nav aria-label="More guides" className="mt-12 border-t border-ink/10 pt-10">
          <h2 className="font-display text-xl font-bold">More guides</h2>
          <ul className="mt-4 space-y-3">
            {others.map((g) => (
              <li key={g.slug}>
                <Link
                  to="/guides/$slug"
                  params={{ slug: g.slug }}
                  className="font-semibold text-ink/75 underline-offset-4 hover:text-ink hover:underline"
                >
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </PageShell>
  );
}
