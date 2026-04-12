import { getGithubStats, getGithubContributions, getCurrentYear } from "@/lib/github";
import { FaStar, FaCodeBranch, FaUsers, FaBookOpen, FaRegStar } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";

interface GitHubProStatsProps {
  username: string;
}

const languageDot: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Shell: "#89e051",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Dart: "#00B4AB",
};

function langColor(lang: string | null): string {
  if (!lang) return "#6e7681";
  return languageDot[lang] || "#00e5ff";
}

export default async function GitHubProStats({ username }: GitHubProStatsProps) {
  const [stats, contributions] = await Promise.all([
    getGithubStats(username),
    getGithubContributions(username, getCurrentYear()),
  ]);

  if (!stats) return null;

  const heroMetrics = [
    {
      label: "Total Stars",
      value: stats.totalStars,
      icon: <FaStar className="text-Green" />,
    },
    {
      label: "Public Repos",
      value: stats.user.public_repos,
      icon: <FaBookOpen className="text-Green" />,
    },
    {
      label: "Followers",
      value: stats.user.followers,
      icon: <FaUsers className="text-Green" />,
    },
    {
      label: "Contributions",
      value: contributions?.total ?? 0,
      icon: <HiOutlineSparkles className="text-Green" />,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Hero metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {heroMetrics.map((m) => (
          <div
            key={m.label}
            className="card_stylings p-4 flex flex-col items-start gap-2 hover:border-Green/50 transition-colors"
          >
            <div className="flex items-center gap-2 text-sm">
              {m.icon}
              <span className="text-LightGray text-xs uppercase tracking-wide">{m.label}</span>
            </div>
            <div className="text-Snow text-2xl sm:text-3xl font-bold">
              {m.value.toLocaleString("en-US")}
            </div>
          </div>
        ))}
      </div>

      {/* Top languages */}
      {stats.topLanguages.length > 0 && (
        <div className="card_stylings p-4 sm:p-6">
          <h3 className="text-Snow text-base font-semibold mb-4">Top Languages</h3>
          <div className="flex flex-col gap-3">
            {stats.topLanguages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-3">
                <div className="flex items-center gap-2 w-28 sm:w-32 shrink-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: langColor(lang.name) }}
                  />
                  <span className="text-xs text-Snow font-medium truncate">{lang.name}</span>
                </div>
                <div className="flex-1 h-2 bg-DarkGray/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-Green rounded-full"
                    style={{ width: `${lang.percentage}%` }}
                  />
                </div>
                <span className="text-xs text-LightGray w-10 text-right shrink-0">
                  {lang.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured repositories */}
      {stats.topRepos.length > 0 && (
        <div>
          <h3 className="text-Snow text-base font-semibold mb-3 px-1">Featured Repositories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {stats.topRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="card_stylings p-4 flex flex-col gap-3 hover:border-Green/50 transition-colors group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FaBookOpen className="text-Green shrink-0" />
                    <span className="text-Snow text-sm font-semibold truncate group-hover:text-Green transition-colors">
                      {repo.name}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-LightGray line-clamp-2 min-h-[2rem]">
                  {repo.description || "No description provided."}
                </p>
                <div className="flex items-center gap-4 text-xs text-LightGray mt-auto">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: langColor(repo.language) }}
                      />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <FaRegStar />
                    <span>{repo.stars.toLocaleString("en-US")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCodeBranch />
                    <span>{repo.forks.toLocaleString("en-US")}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
