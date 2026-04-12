const STATUS_CONFIG: Record<string, { label: string; dotClass: string; bgClass: string }> = {
  open_to_work: {
    label: "Open to Work",
    dotClass: "bg-Green",
    bgClass: "bg-Green/10 text-Green border-Green/20",
  },
  freelance: {
    label: "Freelance",
    dotClass: "bg-amber-400",
    bgClass: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  },
  not_available: {
    label: "Not Available",
    dotClass: "bg-SlateGray",
    bgClass: "bg-SlateGray/10 text-SlateGray border-SlateGray/20",
  },
};

interface AvailabilityBadgeProps {
  status?: string;
}

export default function AvailabilityBadge({ status }: AvailabilityBadgeProps) {
  const config = STATUS_CONFIG[status || ""];
  if (!config || status === "not_available") return null;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[8px] font-semibold tracking-wider uppercase ${config.bgClass}`}
    >
      <span className={`w-1 h-1 rounded-full animate-pulse ${config.dotClass}`} />
      {config.label}
    </span>
  );
}
