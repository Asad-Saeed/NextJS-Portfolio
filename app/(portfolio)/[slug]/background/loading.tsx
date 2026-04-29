import BannerSkeleton from "@/components/Common/BannerSkeleton";
import SectionHeaderSkeleton from "@/components/Common/SectionHeaderSkeleton";
import CardSkeleton from "@/components/Common/CardSkeleton";

export default function Loading() {
  return (
    <div>
      <BannerSkeleton />
      <section className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-8 md:gap-y-0">
          {/* Center vertical timeline rail */}
          <div
            aria-hidden
            className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px"
            style={{ backgroundColor: "var(--ds-border-light)" }}
          />

          {/* Experience column */}
          <div className="flex flex-col gap-2.5 self-start min-w-0">
            <SectionHeaderSkeleton />
            {[1, 2, 3].map((i) => (
              <CardSkeleton key={i} lines={3} withFooter />
            ))}
          </div>

          {/* Education column */}
          <div className="flex flex-col gap-2.5 self-start min-w-0">
            <SectionHeaderSkeleton />
            {[1, 2, 3].map((i) => (
              <CardSkeleton key={i} lines={3} withFooter />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
