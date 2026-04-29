import Skeleton from "../Skeleton";

/**
 * Vercel/Geist-style skeleton for the sidebar Intro component.
 * Mirrors: identity card → Identity (4 rows) → Languages (2 bars) →
 * Expertise (3 bars) → Stack (chips) → Contact → Download CTA.
 */
export default function SidebarSkeleton() {
  return (
    <div className="h-full flex flex-col overflow-y-auto overflow-x-hidden no-scrollbar">
      {/* Sticky header */}
      <header
        className="sticky top-0 z-30 flex flex-col items-center px-4 sm:px-5 pt-8 pb-5 gap-y-2.5"
        style={{
          backgroundColor: "var(--ds-surface)",
          boxShadow: "inset 0 -1px 0 0 var(--ds-border-shadow)",
        }}
      >
        {/* Top mono row */}
        <div className="absolute top-3 inset-x-0 flex items-center justify-between px-4">
          <Skeleton className="h-2.5 w-16" />
          <Skeleton className="h-2.5 w-10" />
        </div>

        {/* Avatar */}
        <Skeleton className="w-[72px] h-[72px] sm:w-[76px] sm:h-[76px] rounded-full" />

        {/* Name */}
        <Skeleton className="h-4 w-28" />

        {/* Availability badge */}
        <Skeleton className="h-5 w-24" pill />

        {/* Designation lines */}
        <div className="flex flex-col items-center gap-1 mt-1">
          <Skeleton className="h-2.5 w-40" />
          <Skeleton className="h-2.5 w-28" />
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-col px-4 sm:px-5 pb-3">
        {/* Identity rows */}
        <section className="py-5" style={{ boxShadow: "inset 0 -1px 0 0 var(--ds-border-shadow)" }}>
          <div className="flex flex-col gap-2">
            {[
              ["w-16", "w-20"],
              ["w-20", "w-16"],
              ["w-12", "w-14"],
              ["w-10", "w-8"],
            ].map(([k, v], i) => (
              <div key={i} className="flex items-baseline justify-between">
                <Skeleton className={`h-2.5 ${k}`} />
                <Skeleton className={`h-3 ${v}`} />
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="py-5" style={{ boxShadow: "inset 0 -1px 0 0 var(--ds-border-shadow)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-2.5 w-6" />
            <Skeleton className="h-px w-3" />
            <Skeleton className="h-2.5 w-16" />
          </div>
          {[1, 2].map((i) => (
            <div key={i} className="mb-3">
              <div className="flex items-baseline justify-between mb-1.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-2.5 w-10" />
              </div>
              <Skeleton className="h-[3px] w-full" />
            </div>
          ))}
        </section>

        {/* Expertise */}
        <section className="py-5" style={{ boxShadow: "inset 0 -1px 0 0 var(--ds-border-shadow)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-2.5 w-6" />
            <Skeleton className="h-px w-3" />
            <Skeleton className="h-2.5 w-20" />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="mb-3">
              <div className="flex items-baseline justify-between mb-1.5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2.5 w-10" />
              </div>
              <Skeleton className="h-[3px] w-full" />
            </div>
          ))}
        </section>

        {/* Stack */}
        <section className="py-5" style={{ boxShadow: "inset 0 -1px 0 0 var(--ds-border-shadow)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2.5 w-6" />
              <Skeleton className="h-px w-3" />
              <Skeleton className="h-2.5 w-12" />
            </div>
            <Skeleton className="h-2.5 w-6" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[42, 48, 30, 56, 36, 44, 28, 50].map((w, i) => (
              <Skeleton key={i} className="h-5" style={{ width: w }} />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="py-5" style={{ boxShadow: "inset 0 -1px 0 0 var(--ds-border-shadow)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-2.5 w-6" />
            <Skeleton className="h-px w-3" />
            <Skeleton className="h-2.5 w-14" />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <Skeleton className="h-2 w-10 mb-1.5" />
              <Skeleton className="h-3 w-40" />
            </div>
            <div>
              <Skeleton className="h-2 w-10 mb-1.5" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <Skeleton className="h-9 w-full mt-4 mb-2" pill />
      </div>
    </div>
  );
}
