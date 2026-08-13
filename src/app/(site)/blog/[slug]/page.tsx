import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, CtaStrip } from "@/components/site/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { getPostBySlug } from "@/lib/posts";
import { ContentBlocks } from "@/components/site/ContentBlocks";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found | Koolacube" };

  const description =
    post.excerpt || `${post.title} — insights from Koolacube cold room hire & sales.`;

  return {
    alternates: { canonical: `/blog/${post.slug}` },
    title: `${post.title} | Koolacube Blog`,
    description,
    openGraph: {
      type: "article",
      title: post.title,
      description,
      images: post.cover_image
        ? [{ url: post.cover_image }]
        : [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const exHireLink = {
    label: "Second-Hand & Ex-Hire Cold Rooms for Sale",
    href: "/buy/ex-hire",
  };
  const shouldLinkToExHire =
    post.slug === "cold-room-vs-freezer-room-which-do-you-need" &&
    !post.related_links.some((link) => link.href === exHireLink.href);
  const relatedLinks = shouldLinkToExHire
    ? [...post.related_links, exHireLink]
    : post.related_links;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.cover_image || undefined,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: "Koolacube" },
    publisher: { "@type": "Organization", name: "Koolacube" },
    mainEntityOfPage: `/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      <PageHero
        eyebrow={post.category || "Blog"}
        crumb="Blog"
        title={post.title}
        intro={post.excerpt || undefined}
      />

      <article className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          {(post.date || post.read_time) && (
            <div className="mb-8 flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {post.date && <span>{post.date}</span>}
              {post.read_time && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.read_time}
                </span>
              )}
            </div>
          )}

          {post.cover_image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover_image}
              alt={post.title}
              className="mb-10 w-full rounded-lg border border-border object-cover"
            />
          )}

          <div className="space-y-10">
            {post.body.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="mb-4 font-display text-2xl font-bold leading-tight text-foreground md:text-3xl">
                    {section.heading}
                  </h2>
                )}
                <ContentBlocks blocks={section.blocks} />
              </section>
            ))}
          </div>

          {relatedLinks.length > 0 && (
            <div className="mt-14 rounded-lg border border-cold-blue/30 bg-cold-blue/5 p-6 md:p-8">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-cold-blue">
                Related to this article
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-white px-4 py-3 text-sm font-semibold text-foreground transition hover:border-cold-blue hover:text-cold-blue"
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 shrink-0 text-cold-blue transition group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-14 border-t border-border pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cold-blue transition hover:text-cold-blue/80"
            >
              <ArrowLeft className="h-4 w-4" /> Back to all articles
            </Link>
          </div>
        </div>
      </article>

      <CtaStrip />
    </>
  );
}
