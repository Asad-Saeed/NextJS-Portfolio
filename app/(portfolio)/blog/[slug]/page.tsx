export const revalidate = 3600;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getProfileBySlug } from "@/lib/queries/profile";
import { getPostBySlug, getRelatedPosts } from "@/lib/queries/blog";
import BlogCard from "@/components/HomeComponents/Blog/BlogCard";
import { getSiteUrl } from "@/lib/site-url";
import { getPortfolioSlug } from "@/lib/portfolio-slug";
import { safeJsonLd } from "@/lib/json-ld";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiClock, FiCalendar, FiTag } from "react-icons/fi";
import CoverImage from "@/components/Blog/CoverImage";
import ArticleContent from "@/components/Blog/ArticleContent";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const portfolioSlug = getPortfolioSlug();
  const [profileData, post] = await Promise.all([
    getProfileBySlug(portfolioSlug),
    getPostBySlug(slug),
  ]);
  if (!profileData || !post) return {};

  const name = profileData.name || "Portfolio";
  const siteUrl = getSiteUrl();
  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt;
  const tags = post.post_tags.map((t) => t.tag);
  const url = `${siteUrl}/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: tags.length ? tags : undefined,
    authors: [{ name, url: siteUrl }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${title} | ${name}`,
      description,
      url,
      type: "article",
      siteName: `${name} — Portfolio`,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: [siteUrl],
      tags,
      ...(post.cover_image_url && {
        images: [{ url: post.cover_image_url, alt: post.title, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${name}`,
      description,
      ...(post.cover_image_url && { images: [post.cover_image_url] }),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const portfolioSlug = getPortfolioSlug();

  const [profileData, post] = await Promise.all([
    getProfileBySlug(portfolioSlug),
    getPostBySlug(slug),
  ]);

  if (!profileData || !post) notFound();

  const siteUrl = getSiteUrl();
  const name = profileData.name || "Portfolio";
  const tags = post.post_tags.map((t) => t.tag);
  const relatedPosts = await getRelatedPosts(post.id, tags, 3);
  const wordCount = post.content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name, item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: profileData.blog_heading || "Blog",
        item: `${siteUrl}/blog`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  };

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image_url
      ? { "@type": "ImageObject", url: post.cover_image_url, width: 1200, height: 630 }
      : undefined,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at,
    wordCount,
    keywords: tags.join(", "),
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
    author: {
      "@type": "Person",
      name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name,
      url: siteUrl,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(blogPostingJsonLd) }}
      />

      {/* Back link */}
      <div className="px-5 sm:px-8 pt-5 sm:pt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm transition-colors hover:underline"
          style={{ color: "var(--ds-fg-secondary)" }}
        >
          <FiArrowLeft size={14} aria-hidden />
          All Posts
        </Link>
      </div>

      {/* Cover image */}
      {post.cover_image_url && <CoverImage src={post.cover_image_url} alt={post.title} />}

      {/* Article */}
      <article
        className="relative px-5 sm:px-8 pb-10"
        style={{ marginTop: post.cover_image_url ? "2.5rem" : "1.5rem", zIndex: 1 }}
      >
        {/* Heading */}
        <h1
          className="font-bold leading-tight mb-4"
          style={{
            color: "var(--ds-fg)",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            letterSpacing: "-0.04em",
          }}
        >
          {post.title}
        </h1>

        {/* Tags — below title */}
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <FiTag size={12} aria-hidden style={{ color: "var(--ds-fg-muted)" }} />
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-mono-label"
                style={{
                  backgroundColor: "rgba(50,145,255,0.10)",
                  color: "#7cb8ff",
                  boxShadow: "var(--ds-shadow-border-light)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta row */}
        <div
          className="flex flex-wrap items-center gap-4 mb-8 pb-6"
          style={{
            color: "var(--ds-fg-muted)",
            boxShadow: "inset 0 -1px 0 0 var(--ds-border-shadow)",
          }}
        >
          {post.published_at && (
            <span className="flex items-center gap-1.5 text-sm">
              <FiCalendar size={13} aria-hidden />
              <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            </span>
          )}
          <span className="flex items-center gap-1.5 text-sm">
            <FiClock size={13} aria-hidden />
            {post.reading_time} min read
          </span>
          <span className="text-sm">By {name}</span>
        </div>

        {/* Excerpt (lead paragraph) */}
        {post.excerpt && (
          <p
            className="text-base sm:text-lg leading-relaxed mb-8 font-medium"
            style={{ color: "var(--ds-fg-secondary)", letterSpacing: "-0.01em" }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Article body — stored as sanitized HTML from the WYSIWYG editor */}
        <ArticleContent html={post.content} />

        {/* Author footer */}
        <div
          className="mt-10 pt-6 flex items-center gap-4"
          style={{ boxShadow: "inset 0 1px 0 0 var(--ds-border-shadow)" }}
        >
          {profileData.profile_image_url && (
            <div
              className="relative shrink-0 rounded-full overflow-hidden"
              style={{
                width: 56,
                height: 56,
                boxShadow: "var(--ds-shadow-border), 0 0 0 2px var(--ds-link)",
              }}
            >
              <Image
                src={profileData.profile_image_url}
                alt={name}
                fill
                className="object-cover object-[center_30%]"
              />
            </div>
          )}
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--ds-fg)" }}>
              {name}
            </p>
            <p className="text-xs" style={{ color: "var(--ds-fg-muted)" }}>
              {profileData.designation}
            </p>
          </div>
          <Link
            href="/blog"
            className="ml-auto text-sm font-medium hover:underline"
            style={{ color: "var(--ds-link)" }}
          >
            More posts →
          </Link>
        </div>
      </article>

      {profileData.show_related_posts !== false && relatedPosts.length > 0 && (
        <section
          aria-labelledby="related-posts-heading"
          className="px-5 sm:px-8 py-8 sm:py-10"
          style={{ borderTop: "1px solid var(--ds-border-shadow)" }}
        >
          <h2
            id="related-posts-heading"
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: "var(--ds-fg-muted)" }}
          >
            {profileData.related_posts_eyebrow || "Related Posts"}
          </h2>
          <p
            className="text-xl sm:text-2xl font-bold mb-6"
            style={{ color: "var(--ds-fg)", letterSpacing: "-0.03em" }}
          >
            {profileData.related_posts_heading || "Keep Reading"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedPosts.map((rp, i) => (
              <BlogCard key={rp.id} post={rp} index={i} />
            ))}
          </div>
        </section>
      )}

      <Footer data={profileData} />
    </div>
  );
}
