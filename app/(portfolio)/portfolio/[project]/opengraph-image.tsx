import { ImageResponse } from "next/og";
import { getProfileBySlug } from "@/lib/queries/profile";
import { getProjectBySlug } from "@/lib/queries/portfolio";
import { getPortfolioSlug } from "@/lib/portfolio-slug";
import type { ProjectTechnology } from "@/types";

export const alt = "Case Study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

const BG = "#0a0a0a";
const SURFACE = "#171717";
const FG = "#ededed";
const FG_2 = "#a1a1a1";
const FG_3 = "#5a5a5a";
const BORDER = "rgba(255,255,255,0.10)";
const ACCENT = "#3291ff";
const BADGE_BG = "#0a1f3d";
const BADGE_FG = "#7cb8ff";

export default async function Image({ params }: { params: Promise<{ project: string }> }) {
  const { project } = await params;
  const slug = getPortfolioSlug();
  const profileData = await getProfileBySlug(slug);
  if (!profileData) {
    return new ImageResponse(<div />, { ...size });
  }
  const projectData = await getProjectBySlug(profileData.user_id, project);

  const projectName = projectData?.project_name || "Project";
  const description = projectData?.project_detail || projectData?.challenge || "";
  const projectImage = projectData?.image_url;
  const techs = (projectData?.project_technologies || [])
    .slice(0, 5)
    .map((t: ProjectTechnology) => t.tech_name);
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
      {/* Atmospheric gradient mesh */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "radial-gradient(900px 500px at 12% 10%, rgba(10,114,239,0.18), transparent 60%), radial-gradient(700px 400px at 88% 18%, rgba(222,29,141,0.10), transparent 65%), radial-gradient(600px 400px at 60% 100%, rgba(255,91,79,0.08), transparent 60%)",
        }}
      />

      {/* Top eyebrow row */}
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
        Case Study
      </div>

      {/* Project image + content row */}
      <div
        style={{
          display: "flex",
          gap: 48,
          flex: 1,
          alignItems: "center",
        }}
      >
        {projectImage && (
          <div
            style={{
              width: 380,
              height: 280,
              borderRadius: 14,
              overflow: "hidden",
              display: "flex",
              flexShrink: 0,
              background: SURFACE,
              boxShadow: `0 0 0 1px ${BORDER}`,
            }}
          >
            <img
              src={projectImage}
              width={380}
              height={280}
              alt={projectName}
              style={{ objectFit: "cover" }}
            />
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: projectName.length > 20 ? 56 : 68,
              fontWeight: 700,
              color: FG,
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            {projectName}
          </div>

          {description && (
            <div
              style={{
                fontSize: 22,
                color: FG_2,
                lineHeight: 1.4,
                letterSpacing: "-0.005em",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description.length > 140 ? description.slice(0, 140) + "…" : description}
            </div>
          )}

          {techs.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 6,
              }}
            >
              {techs.map((tech) => (
                <div
                  key={tech}
                  style={{
                    fontSize: 16,
                    color: BADGE_FG,
                    background: BADGE_BG,
                    borderRadius: 9999,
                    padding: "5px 14px",
                    display: "flex",
                    letterSpacing: "-0.005em",
                    fontWeight: 500,
                    boxShadow: `0 0 0 1px ${BORDER}`,
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom author bar */}
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
        {authorImage ? (
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
        ) : null}
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
            fontSize: 18,
            color: FG_3,
            display: "flex",
            letterSpacing: "0.05em",
            marginLeft: "auto",
          }}
        >
          /portfolio/{project}
        </div>
      </div>
    </div>,
    { ...size }
  );
}
