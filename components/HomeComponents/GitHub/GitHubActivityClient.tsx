"use client";

import { useState, useTransition } from "react";
import { FaGithub } from "react-icons/fa";
import type { ContributionsData, ContributionLevel } from "@/lib/github";

const levelClass: Record<ContributionLevel, string> = {
  0: "bg-DarkGray/30",
  1: "bg-Green/25",
  2: "bg-Green/50",
  3: "bg-Green/75",
  4: "bg-Green",
};

interface GitHubActivityClientProps {
  usernames: string[];
  heading: string;
  initialData: ContributionsData;
  initialYear: string;
  availableYears: string[];
}

export default function GitHubActivityClient({
  usernames,
  heading,
  initialData,
  initialYear,
  availableYears,
}: GitHubActivityClientProps) {
  const [data, setData] = useState<ContributionsData>(initialData);
  const [selectedYear, setSelectedYear] = useState<string>(initialYear);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function selectYear(year: string) {
    if (year === selectedYear) return;
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch(
          `/api/github/contributions?username=${encodeURIComponent(usernames.join(","))}&year=${year}`
        );
        if (!res.ok) {
          setError("Couldn't load data for that year.");
          return;
        }
        const next = (await res.json()) as ContributionsData;
        setData(next);
        setSelectedYear(year);
      } catch {
        setError("Network error. Try again.");
      }
    });
  }

  const yearButtons: { key: string; label: string }[] = [
    { key: "last", label: "Last year" },
    ...availableYears.map((y) => ({ key: y, label: y })),
  ];

  return (
    <div className="card_stylings p-4 sm:p-6">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-2">
          <FaGithub className="text-Green text-xl" />
          <h2 className="text-Snow text-lg sm:text-xl font-semibold">{heading}</h2>
        </div>
        <div className="text-xs sm:text-sm text-LightGray">
          <span className="text-Green font-bold">{data.total.toLocaleString("en-US")}</span>{" "}
          contributions in {selectedYear === "last" ? "the last year" : selectedYear}
        </div>
      </div>

      {/* Year picker */}
      {yearButtons.length > 1 && (
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
          {yearButtons.map((btn) => (
            <button
              key={btn.key}
              type="button"
              onClick={() => selectYear(btn.key)}
              disabled={isPending}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap ${
                selectedYear === btn.key
                  ? "bg-Green/15 text-Green border-Green/40"
                  : "text-LightGray border-DarkGray/50 hover:border-Green/30 hover:text-Snow"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg p-2 mb-3">
          {error}
        </div>
      )}

      <div
        className={`overflow-x-auto no-scrollbar transition-opacity ${
          isPending ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="min-w-[640px] w-full">
          {/* Month labels row — aligned to week columns via matching flex layout */}
          <div className="flex gap-2 mb-1">
            <div className="w-8 shrink-0" />
            <div className="flex-1 flex gap-[2px] min-w-0">
              {data.weeks.map((_, weekIndex) => {
                const month = data.months.find((m) => m.weekIndex === weekIndex);
                return (
                  <div key={weekIndex} className="flex-1 min-w-0 h-3 leading-none">
                    {month && (
                      <span className="text-[10px] text-LightGray whitespace-nowrap">
                        {month.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Graph body: day-labels column + week grid */}
          <div className="flex gap-2">
            <div className="w-8 shrink-0 flex flex-col gap-[2px] text-[10px] text-LightGray">
              <div className="h-3" />
              <div className="h-3 flex items-center leading-none">Mon</div>
              <div className="h-3" />
              <div className="h-3 flex items-center leading-none">Wed</div>
              <div className="h-3" />
              <div className="h-3 flex items-center leading-none">Fri</div>
              <div className="h-3" />
            </div>

            <div className="flex-1 flex gap-[2px] min-w-0">
              {data.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex-1 min-w-0 flex flex-col gap-[2px]">
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`h-3 rounded-[2px] ${
                        day.date ? levelClass[day.level] : "bg-transparent"
                      }`}
                      title={
                        day.date
                          ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                          : ""
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-3 text-xs text-SilverGray">
            <span>Less</span>
            <div className={`w-3 h-3 rounded-[2px] ${levelClass[0]}`} />
            <div className={`w-3 h-3 rounded-[2px] ${levelClass[1]}`} />
            <div className={`w-3 h-3 rounded-[2px] ${levelClass[2]}`} />
            <div className={`w-3 h-3 rounded-[2px] ${levelClass[3]}`} />
            <div className={`w-3 h-3 rounded-[2px] ${levelClass[4]}`} />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
