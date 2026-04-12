import BannerSkeleton from "@/components/Common/BannerSkeleton";

export default function Loading() {
  return (
    <div className="animate-pulse">
      <BannerSkeleton />

      <div className="px-4 sm:px-6 py-6">
        {/* Back link */}
        <div className="h-3 w-28 bg-Green/10 rounded mb-6" />

        {/* Project header card */}
        <div className="card_stylings p-5 sm:p-8 mb-4">
          {/* Image */}
          <div className="rounded-lg bg-Green/10 h-48 sm:h-64 md:h-80 mb-6" />

          {/* Title + button row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="h-7 sm:h-9 bg-Green/10 rounded-lg w-2/3" />
            <div className="h-10 w-32 bg-Green/10 rounded-lg shrink-0" />
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-7 w-20 bg-Green/10 rounded-full" />
            ))}
          </div>

          {/* Description lines */}
          <div className="space-y-2">
            <div className="h-3 bg-Green/10 rounded w-full" />
            <div className="h-3 bg-Green/10 rounded w-5/6" />
            <div className="h-3 bg-Green/10 rounded w-4/6" />
          </div>
        </div>

        {/* Case study cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card_stylings p-5 sm:p-6">
              <div className="h-3 w-24 bg-Green/10 rounded mb-4" />
              <div className="space-y-2">
                <div className="h-3 bg-Green/10 rounded w-full" />
                <div className="h-3 bg-Green/10 rounded w-5/6" />
                <div className="h-3 bg-Green/10 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
