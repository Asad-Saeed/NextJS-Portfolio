import BannerSkeleton from "@/components/Common/BannerSkeleton";

export default function Loading() {
  return (
    <div className="animate-pulse">
      <BannerSkeleton />

      <div className="px-4 py-2">
        {/* Contact info cards */}
        <div className="my-6 space-y-5">
          <div className="h-5 w-44 bg-Green/10 rounded" />
          <div className="flex flex-col md:flex-row gap-5">
            <div className="card_stylings w-full md:w-1/2 p-5 md:p-8 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-3 w-16 bg-Green/10 rounded" />
                  <div className="h-3 w-24 bg-Green/10 rounded" />
                </div>
              ))}
            </div>
            <div className="card_stylings w-full md:w-1/2 p-5 md:p-8 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-3 w-16 bg-Green/10 rounded" />
                  <div className="h-3 w-28 bg-Green/10 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social icons bar */}
        <div className="h-16 w-full card_stylings flex gap-8 items-center justify-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-7 h-7 bg-Green/10 rounded-full" />
          ))}
        </div>

        {/* Contact form */}
        <div className="my-12 space-y-4">
          <div className="h-5 w-32 bg-Green/10 rounded" />
          <div className="card_stylings rounded-xl p-8 space-y-6">
            <div className="h-10 bg-Green/10 rounded-lg" />
            <div className="h-10 bg-Green/10 rounded-lg" />
            <div className="h-32 bg-Green/10 rounded-lg" />
            <div className="h-10 w-40 bg-Green/10 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
