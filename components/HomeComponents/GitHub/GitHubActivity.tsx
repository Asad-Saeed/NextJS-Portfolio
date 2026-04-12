import {
  getGithubContributions,
  getGithubStats,
  getAvailableYears,
  getCurrentYear,
} from "@/lib/github";
import GitHubActivityClient from "./GitHubActivityClient";

interface GitHubActivityProps {
  username: string;
  heading: string;
}

export default async function GitHubActivity({ username, heading }: GitHubActivityProps) {
  const currentYear = getCurrentYear();
  const [initialData, stats] = await Promise.all([
    getGithubContributions(username, currentYear),
    getGithubStats(username),
  ]);

  if (!initialData || initialData.weeks.length === 0) return null;

  const allYears = stats ? getAvailableYears(stats.user.created_at) : [currentYear];
  const availableYears = allYears.slice(0, 5);

  return (
    <GitHubActivityClient
      username={username}
      heading={heading}
      initialData={initialData}
      initialYear={currentYear}
      availableYears={availableYears}
    />
  );
}
