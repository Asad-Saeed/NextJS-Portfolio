export const revalidate = 3600;

import { getProfileBySlug } from "@/lib/queries/profile";
import { getExpertise } from "@/lib/queries/expertise";
import { getSkills } from "@/lib/queries/skills";
import { getPortfolio } from "@/lib/queries/portfolio";
import { getExperience } from "@/lib/queries/experience";
import { getEducation } from "@/lib/queries/education";
import { getCertifications } from "@/lib/queries/certifications";
import { getPortfolioSlug } from "@/lib/portfolio-slug";
import { getSiteUrl } from "@/lib/site-url";

function stripHtml(input: string | null | undefined): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

export async function GET() {
  const slug = getPortfolioSlug();
  const siteUrl = getSiteUrl();
  const profile = await getProfileBySlug(slug);

  if (!profile) {
    return new Response("# Portfolio\n\n> Profile not found.\n", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const userId = profile.user_id;
  const [expertise, skills, projects, experience, education, certifications] = await Promise.all([
    getExpertise(userId),
    getSkills(userId),
    getPortfolio(userId),
    getExperience(userId),
    getEducation(userId),
    getCertifications(userId),
  ]);

  const name = profile.name || "Portfolio";
  const designation = profile.designation || "";
  const location =
    [profile.city, profile.residence, profile.nationality].filter(Boolean).join(", ") || "";
  const summary = truncate(
    stripHtml(profile.expertise_description) ||
      [designation, location && `Based in ${location}.`].filter(Boolean).join(" "),
    400
  );

  const lines: string[] = [];

  lines.push(`# ${name}`);
  lines.push("");
  if (summary) {
    lines.push(`> ${summary}`);
    lines.push("");
  }

  // Identity / About — keyword-rich for AI search ranking
  lines.push("## About");
  lines.push("");
  if (designation) lines.push(`- **Role:** ${designation}`);
  if (location) lines.push(`- **Location:** ${location}`);
  if (profile.availability_status) lines.push(`- **Availability:** ${profile.availability_status}`);
  if (profile.completed_projects_count)
    lines.push(`- **Completed projects:** ${profile.completed_projects_count}`);
  if (profile.freelance_clients_count)
    lines.push(`- **Freelance clients:** ${profile.freelance_clients_count}`);
  if (profile.honors_count) lines.push(`- **Honors / awards:** ${profile.honors_count}`);
  lines.push("");

  // Top-level pages
  lines.push("## Portfolio");
  lines.push("");
  lines.push(`- [Home](${siteUrl}/): Overview, expertise, GitHub activity, certifications.`);
  lines.push(
    `- [Skills](${siteUrl}/skills): Detailed proficiency across frontend, backend, and tooling.`
  );
  lines.push(`- [Background](${siteUrl}/background): Education and full work-experience timeline.`);
  lines.push(`- [Projects](${siteUrl}/portfolio): Case studies of shipped work.`);
  lines.push(`- [Contact](${siteUrl}/contact): Direct contact form and details.`);
  lines.push("");

  // Expertise — high-value keywords for "developers who do X" queries
  if (expertise.length > 0) {
    lines.push("## Expertise");
    lines.push("");
    for (const item of expertise) {
      const title = (item.title || "").trim();
      if (!title) continue;
      const desc = truncate(stripHtml(item.description), 160);
      lines.push(`- **${title}**${desc ? `: ${desc}` : ""}`);
    }
    lines.push("");
  }

  // Skills — flat list of tech names is what crawlers match against
  if (skills.length > 0) {
    const techNames = skills
      .map((s) => s.tech_name)
      .filter(Boolean)
      .join(", ");
    if (techNames) {
      lines.push("## Skills & Technologies");
      lines.push("");
      lines.push(techNames + ".");
      lines.push("");
    }
  }

  // Experience — short timeline so crawlers can answer "where has X worked?"
  if (experience.length > 0) {
    lines.push("## Experience");
    lines.push("");
    for (const exp of experience) {
      const role = (exp.role || "").trim();
      const company = (exp.title || "").trim();
      const headParts = [role, company].filter(Boolean).join(" — ");
      if (!headParts) continue;

      const year = (exp.year || "").trim();
      const loc = (exp.location || "").trim();
      const metaParts = [year, loc].filter(Boolean).join(" · ");
      lines.push(`- **${headParts}**${metaParts ? ` (${metaParts})` : ""}`);
    }
    lines.push("");
  }

  // Education
  if (education.length > 0) {
    lines.push("## Education");
    lines.push("");
    for (const edu of education) {
      const institution = (edu.title || "").trim();
      const degree = (edu.degree || "").trim();
      const head = [degree, institution].filter(Boolean).join(" — ");
      if (!head) continue;

      const year = (edu.year || "").trim();
      lines.push(`- **${head}**${year ? ` (${year})` : ""}`);
    }
    lines.push("");
  }

  // Certifications — credentials AI search uses to validate expertise claims
  if (certifications.length > 0) {
    lines.push("## Certifications");
    lines.push("");
    for (const cert of certifications) {
      const title = cert.title || "";
      const issuer = cert.issuer || "";
      const head = [title, issuer].filter(Boolean).join(" — ");
      if (head) lines.push(`- **${head}**`);
    }
    lines.push("");
  }

  // Projects — every case study gets its own URL
  if (projects.length > 0) {
    lines.push("## Projects");
    lines.push("");
    for (const project of projects) {
      const name = (project.project_name || "").trim();
      if (!project.project_slug || !name) continue;

      const techs = (project.project_technologies || [])
        .map((t) => t.tech_name)
        .filter(Boolean)
        .slice(0, 6)
        .join(", ");
      const detail = truncate(stripHtml(project.project_detail || project.challenge), 140);
      const meta = [techs && `Stack: ${techs}`, detail].filter(Boolean).join(" — ");
      lines.push(
        `- [${name}](${siteUrl}/portfolio/${project.project_slug})${meta ? `: ${meta}` : ""}`
      );
    }
    lines.push("");
  }

  // Contact — direct, machine-readable
  lines.push("## Contact");
  lines.push("");
  if (profile.email) lines.push(`- **Email:** ${profile.email}`);
  if (profile.phone) lines.push(`- **Phone / WhatsApp:** ${profile.phone}`);
  if (profile.github_url) lines.push(`- **GitHub:** ${profile.github_url}`);
  if (profile.linkedin_url) lines.push(`- **LinkedIn:** ${profile.linkedin_url}`);
  if (profile.upwork_url) lines.push(`- **Upwork:** ${profile.upwork_url}`);
  if (profile.fiverr_url) lines.push(`- **Fiverr:** ${profile.fiverr_url}`);
  if (profile.resume_url) lines.push(`- **Resume:** ${profile.resume_url}`);
  lines.push("");

  // Optional — secondary references for crawlers that read the spec strictly
  lines.push("## Optional");
  lines.push("");
  lines.push(`- [Sitemap](${siteUrl}/sitemap.xml)`);
  lines.push(`- [Robots](${siteUrl}/robots.txt)`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
