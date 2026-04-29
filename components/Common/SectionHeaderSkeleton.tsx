import Skeleton from "./Skeleton";

interface SectionHeaderSkeletonProps {
  withDescription?: boolean;
  className?: string;
}

export default function SectionHeaderSkeleton({
  withDescription = true,
  className = "",
}: SectionHeaderSkeletonProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-3 sm:mb-4 ${className}`}
    >
      <div>
        {/* Eyebrow */}
        <Skeleton className="h-3 w-20 mb-2.5" pill />
        {/* Heading */}
        <Skeleton className="h-7 sm:h-8 w-44 sm:w-64" />
      </div>
      {withDescription && (
        <div className="hidden sm:flex flex-col gap-1.5 max-w-sm">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      )}
    </div>
  );
}
