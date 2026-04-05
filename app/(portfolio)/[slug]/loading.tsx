import BannerSkeleton from "@/components/Common/BannerSkeleton";
import ParagraphSkeleton from "@/components/Common/ParagraphSkeleton";

export default function Loading() {
  return (
    <div className="animate-pulse">
      <BannerSkeleton />

      {/* Expertise section */}
      <div className="px-2 md:px-8 py-4">
        <div className="h-5 w-32 bg-Green/10 rounded mb-4" />
      </div>
      <div className="grid md:grid-cols-2 gap-4 px-2 md:px-8">
        {[1, 2, 3, 4].map((i) => (
          <ParagraphSkeleton key={i} className="p-8" />
        ))}
      </div>

      {/* Recommendations section */}
      <div className="px-2 md:px-8 py-4 mt-4">
        <div className="h-5 w-40 bg-Green/10 rounded mb-4" />
      </div>
      <div className="grid md:grid-cols-2 gap-4 px-2 md:px-8">
        {[1, 2].map((i) => (
          <ParagraphSkeleton key={i} className="p-8 h-full" />
        ))}
      </div>

      {/* Reviews section */}
      <div className="px-2 md:px-8 py-4 mt-4">
        <div className="h-5 w-36 bg-Green/10 rounded mb-4" />
      </div>
      <div className="flex gap-4 px-2 md:px-8 pb-4 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-80 shrink-0 h-40 bg-EveningBlack rounded-xl border border-DarkGray/30"
          />
        ))}
      </div>
    </div>
  );
}
