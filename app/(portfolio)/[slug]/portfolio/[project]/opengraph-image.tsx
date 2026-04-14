import { ImageResponse } from "next/og";
import { getProfileBySlug } from "@/lib/queries/profile";
import { getProjectBySlug } from "@/lib/queries/portfolio";
import type { ProjectTechnology } from "@/types";

export const alt = "Case Study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; project: string }>;
}) {
  const { slug, project } = await params;
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
        background: "linear-gradient(135deg, #060d16 0%, #0b1726 40%, #0f1e33 80%, #142440 100%)",
        padding: "60px 80px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Top label */}
      <div
        style={{
          fontSize: 20,
          color: "#00e5ff",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 40,
            height: 2,
            background: "#00e5ff",
            display: "flex",
          }}
        />
        Case Study
      </div>

      {/* Project image + content row */}
      <div
        style={{
          display: "flex",
          gap: 50,
          flex: 1,
          alignItems: "center",
        }}
      >
        {projectImage && (
          <div
            style={{
              width: 380,
              height: 280,
              borderRadius: 16,
              overflow: "hidden",
              display: "flex",
              flexShrink: 0,
              border: "2px solid rgba(0, 229, 255, 0.3)",
              boxShadow: "0 0 60px rgba(0, 229, 255, 0.2)",
            }}
          >
            {/* next/og uses Satori which only supports plain <img>, not next/image */}
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
            gap: 20,
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: projectName.length > 20 ? 56 : 68,
              fontWeight: 800,
              color: "#e8ecf1",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {projectName}
          </div>

          {description && (
            <div
              style={{
                fontSize: 22,
                color: "#9aacbe",
                lineHeight: 1.4,
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
                gap: 10,
                marginTop: 4,
              }}
            >
              {techs.map((tech) => (
                <div
                  key={tech}
                  style={{
                    fontSize: 18,
                    color: "#00e5ff",
                    background: "rgba(0, 229, 255, 0.08)",
                    border: "1px solid rgba(0, 229, 255, 0.3)",
                    borderRadius: 999,
                    padding: "6px 16px",
                    display: "flex",
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
          marginTop: 30,
          paddingTop: 24,
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {authorImage ? (
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "2px solid #00e5ff",
              overflow: "hidden",
              display: "flex",
              flexShrink: 0,
            }}
          >
            {/* next/og uses Satori which only supports plain <img>, not next/image */}
            <img
              src={authorImage}
              width={48}
              height={48}
              alt={authorName}
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
            />
          </div>
        ) : null}
        <div
          style={{
            fontSize: 22,
            color: "#e8ecf1",
            fontWeight: 600,
            display: "flex",
          }}
        >
          {authorName}
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#9aacbe",
            display: "flex",
          }}
        >
          • Portfolio
        </div>
      </div>
    </div>,
    { ...size }
  );
}
