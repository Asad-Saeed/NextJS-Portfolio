import BannerSkeleton from "@/components/Common/BannerSkeleton";
import Skeleton from "@/components/Common/Skeleton";
import CardSkeleton from "@/components/Common/CardSkeleton";

export default function Loading() {
  return (
    <div>
      <BannerSkeleton />

      <div className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto">
        {/* Back link */}
        <Skeleton className="h-3 w-28 mb-6" />

        {/* Project header card */}
        <div
          className="rounded-xl p-4 sm:p-5 lg:p-6 mb-3"
          style={{
            backgroundColor: "var(--ds-surface)",
            boxShadow: "var(--ds-shadow-border)",
          }}
        >
          {/* Image */}
          <Skeleton className="w-full h-48 sm:h-64 md:h-80 mb-5" />

          {/* Title + CTA */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <Skeleton className="h-7 sm:h-9 w-2/3" />
            <Skeleton className="h-9 w-32" pill />
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {[44, 56, 36, 52, 40].map((w, i) => (
              <Skeleton key={i} className="h-5" style={{ width: w }} pill />
            ))}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </div>
        </div>

        {/* Case study cards (Challenge / Solution / Impact / Role) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <CardSkeleton key={i} lines={3} />
          ))}
        </div>
      </div>
    </div>
  );
}
