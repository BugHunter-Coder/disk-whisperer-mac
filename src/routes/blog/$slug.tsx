import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArticleCta, ArticleHero, proseClass } from "@/components/site/ArticleCta";
import { PageShell } from "@/components/site/SiteFooter";
import { findPost, posts } from "@/components/landing/blog";
import { findGuide } from "@/components/landing/guides";
import { articleJsonLd, faqJsonLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = findPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const path = `/blog/${loaderData.slug}`;
    const head = pageHead({
      path,
      title: loaderData.metaTitle,
      description: loaderData.description,
      jsonLd: [
        articleJsonLd({
          path,
          title: loaderData.title,
          description: loaderData.description,
          published: loaderData.published,
          updated: loaderData.updated,
          type: "BlogPosting",
        }),
        faqJsonLd(loaderData.faqs),
      ],
    });
    return {
      ...head,
      meta: [
        ...head.meta,
        { property: "article:published_time", content: loaderData.published },
        { property: "article:modified_time", content: loaderData.updated },
        { property: "article:tag", content: loaderData.tag },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const guides = post.relatedGuides.map(findGuide).filter((g) => g !== undefined);

  return (
    <PageShell>
      <ArticleHero
        eyebrow={
          <>
            <Link to="/blog" className="hover:text-ink">
              Blog
            </Link>{" "}
            · {post.tag}
          </>
        }
        title={post.title}
        intro={post.intro}
      />
      <article className="mx-auto max-w-3xl px-6 pb-16">
        <p className="-mt-4 mb-10 text-sm text-ink/45">
          Published <time dateTime={post.published}>{post.published}</time>
          {post.updated !== post.published && (
            <>
              {" "}
              · Updated <time dateTime={post.updated}>{post.updated}</time>
            </>
          )}
        </p>
        <div className="space-y-12">
          {post.sections.map((s) => (
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

          <section>
            <h2 className="font-display text-2xl font-extrabold tracking-tight">Quick answers</h2>
            <dl className={`mt-4 ${proseClass}`}>
              {post.faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-bold text-ink">{f.q}</dt>
                  <dd className="mt-1">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <ArticleCta body={post.cta} />

        <section className="mt-10 text-sm text-ink/55">
          <h2 className="font-bold text-ink/70">Sources</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {post.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:text-ink hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <nav aria-label="Keep reading" className="mt-12 border-t border-ink/10 pt-10">
          <h2 className="font-display text-xl font-bold">Keep reading</h2>
          <ul className="mt-4 space-y-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="font-semibold text-ink/75 underline-offset-4 hover:text-ink hover:underline"
                >
                  {p.title}
                </Link>
              </li>
            ))}
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  to="/guides/$slug"
                  params={{ slug: g.slug }}
                  className="font-semibold text-ink/75 underline-offset-4 hover:text-ink hover:underline"
                >
                  Guide: {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </PageShell>
  );
}
