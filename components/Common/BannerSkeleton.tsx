const BannerSkeleton = () => {
  return (
    <div className="relative w-full h-52 sm:h-80 bg-DeepNightBlack animate-pulse">
      <div className="absolute inset-0 flex flex-col justify-between py-3 sm:py-5 w-full h-full">
        {/* Main content box */}
        <div className="flex-1 flex flex-col justify-center px-3 sm:px-6">
          <div className="bg-DarkGray/30 w-full p-4 sm:p-6 rounded-xl">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 space-y-3 sm:space-y-4">
                <div className="h-5 sm:h-8 bg-Green/10 rounded-lg w-3/4" />
                <div className="h-3 sm:h-5 bg-Green/10 rounded-lg w-2/3" />
                <div className="h-8 sm:h-10 bg-Green/10 rounded-lg w-24 sm:w-32 mt-2" />
              </div>
              <div className="w-16 h-20 sm:w-32 sm:h-36 bg-Green/10 rounded-xl shrink-0" />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-around w-full px-3 sm:px-6 pt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="h-4 sm:h-6 w-10 sm:w-14 bg-Green/10 rounded" />
              <div className="h-2 sm:h-3 w-16 sm:w-24 bg-Green/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
