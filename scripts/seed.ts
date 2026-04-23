import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import {
  profileData,
  educationData,
  experienceData,
  expertiseData,
  portfolioProjectsData,
  skillsData,
  recommendationsData,
  clientReviewsData,
  certificationsData,
  languagesData,
  techStackData,
  sidebarSkillsData,
} from "./seed-data";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const TARGET_EMAIL = process.env.SEED_EMAIL || "asadsaeed.dev@gmail.com";

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

type ProjectWithTechs = (typeof portfolioProjectsData)[number] & {
  technologies: ReadonlyArray<{ tech_name: string; sort_order: number }>;
};
type SkillWithLevels = (typeof skillsData)[number] & {
  levels: ReadonlyArray<{ title: string; level: string; sort_order: number }>;
};

async function resolveUserId(): Promise<string> {
  const { data, error } = await supabase
    .from("profile")
    .select("user_id")
    .eq("email", TARGET_EMAIL);
  if (error) throw new Error(`profile lookup failed: ${error.message}`);
  if (!data || data.length === 0) {
    const { data: authList, error: authErr } = await supabase.auth.admin.listUsers();
    if (authErr) throw new Error(`auth.admin.listUsers failed: ${authErr.message}`);
    const u = authList.users.find((x) => x.email === TARGET_EMAIL);
    if (!u) throw new Error(`No auth user for ${TARGET_EMAIL}`);
    return u.id;
  }
  return data[0].user_id as string;
}

async function clearUserData(userId: string) {
  console.log("🗑  Clearing existing data for user...");
  await supabase.from("portfolio_projects").delete().eq("user_id", userId);
  await supabase.from("skills").delete().eq("user_id", userId);
  await supabase.from("education").delete().eq("user_id", userId);
  await supabase.from("experience").delete().eq("user_id", userId);
  await supabase.from("expertise").delete().eq("user_id", userId);
  await supabase.from("recommendations").delete().eq("user_id", userId);
  await supabase.from("client_reviews").delete().eq("user_id", userId);
  await supabase.from("certifications").delete().eq("user_id", userId);
  await supabase.from("languages").delete().eq("user_id", userId);
  await supabase.from("tech_stack").delete().eq("user_id", userId);
  await supabase.from("sidebar_skills").delete().eq("user_id", userId);
  await supabase.from("profile").delete().eq("user_id", userId);
  console.log("  Cleared\n");
}

async function seed() {
  console.log(`🌱 Seeding portfolio from seed-data.ts for ${TARGET_EMAIL}...\n`);

  const userId = await resolveUserId();
  console.log(`  user_id: ${userId}\n`);

  await clearUserData(userId);

  console.log("📊 Inserting data...\n");

  const { error: profileErr } = await supabase
    .from("profile")
    .insert({ ...profileData, user_id: userId });
  console.log(profileErr ? `  profile ERROR: ${profileErr.message}` : "  profile seeded");

  const simpleTables: Array<[string, ReadonlyArray<Record<string, unknown>>]> = [
    ["education", educationData],
    ["experience", experienceData],
    ["expertise", expertiseData],
    ["recommendations", recommendationsData],
    ["client_reviews", clientReviewsData],
    ["certifications", certificationsData],
    ["languages", languagesData],
    ["tech_stack", techStackData],
    ["sidebar_skills", sidebarSkillsData],
  ];
  for (const [table, data] of simpleTables) {
    if (data.length === 0) {
      console.log(`  ${table}: (empty, skipped)`);
      continue;
    }
    const rows = data.map((r) => ({ ...r, user_id: userId }));
    const { error } = await supabase.from(table).insert(rows);
    console.log(
      error ? `  ${table} ERROR: ${error.message}` : `  ${table} seeded (${rows.length})`
    );
  }

  let projCount = 0;
  for (const p of portfolioProjectsData as ReadonlyArray<ProjectWithTechs>) {
    const { technologies, ...projectRow } = p;
    const { data: inserted, error: perr } = await supabase
      .from("portfolio_projects")
      .insert({ ...projectRow, user_id: userId })
      .select("id")
      .single();
    if (perr) {
      console.error(`  project ERROR (${projectRow.project_name}): ${perr.message}`);
      continue;
    }
    if (technologies && technologies.length > 0) {
      const techRows = technologies.map((t, i) => ({
        project_id: inserted.id,
        tech_name: t.tech_name,
        sort_order: t.sort_order ?? i,
      }));
      const { error: terr } = await supabase.from("project_technologies").insert(techRows);
      if (terr) console.error(`  techs ERROR (${projectRow.project_name}): ${terr.message}`);
    }
    projCount++;
  }
  console.log(`  portfolio_projects seeded (${projCount} projects + technologies)`);

  let skillCount = 0;
  for (const s of skillsData as ReadonlyArray<SkillWithLevels>) {
    const { levels, ...skillRow } = s;
    const { data: inserted, error: serr } = await supabase
      .from("skills")
      .insert({ ...skillRow, user_id: userId })
      .select("id")
      .single();
    if (serr) {
      console.error(`  skill ERROR (${skillRow.tech_name}): ${serr.message}`);
      continue;
    }
    if (levels && levels.length > 0) {
      const levelRows = levels.map((l, i) => ({
        skill_id: inserted.id,
        title: l.title,
        level: l.level,
        sort_order: l.sort_order ?? i,
      }));
      const { error: lerr } = await supabase.from("skill_levels").insert(levelRows);
      if (lerr) console.error(`  levels ERROR (${skillRow.tech_name}): ${lerr.message}`);
    }
    skillCount++;
  }
  console.log(`  skills seeded (${skillCount} skills + levels)`);

  console.log("\n✅ Seed complete.");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
