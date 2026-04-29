import { getMergedGithubStats, getMergedGithubContributions } from "@/lib/github";
import { FaStar, FaCodeBranch, FaUsers, FaBookOpen, FaRegStar } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import SectionHeader from "@/components/Common/SectionHeader";

interface GitHubProStatsProps {
  usernames: string[];
  statsEyebrow?: string;
  statsHeading?: string;
  languagesEyebrow?: string;
  languagesHeading?: string;
  reposEyebrow?: string;
  reposHeading?: string;
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
  if (!lang) return "var(--ds-fg-muted)";
  return languageDot[lang] || "var(--ds-link)";
}

export default async function GitHubProStats({
  usernames,
  statsEyebrow,
  statsHeading,
  languagesEyebrow,
  languagesHeading,
  reposEyebrow,
  reposHeading,
}: GitHubProStatsProps) {
  const [stats, contributions] = await Promise.all([
    getMergedGithubStats(usernames),
    getMergedGithubContributions(usernames, "last"),
  ]);

  if (!stats) return null;

  const heroMetrics = [
    { label: "Stars", value: stats.totalStars, Icon: FaStar },
    { label: "Repos", value: stats.user.public_repos, Icon: FaBookOpen },
    { label: "Followers", value: stats.user.followers, Icon: FaUsers },
    { label: "Contributions", value: contributions?.total ?? 0, Icon: HiOutlineSparkles },
  ];

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      {/* Profile stats — heading + grid of cells */}
      <div>
        <SectionHeader eyebrow={statsEyebrow ?? ""} title={statsHeading ?? ""} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {heroMetrics.map((m) => (
            <div
              key={m.label}
              className="flex flex-col items-start gap-2 p-4 rounded-lg"
              style={{
                backgroundColor: "var(--ds-surface)",
                boxShadow: "var(--ds-shadow-border)",
              }}
            >
              <div
                className="flex items-center gap-1.5 text-mono-label"
                style={{ color: "var(--ds-fg-tertiary)" }}
              >
                <m.Icon size={10} />
                {m.label}
              </div>
              <div
                className="text-xl sm:text-2xl lg:text-[28px] font-semibold tabular-nums leading-none"
                style={{ color: "var(--ds-fg)", letterSpacing: "-0.04em" }}
              >
                {m.value.toLocaleString("en-US")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top languages — heading outside, bar list inside card */}
      {stats.topLanguages.length > 0 && (
        <div>
          <SectionHeader eyebrow={languagesEyebrow ?? ""} title={languagesHeading ?? ""} />
          <div
            className="rounded-xl p-4 sm:p-5 lg:p-6 flex flex-col gap-3"
            style={{
              backgroundColor: "var(--ds-surface)",
              boxShadow: "var(--ds-shadow-border)",
            }}
          >
            {stats.topLanguages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 w-24 sm:w-32 shrink-0">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: langColor(lang.name) }}
                  />
                  <span
                    className="text-[12.5px] font-medium truncate"
                    style={{ color: "var(--ds-fg)", letterSpacing: "-0.01em" }}
                  >
                    {lang.name}
                  </span>
                </div>
                <div
                  className="flex-1 h-[3px] rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--ds-surface-subtle)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: langColor(lang.name),
                    }}
                  />
                </div>
                <span
                  className="text-mono-label tabular-nums w-9 text-right shrink-0"
                  style={{ color: "var(--ds-fg-tertiary)" }}
                >
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
          <SectionHeader eyebrow={reposEyebrow ?? ""} title={reposHeading ?? ""} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {stats.topRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-col gap-3 p-4 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: "var(--ds-surface)",
                  boxShadow: "var(--ds-shadow-border)",
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FaBookOpen
                      size={13}
                      className="shrink-0"
                      style={{ color: "var(--ds-fg-tertiary)" }}
                    />
                    <span
                      className="text-[14px] font-semibold truncate"
                      style={{
                        color: "var(--ds-fg)",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {repo.name}
                    </span>
                  </div>
                  <span
                    className="text-mono-label opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    style={{ color: "var(--ds-link)" }}
                  >
                    ↗
                  </span>
                </div>
                <p
                  className="text-[12.5px] line-clamp-2 min-h-[2.4rem]"
                  style={{
                    color: "var(--ds-fg-secondary)",
                    letterSpacing: "-0.005em",
                  }}
                >
                  {repo.description || "No description provided."}
                </p>
                <div className="flex items-center gap-4 text-[12px] mt-auto tabular-nums">
                  {repo.language && (
                    <div
                      className="flex items-center gap-1.5"
                      style={{ color: "var(--ds-fg-tertiary)" }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: langColor(repo.language) }}
                      />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div
                    className="flex items-center gap-1"
                    style={{ color: "var(--ds-fg-tertiary)" }}
                  >
                    <FaRegStar size={11} />
                    <span>{repo.stars.toLocaleString("en-US")}</span>
                  </div>
                  <div
                    className="flex items-center gap-1"
                    style={{ color: "var(--ds-fg-tertiary)" }}
                  >
                    <FaCodeBranch size={11} />
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
