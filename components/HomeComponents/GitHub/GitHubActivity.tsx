import {
  getMergedGithubContributions,
  getMergedGithubStats,
  getAvailableYears,
  getCurrentYear,
} from "@/lib/github";
import GitHubActivityClient from "./GitHubActivityClient";

interface GitHubActivityProps {
  usernames: string[];
  heading: string;
}

export default async function GitHubActivity({ usernames, heading }: GitHubActivityProps) {
  const initialYear = "last";
  const [initialData, stats] = await Promise.all([
    getMergedGithubContributions(usernames, initialYear),
    getMergedGithubStats(usernames),
  ]);

  if (!initialData || initialData.weeks.length === 0) return null;

  const allYears = stats ? getAvailableYears(stats.user.created_at) : [getCurrentYear()];
  const availableYears = allYears.slice(0, 5);

  return (
    <GitHubActivityClient
      usernames={usernames}
      heading={heading}
      initialData={initialData}
      initialYear={initialYear}
      availableYears={availableYears}
    />
  );
}
