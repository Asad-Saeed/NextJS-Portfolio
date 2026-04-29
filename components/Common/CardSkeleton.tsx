import Skeleton from "./Skeleton";

interface CardSkeletonProps {
  /** Render an image strip at the top (matches Skill / Portfolio cards). */
  withImage?: boolean;
  /** Number of body lines (default 2). */
  lines?: number;
  /** Show 3 small chip rows beneath the body (matches portfolio tech badges). */
  withChips?: boolean;
  /** Show a footer row with two pills (matches case-study CTA). */
  withFooter?: boolean;
  className?: string;
}

export default function CardSkeleton({
  withImage,
  lines = 2,
  withChips,
  withFooter,
  className = "",
}: CardSkeletonProps) {
  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden ${className}`}
      style={{
        backgroundColor: "var(--ds-surface)",
        boxShadow: "var(--ds-shadow-border)",
      }}
    >
      {withImage && (
        <div
          className="relative w-full"
          style={{
            aspectRatio: "16 / 4",
            backgroundColor: "var(--ds-surface-subtle)",
            boxShadow: "inset 0 -1px 0 0 var(--ds-border-shadow)",
          }}
        >
          <Skeleton className="absolute top-2.5 left-3 h-5 w-24" pill />
        </div>
      )}
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-3 w-8" />
        </div>
        <div className="flex flex-col gap-2">
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton key={i} className="h-3" style={{ width: `${85 - i * 8}%` }} />
          ))}
        </div>
        {withChips && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {[44, 56, 36, 50].map((w, i) => (
              <Skeleton key={i} className="h-5" style={{ width: w }} pill />
            ))}
          </div>
        )}
        {withFooter && (
          <div
            className="mt-auto pt-3 flex items-center justify-between"
            style={{ boxShadow: "inset 0 1px 0 0 var(--ds-border-shadow)" }}
          >
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        )}
      </div>
    </div>
  );
}
