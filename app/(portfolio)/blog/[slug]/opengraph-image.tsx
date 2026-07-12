import { ImageResponse } from "next/og";
import { getProfileBySlug } from "@/lib/queries/profile";
import { getPostBySlug } from "@/lib/queries/blog";
import { getPortfolioSlug } from "@/lib/portfolio-slug";
import type { PostTag } from "@/types";

export const alt = "Blog Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0a0a0a";
const SURFACE = "#171717";
const FG = "#ededed";
const FG_2 = "#a1a1a1";
const FG_3 = "#5a5a5a";
const BORDER = "rgba(255,255,255,0.10)";
const ACCENT = "#3291ff";
const BADGE_BG = "#0a1f3d";
const BADGE_FG = "#7cb8ff";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const portfolioSlug = getPortfolioSlug();
  const profileData = await getProfileBySlug(portfolioSlug);
  if (!profileData) return new ImageResponse(<div />, { ...size });

  const post = await getPostBySlug(slug);
  const title = post?.title || "Blog Post";
  const excerpt = post?.excerpt || "";
  const cover = post?.cover_image_url;
  const tags = (post?.post_tags ?? []).slice(0, 4).map((t: PostTag) => t.tag);
  const authorName = profileData.name || "Portfolio";
  const authorImage = profileData.profile_image_url;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: BG,
        padding: "60px 80px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Gradient mesh */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "radial-gradient(900px 500px at 12% 10%, rgba(10,114,239,0.18), transparent 60%), radial-gradient(700px 400px at 88% 18%, rgba(222,29,141,0.10), transparent 65%), radial-gradient(600px 400px at 60% 100%, rgba(255,91,79,0.08), transparent 60%)",
        }}
      />

      {/* Eyebrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 18,
          color: FG_2,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 500,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 9999,
            background: ACCENT,
            display: "flex",
            boxShadow: `0 0 12px -2px ${ACCENT}`,
          }}
        />
        Blog Post
      </div>

      {/* Cover + content row */}
      <div style={{ display: "flex", gap: 48, flex: 1, alignItems: "center" }}>
        {cover && (
          <div
            style={{
              width: 380,
              height: 260,
              borderRadius: 14,
              overflow: "hidden",
              display: "flex",
              flexShrink: 0,
              background: SURFACE,
              boxShadow: `0 0 0 1px ${BORDER}`,
            }}
          >
            <img src={cover} width={380} height={260} alt={title} style={{ objectFit: "cover" }} />
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
          {/* Title */}
          <div
            style={{
              fontSize: title.length > 40 ? 48 : title.length > 25 ? 56 : 66,
              fontWeight: 700,
              color: FG,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
            }}
          >
            {title.length > 60 ? title.slice(0, 60) + "…" : title}
          </div>

          {/* Excerpt */}
          {excerpt && (
            <div
              style={{
                fontSize: 21,
                color: FG_2,
                lineHeight: 1.45,
                letterSpacing: "-0.005em",
              }}
            >
              {excerpt.length > 120 ? excerpt.slice(0, 120) + "…" : excerpt}
            </div>
          )}

          {/* Tag badges */}
          {tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 15,
                    color: BADGE_FG,
                    background: BADGE_BG,
                    borderRadius: 9999,
                    padding: "4px 12px",
                    display: "flex",
                    fontWeight: 500,
                    boxShadow: `0 0 0 1px ${BORDER}`,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Author bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginTop: 28,
          paddingTop: 22,
          borderTop: `1px solid ${BORDER}`,
        }}
      >
        {authorImage && (
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 9999,
              overflow: "hidden",
              display: "flex",
              flexShrink: 0,
              background: SURFACE,
              boxShadow: `0 0 0 1px ${BORDER}`,
            }}
          >
            <img
              src={authorImage}
              width={44}
              height={44}
              alt={authorName}
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
            />
          </div>
        )}
        <div
          style={{
            fontSize: 22,
            color: FG,
            fontWeight: 600,
            display: "flex",
            letterSpacing: "-0.015em",
          }}
        >
          {authorName}
        </div>
        <div
          style={{
            fontSize: 17,
            color: FG_3,
            display: "flex",
            letterSpacing: "0.03em",
            marginLeft: "auto",
          }}
        >
          /blog/{slug}
        </div>
      </div>
    </div>,
    { ...size }
  );
}
