import { ImageResponse } from "next/og";
import { getProfileBySlug } from "@/lib/queries/profile";

export const alt = "Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);

  const name = profileData?.name || "Portfolio";
  const designation = profileData?.designation || "Developer";
  const profileImage = profileData?.profile_image_url;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "linear-gradient(135deg, #060d16 0%, #0b1726 40%, #0f1e33 80%, #142440 100%)",
        padding: "80px 100px",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      {/* Decorative accent dots */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 80,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#00e5ff",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 110,
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "#00e5ff",
          opacity: 0.6,
          display: "flex",
        }}
      />

      {/* Left: text content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          flex: 1,
          maxWidth: 700,
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: "#00e5ff",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 16,
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
          Portfolio
        </div>

        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "#e8ecf1",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {name}
        </div>

        <div
          style={{
            fontSize: 30,
            color: "#9aacbe",
            lineHeight: 1.3,
            fontWeight: 400,
          }}
        >
          {designation}
        </div>
      </div>

      {/* Right: profile image */}
      {profileImage ? (
        <div
          style={{
            width: 360,
            height: 360,
            borderRadius: "50%",
            border: "8px solid #00e5ff",
            overflow: "hidden",
            display: "flex",
            flexShrink: 0,
            boxShadow: "0 0 60px rgba(0, 229, 255, 0.3)",
          }}
        >
          {/* next/og uses Satori which only supports plain <img>, not next/image */}
          <img
            src={profileImage}
            width={360}
            height={360}
            alt={name}
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
        </div>
      ) : (
        <div
          style={{
            width: 360,
            height: 360,
            borderRadius: "50%",
            border: "8px solid #00e5ff",
            background: "#0b1726",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 140,
            color: "#9aacbe",
            fontWeight: 700,
            boxShadow: "0 0 60px rgba(0, 229, 255, 0.3)",
          }}
        >
          {(name[0] || "?").toUpperCase()}
        </div>
      )}
    </div>,
    { ...size }
  );
}
