export default function BlogLoading() {
  return (
    <div>
      {/* Banner skeleton */}
      <div
        className="relative w-full"
        style={{ minHeight: 280, backgroundColor: "var(--ds-surface)" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16 flex flex-col gap-5">
          <div className="ds-skeleton h-3 w-16 rounded-full" />
          <div className="ds-skeleton h-10 w-64 sm:w-96" />
          <div className="ds-skeleton h-4 w-48" />
        </div>
      </div>

      {/* Section header skeleton */}
      <section className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3 sm:mb-4">
          <div>
            <div className="ds-skeleton h-3 w-14 mb-2.5 rounded-full" />
            <div className="ds-skeleton h-7 w-36" />
          </div>
          <div className="hidden sm:flex flex-col gap-1.5 max-w-xs">
            <div className="ds-skeleton h-3 w-full" />
            <div className="ds-skeleton h-3 w-3/4" />
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: "var(--ds-surface)",
                boxShadow: "var(--ds-shadow-border)",
              }}
            >
              <div className="ds-skeleton w-full" style={{ aspectRatio: "16 / 6" }} />
              <div className="p-4 flex flex-col gap-3">
                <div className="ds-skeleton h-5 w-3/4" />
                <div className="ds-skeleton h-3 w-full" />
                <div className="ds-skeleton h-3 w-5/6" />
                <div className="flex items-center justify-between pt-2">
                  <div className="ds-skeleton h-3 w-24" />
                  <div className="ds-skeleton h-3 w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
