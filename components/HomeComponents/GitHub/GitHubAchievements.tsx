import {
  getMergedGithubStats,
  getMergedGithubContributions,
  computeAchievements,
} from "@/lib/github";

interface GitHubAchievementsProps {
  usernames: string[];
}

export default async function GitHubAchievements({ usernames }: GitHubAchievementsProps) {
  const [stats, contributions] = await Promise.all([
    getMergedGithubStats(usernames),
    getMergedGithubContributions(usernames, "last"),
  ]);

  if (!stats) return null;

  const achievements = computeAchievements(stats, contributions);
  if (achievements.length === 0) return null;

  return (
    <div>
      <h3 className="text-Snow text-base font-semibold mb-3 px-1">Achievements</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {achievements.map((a) => (
          <div
            key={a.id}
            className="card_stylings p-4 flex items-center gap-3 hover:border-Green/50 transition-colors"
          >
            <div className="text-3xl shrink-0" aria-hidden="true">
              {a.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-Snow text-sm font-semibold truncate">{a.title}</div>
              <div className="text-LightGray text-[11px] truncate">{a.description}</div>
            </div>
            <div className="text-Green text-sm font-bold shrink-0">{a.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
