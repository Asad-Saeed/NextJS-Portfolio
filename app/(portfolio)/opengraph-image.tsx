import { ImageResponse } from "next/og";
import { getProfileBySlug } from "@/lib/queries/profile";
import { getPortfolioSlug } from "@/lib/portfolio-slug";

export const alt = "Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-dynamic";

const BG = "#0a0a0a";
const FG = "#ededed";
const FG_2 = "#a1a1a1";
const FG_3 = "#5a5a5a";
const BORDER = "rgba(255,255,255,0.10)";
const ACCENT = "#3291ff";
const ACCENT_2 = "#ff4d8d";
const ACCENT_3 = "#ff5b4f";

export default async function Image() {
  const slug = getPortfolioSlug();
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
        flexDirection: "column",
        background: BG,
        padding: "72px 88px",
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
        Portfolio
        <span style={{ color: FG_3, display: "flex" }}>·</span>
        <span style={{ color: FG_3, display: "flex" }}>v1 · 2026</span>
      </div>

      {/* Main row: text left, avatar right */}
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          gap: 60,
          marginTop: 36,
        }}
      >
        {/* Left — name + designation */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: FG,
              lineHeight: 0.95,
              letterSpacing: "-0.055em",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 32,
              color: FG_2,
              lineHeight: 1.25,
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            {designation}
          </div>
        </div>

        {/* Right — avatar in shadow-bordered card */}
        {profileImage ? (
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: 20,
              background: "#171717",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: `0 0 0 1px ${BORDER}`,
              flexShrink: 0,
            }}
          >
            <img
              src={profileImage}
              width={280}
              height={280}
              alt={name}
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
            />
          </div>
        ) : (
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: 20,
              background: "#171717",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 130,
              color: FG_2,
              fontWeight: 700,
              boxShadow: `0 0 0 1px ${BORDER}`,
            }}
          >
            {(name[0] || "?").toUpperCase()}
          </div>
        )}
      </div>

      {/* Bottom row: workflow accent dots + URL */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 36,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {[ACCENT, ACCENT_2, ACCENT_3].map((c, i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: c,
                display: "flex",
              }}
            />
          ))}
        </div>
        <div
          style={{
            fontSize: 18,
            color: FG_3,
            letterSpacing: "0.05em",
            fontWeight: 500,
            display: "flex",
          }}
        >
          /
        </div>
      </div>
    </div>,
    { ...size }
  );
}
