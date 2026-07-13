export const revalidate = 3600;

import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Banner from "@/components/HomeComponents/Banner";
import SectionHeader from "@/components/Common/SectionHeader";
import BlogCard from "@/components/HomeComponents/Blog/BlogCard";
import { getProfileBySlug } from "@/lib/queries/profile";
import { getPublishedPosts, getPublishedPostCount } from "@/lib/queries/blog";
import { getSiteUrl } from "@/lib/site-url";
import { getPortfolioSlug } from "@/lib/portfolio-slug";
import { safeJsonLd } from "@/lib/json-ld";
import { parseCodeCardStack } from "@/lib/code-card-stack";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PAGE_SIZE = 9;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const slug = getPortfolioSlug();
  const profileData = await getProfileBySlug(slug);
  if (!profileData) return {};
  const name = profileData.name || "Portfolio";
  const title = profileData.blog_heading || "Blog";
  const description =
    profileData.blog_description || `Articles, tutorials and insights by ${name}.`;
  const { page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page ?? "1", 10));
  const canonical = pageNum > 1 ? `/blog?page=${pageNum}` : "/blog";
  const siteUrl = getSiteUrl();

  return {
    title,
    description,
    alternates: {
      canonical,
      types: { "application/rss+xml": `${siteUrl}/blog/rss.xml` },
    },
    openGraph: {
      title: `${title} | ${name}`,
      description,
      url: `${siteUrl}${canonical}`,
      type: "website",
      siteName: `${name} — Portfolio`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${name}`,
      description,
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const slug = getPortfolioSlug();
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const { page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page ?? "1", 10));

  const [posts, total] = await Promise.all([
    getPublishedPosts({ page: pageNum, pageSize: PAGE_SIZE }),
    getPublishedPostCount(),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const siteUrl = getSiteUrl();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: profileData.name || "Portfolio", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: profileData.blog_heading || "Blog",
        item: `${siteUrl}/blog`,
      },
    ],
  };

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: profileData.blog_heading || "Blog",
    description: profileData.blog_description || "",
    url: `${siteUrl}/blog`,
    author: {
      "@type": "Person",
      name: profileData.name,
      url: siteUrl,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${siteUrl}/blog/${p.slug}`,
      datePublished: p.published_at,
      image: p.cover_image_url || undefined,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(blogJsonLd) }}
      />

      <Banner
        data={profileData}
        heading={profileData.blog_heading || "Blog"}
        name={profileData.name}
        designation={profileData.designation}
        stack={parseCodeCardStack(profileData.code_card_stack)}
        availabilityStatus={profileData.availability_status}
      />

      <section aria-labelledby="blog-heading" className="px-5 sm:px-8 py-4 sm:py-5">
        <SectionHeader
          id="blog-heading"
          eyebrow={profileData.blog_eyebrow || "Writing"}
          title={profileData.blog_heading || "Blog"}
          description={profileData.blog_description}
        />

        {posts.length === 0 ? (
          <div
            className="rounded-xl p-12 text-center"
            style={{ backgroundColor: "var(--ds-surface)", boxShadow: "var(--ds-shadow-border)" }}
          >
            <p className="text-sm" style={{ color: "var(--ds-fg-secondary)" }}>
              No posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {posts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav aria-label="Blog pagination" className="flex items-center justify-center gap-2">
                {pageNum > 1 && (
                  <Link
                    href={pageNum === 2 ? "/blog" : `/blog?page=${pageNum - 1}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors"
                    style={{
                      backgroundColor: "var(--ds-surface)",
                      boxShadow: "var(--ds-shadow-border)",
                      color: "var(--ds-fg-secondary)",
                    }}
                  >
                    <FiChevronLeft size={14} aria-hidden />
                    Previous
                  </Link>
                )}
                <span
                  className="px-3 py-1.5 text-sm rounded-lg"
                  style={{
                    backgroundColor: "var(--ds-surface)",
                    boxShadow: "var(--ds-shadow-border)",
                    color: "var(--ds-fg)",
                  }}
                >
                  {pageNum} / {totalPages}
                </span>
                {pageNum < totalPages && (
                  <Link
                    href={`/blog?page=${pageNum + 1}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors"
                    style={{
                      backgroundColor: "var(--ds-surface)",
                      boxShadow: "var(--ds-shadow-border)",
                      color: "var(--ds-fg-secondary)",
                    }}
                  >
                    Next
                    <FiChevronRight size={14} aria-hidden />
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </section>

      <Footer data={profileData} />
    </div>
  );
}
