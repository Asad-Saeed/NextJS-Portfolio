import BannerSkeleton from "@/components/Common/BannerSkeleton";
import SectionHeaderSkeleton from "@/components/Common/SectionHeaderSkeleton";
import Skeleton from "@/components/Common/Skeleton";

export default function Loading() {
  return (
    <div>
      <BannerSkeleton />

      {/* Contact info */}
      <section className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto">
        <SectionHeaderSkeleton />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-lg flex flex-col gap-3"
              style={{
                backgroundColor: "var(--ds-surface)",
                boxShadow: "var(--ds-shadow-border)",
              }}
            >
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>

        {/* Social rail */}
        <div
          className="mt-3 flex items-center justify-between gap-3 px-4 py-3 rounded-lg"
          style={{
            backgroundColor: "var(--ds-surface)",
            boxShadow: "var(--ds-shadow-border)",
          }}
        >
          <Skeleton className="hidden sm:block h-3 w-28" />
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-9 w-9" />
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto">
        <SectionHeaderSkeleton />
        <div
          className="rounded-xl p-4 sm:p-5 lg:p-6"
          style={{
            backgroundColor: "var(--ds-surface)",
            boxShadow: "var(--ds-shadow-border)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mt-3">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="mt-5 pt-4 flex items-center justify-between">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-9 w-32" pill />
          </div>
        </div>
      </section>
    </div>
  );
}
