export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="h-7 sm:h-8 w-48 bg-Green/10 rounded-lg" />
          <div className="h-3 w-32 bg-Green/10 rounded mt-2" />
        </div>
        <div className="h-10 w-32 bg-Green/10 rounded-lg" />
      </div>

      {/* Table / cards skeleton */}
      <div className="card_stylings overflow-hidden">
        <div className="p-4 border-b border-DarkGray/30">
          <div className="flex gap-4">
            <div className="h-3 w-24 bg-Green/10 rounded" />
            <div className="h-3 w-32 bg-Green/10 rounded" />
            <div className="h-3 w-16 bg-Green/10 rounded" />
            <div className="h-3 w-20 bg-Green/10 rounded ml-auto" />
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4 border-b border-DarkGray/20 flex gap-4 items-center">
            <div className="h-4 flex-1 bg-Green/10 rounded" />
            <div className="h-4 w-32 bg-Green/10 rounded" />
            <div className="h-4 w-12 bg-Green/10 rounded" />
            <div className="flex gap-2">
              <div className="h-6 w-6 bg-Green/10 rounded" />
              <div className="h-6 w-6 bg-Green/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
