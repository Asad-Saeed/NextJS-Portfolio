import BannerSkeleton from "@/components/Common/BannerSkeleton";
import SectionHeaderSkeleton from "@/components/Common/SectionHeaderSkeleton";
import CardSkeleton from "@/components/Common/CardSkeleton";

export default function Loading() {
  return (
    <div>
      <BannerSkeleton />
      <section className="px-5 sm:px-8 py-4 sm:py-5">
        <SectionHeaderSkeleton />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <CardSkeleton key={i} withImage lines={2} withChips withFooter />
          ))}
        </div>
      </section>
    </div>
  );
}
