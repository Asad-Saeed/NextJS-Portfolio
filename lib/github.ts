import { cache } from "react";

export function parseGithubUsername(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  const match = trimmed.match(/(?:github\.com\/)?([A-Za-z0-9][A-Za-z0-9-]{0,38})\/?$/i);
  return match?.[1] ?? null;
}

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;
export type ContributionDay = { date: string; count: number; level: ContributionLevel };

export type ContributionsData = {
  total: number;
  weeks: ContributionDay[][];
  months: { name: string; weekIndex: number }[];
};

type JogruberDay = {
  date: string;
  count: number;
  level: number;
};

type JogruberResponse = {
  total: Record<string, number>;
  contributions: JogruberDay[];
};

const githubHeaders = (): HeadersInit => {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
};

export function getCurrentYear(): string {
  return String(new Date().getUTCFullYear());
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type ContribSource = {
  map: Map<string, { count: number; level: ContributionLevel }>;
  total: number;
};

const GQL_LEVEL_MAP: Record<string, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

async function fetchContribsFromGraphQL(
  username: string,
  year: number
): Promise<ContribSource | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                contributionLevel
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables: { username, from, to } }),
      next: { revalidate: 600 },
    });

    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              totalContributions: number;
              weeks: Array<{
                contributionDays: Array<{
                  contributionCount: number;
                  contributionLevel: string;
                  date: string;
                }>;
              }>;
            };
          };
        };
      };
      errors?: unknown;
    };

    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar || json.errors) return null;

    const map = new Map<string, { count: number; level: ContributionLevel }>();
    for (const week of calendar.weeks) {
      for (const day of week.contributionDays) {
        map.set(day.date, {
          count: day.contributionCount,
          level: GQL_LEVEL_MAP[day.contributionLevel] ?? 0,
        });
      }
    }

    return { map, total: calendar.totalContributions };
  } catch {
    return null;
  }
}

async function fetchContribsFromJogruber(
  username: string,
  year: string
): Promise<ContribSource | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=${year}`,
      { next: { revalidate: 600 } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as JogruberResponse;

    const map = new Map<string, { count: number; level: ContributionLevel }>();
    for (const day of data.contributions ?? []) {
      map.set(day.date, {
        count: day.count,
        level: Math.min(4, Math.max(0, day.level)) as ContributionLevel,
      });
    }

    const total = Object.values(data.total ?? {}).reduce((sum, v) => sum + v, 0);
    return { map, total };
  } catch {
    return null;
  }
}

export const getGithubContributions = cache(
  async (username: string, year: string): Promise<ContributionsData | null> => {
    if (!/^\d{4}$/.test(year)) return null;
    const yearNum = parseInt(year, 10);

    const source =
      (await fetchContribsFromGraphQL(username, yearNum)) ??
      (await fetchContribsFromJogruber(username, year));
    if (!source) return null;

    const { map: contribMap, total } = source;

    const startDate = new Date(Date.UTC(yearNum, 0, 1));
    const endDate = new Date(Date.UTC(yearNum, 11, 31));

    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    const firstDayOfWeek = startDate.getUTCDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({ date: "", count: 0, level: 0 });
    }

    const cursor = new Date(startDate);
    while (cursor.getTime() <= endDate.getTime()) {
      const dateStr = cursor.toISOString().slice(0, 10);
      const contrib = contribMap.get(dateStr);
      currentWeek.push({
        date: dateStr,
        count: contrib?.count ?? 0,
        level: contrib?.level ?? 0,
      });
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: "", count: 0, level: 0 });
      }
      weeks.push(currentWeek);
    }

    const months: { name: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIndex) => {
      const firstRealDay = week.find((d) => d.date);
      if (!firstRealDay) return;
      const month = new Date(firstRealDay.date + "T00:00:00Z").getUTCMonth();
      if (month !== lastMonth) {
        months.push({ name: MONTH_NAMES[month], weekIndex });
        lastMonth = month;
      }
    });

    return { total, weeks, months };
  }
);

export type GithubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  html_url: string;
};

export type GithubRepo = {
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  url: string;
};

export type GithubLanguage = {
  name: string;
  count: number;
  percentage: number;
};

export type GithubStats = {
  user: GithubUser;
  totalStars: number;
  totalForks: number;
  topRepos: GithubRepo[];
  topLanguages: GithubLanguage[];
};

type RawRepo = {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  fork: boolean;
  archived: boolean;
};

export function getAvailableYears(createdAt: string): string[] {
  const startYear = new Date(createdAt).getUTCFullYear();
  const currentYear = new Date().getUTCFullYear();
  if (isNaN(startYear)) return [];
  const years: string[] = [];
  for (let y = currentYear; y >= startYear; y--) {
    years.push(String(y));
  }
  return years;
}

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  value: string;
};

export function computeAchievements(
  stats: GithubStats,
  contributions: ContributionsData | null
): Achievement[] {
  const achievements: Achievement[] = [];
  const { user, totalStars, totalForks, topRepos, topLanguages } = stats;
  const contribTotal = contributions?.total ?? 0;

  const accountAgeYears = Math.floor(
    (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );

  if (contribTotal >= 1000) {
    achievements.push({
      id: "prolific",
      title: "Prolific",
      description: `${contribTotal.toLocaleString("en-US")} contributions this year`,
      icon: "🔥",
      value: contribTotal.toLocaleString("en-US"),
    });
  } else if (contribTotal >= 500) {
    achievements.push({
      id: "dedicated",
      title: "Dedicated",
      description: `${contribTotal.toLocaleString("en-US")} contributions this year`,
      icon: "⚡",
      value: contribTotal.toLocaleString("en-US"),
    });
  } else if (contribTotal >= 100) {
    achievements.push({
      id: "active",
      title: "Active Contributor",
      description: `${contribTotal.toLocaleString("en-US")} contributions this year`,
      icon: "🎯",
      value: contribTotal.toLocaleString("en-US"),
    });
  }

  if (totalStars >= 100) {
    achievements.push({
      id: "star-trending",
      title: "Trending",
      description: `${totalStars.toLocaleString("en-US")} stars earned`,
      icon: "🌟",
      value: totalStars.toLocaleString("en-US"),
    });
  } else if (totalStars >= 25) {
    achievements.push({
      id: "star-collector",
      title: "Star Collector",
      description: `${totalStars.toLocaleString("en-US")} stars earned`,
      icon: "⭐",
      value: totalStars.toLocaleString("en-US"),
    });
  } else if (totalStars >= 5) {
    achievements.push({
      id: "first-stars",
      title: "Recognized",
      description: `${totalStars.toLocaleString("en-US")} stars earned`,
      icon: "✨",
      value: totalStars.toLocaleString("en-US"),
    });
  }

  if (user.followers >= 100) {
    achievements.push({
      id: "influential",
      title: "Influential",
      description: `${user.followers.toLocaleString("en-US")} followers`,
      icon: "🚀",
      value: user.followers.toLocaleString("en-US"),
    });
  } else if (user.followers >= 25) {
    achievements.push({
      id: "community",
      title: "Community Builder",
      description: `${user.followers.toLocaleString("en-US")} followers`,
      icon: "👥",
      value: user.followers.toLocaleString("en-US"),
    });
  }

  if (topLanguages.length >= 5) {
    achievements.push({
      id: "polyglot",
      title: "Polyglot",
      description: `${topLanguages.length}+ languages used`,
      icon: "🧠",
      value: `${topLanguages.length}`,
    });
  } else if (topLanguages.length >= 3) {
    achievements.push({
      id: "multilingual",
      title: "Multilingual",
      description: `${topLanguages.length} languages used`,
      icon: "💡",
      value: `${topLanguages.length}`,
    });
  }

  if (accountAgeYears >= 7) {
    achievements.push({
      id: "legend",
      title: "GitHub Legend",
      description: `${accountAgeYears} years on GitHub`,
      icon: "🏆",
      value: `${accountAgeYears}y`,
    });
  } else if (accountAgeYears >= 3) {
    achievements.push({
      id: "veteran",
      title: "Veteran",
      description: `${accountAgeYears} years on GitHub`,
      icon: "🎖️",
      value: `${accountAgeYears}y`,
    });
  }

  if (user.public_repos >= 50) {
    achievements.push({
      id: "builder-pro",
      title: "Repository Pro",
      description: `${user.public_repos} public repositories`,
      icon: "🛠️",
      value: `${user.public_repos}`,
    });
  } else if (user.public_repos >= 15) {
    achievements.push({
      id: "builder",
      title: "Open Sourcer",
      description: `${user.public_repos} public repositories`,
      icon: "📦",
      value: `${user.public_repos}`,
    });
  }

  if (topRepos.some((r) => r.stars >= 50)) {
    achievements.push({
      id: "viral",
      title: "Went Viral",
      description: "Has a repo with 50+ stars",
      icon: "💥",
      value: `${Math.max(...topRepos.map((r) => r.stars))}★`,
    });
  }

  if (totalForks >= 25) {
    achievements.push({
      id: "forked",
      title: "Widely Forked",
      description: `${totalForks.toLocaleString("en-US")} total forks`,
      icon: "🌿",
      value: totalForks.toLocaleString("en-US"),
    });
  }

  return achievements;
}

type GraphQLPinnedResponse = {
  data?: {
    user?: {
      pinnedItems?: {
        nodes?: Array<{
          name?: string;
          description?: string | null;
          stargazerCount?: number;
          forkCount?: number;
          primaryLanguage?: { name: string } | null;
          url?: string;
        } | null>;
      };
    };
  };
  errors?: unknown;
};

async function fetchPinnedRepos(username: string): Promise<GithubRepo[] | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const query = `
    query($username: String!) {
      user(login: $username) {
        pinnedItems(first: 6, types: [REPOSITORY]) {
          nodes {
            ... on Repository {
              name
              description
              stargazerCount
              forkCount
              primaryLanguage { name }
              url
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 600 },
    });

    if (!res.ok) return null;
    const json = (await res.json()) as GraphQLPinnedResponse;
    if (json.errors) return null;

    const nodes = json.data?.user?.pinnedItems?.nodes ?? [];
    const repos: GithubRepo[] = [];
    for (const node of nodes) {
      if (!node || !node.name || !node.url) continue;
      repos.push({
        name: node.name,
        description: node.description ?? null,
        stars: node.stargazerCount ?? 0,
        forks: node.forkCount ?? 0,
        language: node.primaryLanguage?.name ?? null,
        url: node.url,
      });
    }

    return repos.length > 0 ? repos : null;
  } catch {
    return null;
  }
}

export const getGithubStats = cache(async (username: string): Promise<GithubStats | null> => {
  try {
    const [userRes, reposRes, pinnedRepos] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers: githubHeaders(),
        next: { revalidate: 600 },
      }),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100&type=owner`,
        { headers: githubHeaders(), next: { revalidate: 600 } }
      ),
      fetchPinnedRepos(username),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as GithubUser;
    const rawRepos = (await reposRes.json()) as RawRepo[];

    const ownRepos = rawRepos.filter((r) => !r.fork && !r.archived);

    const totalStars = ownRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
    const totalForks = ownRepos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

    const topRepos: GithubRepo[] =
      pinnedRepos ??
      [...ownRepos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
        .map((r) => ({
          name: r.name,
          description: r.description,
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: r.language,
          url: r.html_url,
        }));

    const langCounts: Record<string, number> = {};
    for (const r of ownRepos) {
      if (r.language) langCounts[r.language] = (langCounts[r.language] ?? 0) + 1;
    }
    const langTotal = Object.values(langCounts).reduce((a, b) => a + b, 0);
    const topLanguages: GithubLanguage[] =
      langTotal > 0
        ? Object.entries(langCounts)
            .map(([name, count]) => ({
              name,
              count,
              percentage: Math.round((count / langTotal) * 100),
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6)
        : [];

    return { user, totalStars, totalForks, topRepos, topLanguages };
  } catch {
    return null;
  }
});
