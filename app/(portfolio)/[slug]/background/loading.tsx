import BannerSkeleton from "@/components/Common/BannerSkeleton";
import ParagraphSkeleton from "@/components/Common/ParagraphSkeleton";

export default function Loading() {
  return (
    <div className="animate-pulse">
      <BannerSkeleton />
      <div className="grid md:grid-cols-2 gap-x-10 px-4 pb-2 pt-6">
        <div className="flex flex-col gap-y-4 order-2 md:order-1">
          <div className="h-5 w-24 bg-Green/10 rounded mt-6 md:mt-0" />
          {[1, 2, 3].map((i) => (
            <ParagraphSkeleton key={i} className="p-8 h-full w-full" />
          ))}
        </div>
        <div className="order-1 md:order-2">
          <div className="flex flex-col gap-y-4">
            <div className="h-5 w-28 bg-Green/10 rounded" />
            {[1, 2, 3].map((i) => (
              <ParagraphSkeleton key={i} className="p-8 h-full w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
