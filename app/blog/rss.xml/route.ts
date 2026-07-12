export const revalidate = 3600;

import { getProfileBySlug } from "@/lib/queries/profile";
import { getPublishedPosts } from "@/lib/queries/blog";
import { getSiteUrl } from "@/lib/site-url";
import { getPortfolioSlug } from "@/lib/portfolio-slug";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const slug = getPortfolioSlug();
  const siteUrl = getSiteUrl();
  const profile = await getProfileBySlug(slug);

  if (!profile) {
    return new Response("<rss/>", { headers: { "Content-Type": "application/rss+xml" } });
  }

  const posts = await getPublishedPosts({ page: 1, pageSize: 50 });

  const name = profile.name || "Portfolio";
  const blogTitle = profile.blog_heading || `${name} — Blog`;
  const blogDescription = profile.blog_description || `Articles and insights by ${name}.`;
  const feedUrl = `${siteUrl}/blog/rss.xml`;
  const blogUrl = `${siteUrl}/blog`;

  const items = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = post.published_at
        ? new Date(post.published_at).toUTCString()
        : new Date(post.created_at).toUTCString();
      const tags = post.post_tags.map((t) => `<category>${escapeXml(t.tag)}</category>`).join("");

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <description>${escapeXml(post.excerpt || post.title)}</description>
      <author>${escapeXml(profile.email || name)}</author>
      <pubDate>${pubDate}</pubDate>
      ${tags}
      ${post.cover_image_url ? `<enclosure url="${escapeXml(post.cover_image_url)}" type="image/jpeg" length="0"/>` : ""}
    </item>`;
    })
    .join("\n");

  const lastBuildDate =
    posts.length > 0 ? new Date(posts[0].updated_at).toUTCString() : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(blogTitle)}</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>${escapeXml(blogDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
