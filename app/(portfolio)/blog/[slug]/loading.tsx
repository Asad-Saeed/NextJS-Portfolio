export default function BlogPostLoading() {
  return (
    <div className="px-5 sm:px-8 pt-8 pb-10">
      {/* Back link skeleton */}
      <div className="ds-skeleton h-4 w-20 mb-6 rounded-full" />

      {/* Cover skeleton */}
      <div className="ds-skeleton w-full mb-8 rounded-xl" style={{ aspectRatio: "21 / 7" }} />

      {/* Tags */}
      <div className="flex gap-2 mb-4">
        <div className="ds-skeleton h-5 w-16 rounded-full" />
        <div className="ds-skeleton h-5 w-20 rounded-full" />
      </div>

      {/* Title */}
      <div className="ds-skeleton h-10 w-3/4 mb-2" />
      <div className="ds-skeleton h-10 w-1/2 mb-6" />

      {/* Meta */}
      <div
        className="flex gap-4 mb-8 pb-6"
        style={{ boxShadow: "inset 0 -1px 0 0 var(--ds-border-shadow)" }}
      >
        <div className="ds-skeleton h-4 w-28" />
        <div className="ds-skeleton h-4 w-20" />
      </div>

      {/* Excerpt */}
      <div className="ds-skeleton h-5 w-full mb-2" />
      <div className="ds-skeleton h-5 w-5/6 mb-8" />

      {/* Body */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`ds-skeleton h-4 ${i % 3 === 2 ? "w-3/4" : "w-full"}`} />
        ))}
      </div>
    </div>
  );
}
