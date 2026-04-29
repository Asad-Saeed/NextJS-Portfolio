import Skeleton from "./Skeleton";

const BannerSkeleton = () => {
  return (
    <section
      aria-label="Loading hero"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "var(--ds-bg)" }}
    >
      {/* Atmospheric gradient mesh — softer than the real Banner */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(900px 500px at 12% 10%, rgba(10, 114, 239, 0.12), transparent 60%),
            radial-gradient(700px 400px at 88% 18%, rgba(222, 29, 141, 0.07), transparent 65%),
            radial-gradient(600px 400px at 60% 100%, rgba(255, 91, 79, 0.06), transparent 60%)
          `,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-6 pb-8 sm:pt-8 sm:pb-10">
        {/* Eyebrow row */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-6 w-36" pill />
          <Skeleton className="hidden sm:block h-3 w-24" />
        </div>

        {/* Hero grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto] gap-8 xl:gap-10 items-center">
          {/* Left — display headline + designation + typewriter + CTAs */}
          <div className="min-w-0 space-y-4">
            <Skeleton className="h-10 sm:h-14 w-3/4" />
            <Skeleton className="h-10 sm:h-14 w-2/3" />
            <div className="pt-2">
              <Skeleton className="h-5 w-2/3" />
            </div>
            <Skeleton className="h-4 w-44 mt-4" />
            <div className="flex flex-wrap gap-2.5 pt-3">
              <Skeleton className="h-9 w-32" pill />
              <Skeleton className="h-9 w-32" pill />
            </div>
          </div>

          {/* Right — code card placeholder (xl+ only) */}
          <div className="hidden xl:block w-[360px] lg:w-[400px]">
            <div
              className="rounded-xl overflow-hidden p-4 flex flex-col gap-2.5"
              style={{
                backgroundColor: "var(--ds-surface)",
                boxShadow: "var(--ds-shadow-border)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-2.5 w-12" />
                <Skeleton className="h-2.5 w-16" />
              </div>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-3" style={{ width: `${50 + ((i * 17) % 40)}%` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Stats — 3-cell grid */}
        <div
          className="mt-8 sm:mt-12 lg:mt-14 grid grid-cols-3 rounded-xl overflow-hidden"
          style={{
            backgroundColor: "var(--ds-surface)",
            boxShadow: "var(--ds-shadow-border)",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="px-3 py-4 sm:px-6 sm:py-6 lg:px-7 lg:py-7 flex flex-col gap-3"
              style={{
                boxShadow: i > 0 ? "inset 1px 0 0 0 var(--ds-border-shadow)" : undefined,
              }}
            >
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 sm:h-10 w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerSkeleton;
