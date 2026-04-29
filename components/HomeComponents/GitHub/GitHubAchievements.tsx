import {
  getMergedGithubStats,
  getMergedGithubContributions,
  computeAchievements,
} from "@/lib/github";
import SectionHeader from "@/components/Common/SectionHeader";

interface GitHubAchievementsProps {
  usernames: string[];
  eyebrow?: string;
  heading?: string;
}

export default async function GitHubAchievements({
  usernames,
  eyebrow,
  heading,
}: GitHubAchievementsProps) {
  const [stats, contributions] = await Promise.all([
    getMergedGithubStats(usernames),
    getMergedGithubContributions(usernames, "last"),
  ]);

  if (!stats) return null;

  const achievements = computeAchievements(stats, contributions);
  if (achievements.length === 0) return null;

  return (
    <div>
      <SectionHeader eyebrow={eyebrow ?? ""} title={heading ?? ""} />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5">
        {achievements.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-lg min-w-0"
            style={{
              backgroundColor: "var(--ds-surface)",
              boxShadow: "var(--ds-shadow-border)",
            }}
          >
            <div className="text-2xl shrink-0 leading-none" aria-hidden="true">
              {a.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div
                className="text-[13px] font-semibold truncate"
                style={{ color: "var(--ds-fg)", letterSpacing: "-0.015em" }}
              >
                {a.title}
              </div>
              <div className="text-[11px] truncate" style={{ color: "var(--ds-fg-tertiary)" }}>
                {a.description}
              </div>
            </div>
            <div
              className="text-[13px] font-semibold tabular-nums shrink-0"
              style={{ color: "var(--ds-fg)", letterSpacing: "-0.02em" }}
            >
              {a.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
