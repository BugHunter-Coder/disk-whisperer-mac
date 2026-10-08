import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ArticleHero } from "@/components/site/ArticleCta";
import { PageShell } from "@/components/site/SiteFooter";
import { Stagger, StaggerItem } from "@/components/site/motion";
import { posts } from "@/components/landing/blog";
import { pageHead, SITE_NAME, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    pageHead({
      path: "/blog",
      title: "Mac & iOS Update Blog: Storage Impact of Every Release – MacDissect",
      description:
        "What the latest iOS and macOS updates change, and what they do to your Mac's disk space: macOS 27 Golden Gate, iOS 27, Apple Intelligence storage and more.",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${SITE_NAME} Blog`,
          url: `${SITE_URL}/blog`,
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.published,
          })),
        },
      ],
    }),
  component: BlogIndex,
});

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

function BlogIndex() {
  const sorted = [...posts].sort((a, b) => b.published.localeCompare(a.published));
  return (
    <PageShell>
      <ArticleHero
        eyebrow="Blog"
        title="What every Apple update does to your disk."
        intro="New iOS and macOS releases, what they change, and how much space they take, with the steps to get it back."
      />
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <Stagger as="ul" className="space-y-4" gap={0.06}>
          {sorted.map((p) => (
            <StaggerItem as="li" key={p.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block rounded-3xl border border-ink/10 bg-cream p-7 transition-shadow hover:shadow-[0_24px_48px_-24px_rgba(25,25,37,0.35)]"
              >
                <p className="text-xs font-bold tracking-widest text-ink/45 uppercase">
                  {p.tag} · <time dateTime={p.published}>{formatDate(p.published)}</time>
                </p>
                <h2 className="mt-2 font-display text-xl font-bold">{p.title}</h2>
                <p className="mt-2 text-ink/65">{p.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
                  Read post
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </PageShell>
  );
}
