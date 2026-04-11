import { ImageResponse } from "next/og";
import { getProfileBySlug } from "@/lib/queries/profile";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let imageUrl: string | undefined;
  try {
    const profile = await getProfileBySlug(slug);
    imageUrl = profile?.profile_image_url || undefined;
  } catch {
    imageUrl = undefined;
  }

  return new ImageResponse(
    imageUrl ? (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
        }}
      >
        <img src={imageUrl} width={32} height={32} style={{ objectFit: "cover" }} alt="" />
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
