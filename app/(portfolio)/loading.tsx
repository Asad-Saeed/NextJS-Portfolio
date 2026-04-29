import BannerSkeleton from "@/components/Common/BannerSkeleton";
import SectionHeaderSkeleton from "@/components/Common/SectionHeaderSkeleton";
import CardSkeleton from "@/components/Common/CardSkeleton";

export default function Loading() {
  return (
    <div>
      <BannerSkeleton />

      {/* GitHub block */}
      <section className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto flex flex-col gap-8 sm:gap-10">
        <div>
          <SectionHeaderSkeleton withDescription={false} />
          <div
            className="rounded-xl p-4 sm:p-5 lg:p-6 h-48 sm:h-56"
            style={{
              backgroundColor: "var(--ds-surface)",
              boxShadow: "var(--ds-shadow-border)",
            }}
          />
        </div>
        <div>
          <SectionHeaderSkeleton withDescription={false} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-4 rounded-lg flex flex-col gap-2"
                style={{
                  backgroundColor: "var(--ds-surface)",
                  boxShadow: "var(--ds-shadow-border)",
                }}
              >
                <div className="h-3 w-16 ds-skeleton" />
                <div className="h-7 w-12 ds-skeleton" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto">
        <SectionHeaderSkeleton />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CardSkeleton key={i} lines={2} />
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto">
        <SectionHeaderSkeleton />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {[1, 2, 3].map((i) => (
            <CardSkeleton key={i} lines={2} />
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto">
        <SectionHeaderSkeleton />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {[1, 2].map((i) => (
            <CardSkeleton key={i} lines={4} withFooter />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto">
        <SectionHeaderSkeleton />
        <div className="flex gap-2.5 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-[320px] sm:w-[360px] shrink-0">
              <CardSkeleton lines={4} withFooter />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
