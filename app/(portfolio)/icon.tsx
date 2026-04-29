import { ImageResponse } from "next/og";
import { getProfileBySlug } from "@/lib/queries/profile";
import { getPortfolioSlug } from "@/lib/portfolio-slug";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const slug = getPortfolioSlug();

  let imageUrl: string | undefined;
  try {
    const profile = await getProfileBySlug(slug);
    imageUrl = profile?.profile_image_url || undefined;
  } catch {
    imageUrl = undefined;
  }

  return new ImageResponse(
    imageUrl ? (
      <div style={{ display: "flex", width: 32, height: 32 }}>
        <img
          src={imageUrl}
          width={32}
          height={32}
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            objectFit: "cover",
          }}
          alt="Fav Icon"
        />
      </div>
    ) : (
      <div
        style={{
          width: 32,
          height: 32,
          background: "black",
          borderRadius: "50%",
        }}
      />
    ),
    { ...size }
  );
}
