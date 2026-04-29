import Skeleton from "./Skeleton";

interface ParagraphSkeletonProps {
  className?: string;
}

const ParagraphSkeleton = ({ className = "" }: ParagraphSkeletonProps) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      aria-busy="true"
      className={`p-4 sm:p-5 lg:p-6 rounded-lg flex flex-col gap-3 ${className}`}
      style={{
        backgroundColor: "var(--ds-surface)",
        boxShadow: "var(--ds-shadow-border)",
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-2 w-2" pill />
      </div>
      <Skeleton className="h-5 w-2/3" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-3/4" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
};

export default ParagraphSkeleton;
