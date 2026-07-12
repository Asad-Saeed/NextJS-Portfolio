import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiClock, FiCalendar } from "react-icons/fi";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const ACCENTS = ["#3291ff", "#ff4d8d", "#ff5b4f", "#00c864"];

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const accent = ACCENTS[index % ACCENTS.length];
  const tags = post.post_tags?.slice(0, 3) ?? [];

  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`Read "${post.title}"`}
      className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{
        backgroundColor: "var(--ds-surface)",
        boxShadow: "var(--ds-shadow-border)",
      }}
    >
      {/* Cover image — fixed height, hard bottom edge */}
      {post.cover_image_url ? (
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: 180,
            backgroundColor: "var(--ds-surface-subtle)",
          }}
        >
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* Subtle top-to-bottom dark scrim for contrast only — doesn't bleed into card body */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.04) 60%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>
      ) : (
        /* Accent bar when no cover image */
        <div className="w-full" style={{ height: 4, backgroundColor: accent }} aria-hidden />
      )}

      {/* Card body */}
      <div className="p-5 flex flex-col gap-3">
        {/* Title — max 2 lines */}
        <h2
          className="text-[15px] font-semibold leading-snug line-clamp-2"
          style={{ color: "var(--ds-fg)", letterSpacing: "-0.02em" }}
        >
          {post.title}
        </h2>

        {/* Excerpt — max 2 lines */}
        {post.excerpt && (
          <p
            className="text-[13px] leading-relaxed line-clamp-2"
            style={{ color: "var(--ds-fg-secondary)" }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Tags — below excerpt */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t.id}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide"
                style={{
                  backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
                  color: accent,
                  border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                }}
              >
                <span
                  aria-hidden
                  className="inline-block w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: accent }}
                />
                {t.tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer: date · read time · read arrow */}
        <div
          className="mt-auto pt-3 flex items-center justify-between gap-2"
          style={{ borderTop: "1px solid var(--ds-border-shadow)" }}
        >
          <div className="flex items-center gap-3">
            {post.published_at && (
              <span
                className="flex items-center gap-1 text-[10px] font-mono tracking-wide"
                style={{ color: "var(--ds-fg-muted)" }}
              >
                <FiCalendar size={9} aria-hidden />
                {formatDate(post.published_at)}
              </span>
            )}
            <span
              className="flex items-center gap-1 text-[10px] font-mono tracking-wide"
              style={{ color: "var(--ds-fg-muted)" }}
            >
              <FiClock size={9} aria-hidden />
              {post.reading_time} min read
            </span>
          </div>
          <span
            className="inline-flex items-center gap-0.5 text-[12px] font-semibold transition-colors"
            style={{ color: accent }}
          >
            Read
            <FiArrowUpRight
              size={13}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
