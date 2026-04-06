import { config } from "dotenv";
config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, serviceRoleKey);
const publicDir = path.join(process.cwd(), "public");

async function uploadFile(bucket: string, filePath: string, storagePath: string) {
  const file = fs.readFileSync(filePath);
  const ext = filePath.split(".").pop()?.toLowerCase();
  const contentType =
    ext === "png" ? "image/png" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";

  const { error } = await supabase.storage.from(bucket).upload(storagePath, file, {
    upsert: true,
    contentType,
  });
  if (error) console.error(`  Upload error: ${error.message}`);
  else console.log(`  Uploaded ${bucket}/${storagePath}`);

  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${storagePath}`;
}

async function seed() {
  console.log("🌱 Seeding banner assets...\n");

  // Upload emoji image
  const emojiPath = path.join(publicDir, "images/emoji.png");
  let emojiUrl = "";
  if (fs.existsSync(emojiPath)) {
    emojiUrl = await uploadFile("profile", emojiPath, "emoji.png");
  }

  // Upload background image
  const bgPath = path.join(publicDir, "images/background.png");
  let bgUrl = "";
  if (fs.existsSync(bgPath)) {
    bgUrl = await uploadFile("profile", bgPath, "background.png");
  }

  // Update profile with banner URLs
  const { error } = await supabase
    .from("profile")
    .update({
      banner_emoji_url: emojiUrl,
      banner_image_url: bgUrl,
      explore_button_text: "Explore",
      explore_button_url: "https://www.upwork.com/freelancers/~01c9dc528b3e2edcde",
    })
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (error) console.error("Update error:", error.message);
  else console.log("\n✅ Profile updated with banner URLs");
}

seed().catch(console.error);
