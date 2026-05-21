"use client";

import CountUp from "react-countup";

interface AnimatedCounterProps {
  /** Target value as displayed (string allows "27+", "5+", etc). */
  value?: string | number | null;
  /** Animation duration in ms. */
  duration?: number;
  /** Delay before animation starts (ms). Used to stagger across stat cells. */
  delay?: number;
}

const BASE_DELAY_MS = 400;

export default function AnimatedCounter({
  value,
  duration = 1500,
  delay = 0,
}: AnimatedCounterProps) {
  const raw = value == null ? "—" : String(value);
  const match = raw.match(/^(\d+)(.*)$/);

  if (!match) {
    return <span className="tabular-nums">{raw}</span>;
  }

  const targetNum = parseInt(match[1], 10);
  const suffix = match[2];

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      <CountUp
        start={0}
        end={targetNum}
        duration={duration / 1000}
        delay={(delay + BASE_DELAY_MS) / 1000}
        useEasing={false}
        useGrouping={false}
      />
      {suffix}
    </span>
  );
}
