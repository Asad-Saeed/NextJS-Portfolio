import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const TARGET_EMAIL = process.env.EXPORT_EMAIL || "asadsaeed.dev@gmail.com";
const STRIP_FIELDS = ["id", "created_at", "updated_at", "user_id"];

function strip<T extends Record<string, unknown>>(rows: T[]): Partial<T>[] {
  return rows.map((row) => {
    const clean: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(row)) {
      if (!STRIP_FIELDS.includes(k)) clean[k] = v;
    }
    return clean as Partial<T>;
  });
}

async function fetchByUser(
  table: string,
  userId: string,
  orderBy = "sort_order"
): Promise<Record<string, unknown>[]> {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("user_id", userId)
    .order(orderBy, { ascending: true });
  if (error) {
    console.error(`  ${table}: ERROR - ${error.message}`);
    return [];
  }
  console.log(`  ${table}: ${data?.length ?? 0} rows`);
  return data ?? [];
}

async function exportData() {
  console.log(`\nFetching data for ${TARGET_EMAIL}...\n`);

  const { data: profileRows, error: profileErr } = await supabase
    .from("profile")
    .select("*")
    .eq("email", TARGET_EMAIL);

  if (profileErr) {
    console.error(`profile fetch error: ${profileErr.message}`);
    process.exit(1);
  }
  if (!profileRows || profileRows.length === 0) {
    console.error(`No profile found for email ${TARGET_EMAIL}. Aborting.`);
    process.exit(1);
  }
  if (profileRows.length > 1) {
    console.warn(`  profile: ${profileRows.length} rows found; using first by created_at`);
  }
  const profile = profileRows.sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )[0];
  const userId = profile.user_id as string;
  console.log(`  profile: 1 row (user_id=${userId})`);

  const education = await fetchByUser("education", userId);
  const experience = await fetchByUser("experience", userId);
  const expertise = await fetchByUser("expertise", userId);
  const projects = await fetchByUser("portfolio_projects", userId);
  const skills = await fetchByUser("skills", userId);
  const recommendations = await fetchByUser("recommendations", userId);
  const clientReviews = await fetchByUser("client_reviews", userId);
  const certifications = await fetchByUser("certifications", userId);
  const languages = await fetchByUser("languages", userId);
  const techStack = await fetchByUser("tech_stack", userId);
  const sidebarSkills = await fetchByUser("sidebar_skills", userId);

  // Junctions: scope by parent ids we just fetched
  const projectIds = projects.map((p) => p.id);
  const { data: projectTechsRaw } = await supabase
    .from("project_technologies")
    .select("*")
    .in("project_id", projectIds.length ? projectIds : ["00000000-0000-0000-0000-000000000000"])
    .order("sort_order", { ascending: true });
  const projectTechs = projectTechsRaw ?? [];
  console.log(`  project_technologies: ${projectTechs.length} rows`);

  const skillIds = skills.map((s) => s.id);
  const { data: skillLevelsRaw } = await supabase
    .from("skill_levels")
    .select("*")
    .in("skill_id", skillIds.length ? skillIds : ["00000000-0000-0000-0000-000000000000"])
    .order("sort_order", { ascending: true });
  const skillLevels = skillLevelsRaw ?? [];
  console.log(`  skill_levels: ${skillLevels.length} rows`);

  // Group junction rows under parent
  const projectsWithTech = projects.map((p) => {
    const techs = projectTechs
      .filter((t) => t.project_id === p.id)
      .sort((a, b) => (a.sort_order as number) - (b.sort_order as number))
      .map((t) => ({ tech_name: t.tech_name, sort_order: t.sort_order }));
    const stripped: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(p)) {
      if (!STRIP_FIELDS.includes(k)) stripped[k] = v;
    }
    stripped.technologies = techs;
    return stripped;
  });

  const skillsWithLevels = skills.map((s) => {
    const levels = skillLevels
      .filter((l) => l.skill_id === s.id)
      .sort((a, b) => (a.sort_order as number) - (b.sort_order as number))
      .map((l) => ({ title: l.title, level: l.level, sort_order: l.sort_order }));
    const stripped: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(s)) {
      if (!STRIP_FIELDS.includes(k)) stripped[k] = v;
    }
    stripped.levels = levels;
    return stripped;
  });

  const profileStripped: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(profile)) {
    if (!STRIP_FIELDS.includes(k)) profileStripped[k] = v;
  }

  const output = `// AUTO-GENERATED by scripts/export-data.ts
// Do not edit by hand. Regenerate via \`npm run export\`.
// Exported: ${new Date().toISOString()}
// Source: Supabase project ${supabaseUrl}

export const profileData = ${JSON.stringify(profileStripped, null, 2)} as const;

export const educationData = ${JSON.stringify(strip(education), null, 2)} as const;

export const experienceData = ${JSON.stringify(strip(experience), null, 2)} as const;

export const expertiseData = ${JSON.stringify(strip(expertise), null, 2)} as const;

export const portfolioProjectsData = ${JSON.stringify(projectsWithTech, null, 2)} as const;

export const skillsData = ${JSON.stringify(skillsWithLevels, null, 2)} as const;

export const recommendationsData = ${JSON.stringify(strip(recommendations), null, 2)} as const;

export const clientReviewsData = ${JSON.stringify(strip(clientReviews), null, 2)} as const;

export const certificationsData = ${JSON.stringify(strip(certifications), null, 2)} as const;

export const languagesData = ${JSON.stringify(strip(languages), null, 2)} as const;

export const techStackData = ${JSON.stringify(strip(techStack), null, 2)} as const;

export const sidebarSkillsData = ${JSON.stringify(strip(sidebarSkills), null, 2)} as const;
`;

  const outPath = path.join(process.cwd(), "scripts", "seed-data.ts");
  fs.writeFileSync(outPath, output, "utf8");

  console.log(`\nWrote ${outPath}`);
  console.log("\nCounts:");
  console.log(`  profile:         1`);
  console.log(`  education:       ${education.length}`);
  console.log(`  experience:      ${experience.length}`);
  console.log(`  expertise:       ${expertise.length}`);
  console.log(`  projects:        ${projects.length}`);
  console.log(`  project_techs:   ${projectTechs.length}`);
  console.log(`  skills:          ${skills.length}`);
  console.log(`  skill_levels:    ${skillLevels.length}`);
  console.log(`  recommendations: ${recommendations.length}`);
  console.log(`  client_reviews:  ${clientReviews.length}`);
  console.log(`  certifications:  ${certifications.length}`);
  console.log(`  languages:       ${languages.length}`);
  console.log(`  tech_stack:      ${techStack.length}`);
  console.log(`  sidebar_skills:  ${sidebarSkills.length}`);
  console.log("\nDone.");
}

exportData().catch((e) => {
  console.error(e);
  process.exit(1);
});
