import { ImageResponse } from "next/og";
import { getProfileBySlug } from "@/lib/queries/profile";
import { getPortfolioSlug } from "@/lib/portfolio-slug";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

function deriveInitials(name: string): string {
  return (
    name
      .split(/\s+/)
      .map((word) => word[0])
      .filter(Boolean)
      .join("")
      .toUpperCase()
      .slice(0, 2) || "AS"
  );
}

export default async function Icon() {
  let initials = "AS";
  try {
    const profile = await getProfileBySlug(getPortfolioSlug());
    if (profile?.name) initials = deriveInitials(profile.name);
  } catch {
    // fall back to "AS" if the lookup fails — favicon must always render.
  }

  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        fontWeight: 700,
        letterSpacing: "-0.05em",
        fontFamily: "system-ui, -apple-system, sans-serif",
        borderRadius: "50%",
      }}
    >
      {initials}
    </div>,
    { ...size }
  );
}
