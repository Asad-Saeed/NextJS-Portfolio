"use client";

import { useState } from "react";
import { FiLoader, FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { updateProfile } from "@/lib/actions/profile";
import ImageUpload from "@/components/admin/ImageUpload";
import { parseGithubUsername } from "@/lib/github";
import { Profile } from "@/types";
import Tooltip from "@/components/Common/Tooltip";

const sections = [
  {
    title: "Personal Info",
    fields: [
      { key: "name", label: "Full Name" },
      { key: "designation", label: "Designation" },
      { key: "residence", label: "Residence" },
      { key: "nationality", label: "Nationality" },
      { key: "city", label: "City" },
      { key: "age", label: "Age" },
    ],
  },
  {
    title: "Contact",
    fields: [
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
    ],
  },
  {
    title: "Social Links",
    fields: [
      { key: "github_url", label: "GitHub URL" },
      { key: "secondary_github_url", label: "Secondary GitHub URL (optional)" },
      { key: "linkedin_url", label: "LinkedIn URL" },
      { key: "upwork_url", label: "Upwork URL" },
      { key: "fiverr_url", label: "Fiverr URL (optional)" },
    ],
  },
  {
    title: "Banner Page Headings",
    fields: [
      { key: "banner_heading", label: "Home Page Heading" },
      { key: "skills_banner_heading", label: "Skills Page Heading" },
      { key: "background_banner_heading", label: "Background Page Heading" },
      { key: "portfolio_banner_heading", label: "Portfolio Page Heading" },
      { key: "contact_banner_heading", label: "Contact Page Heading" },
    ],
  },
  {
    title: "Banner Stats & Button",
    fields: [
      { key: "completed_projects_count", label: "Completed Projects Count" },
      { key: "freelance_clients_count", label: "Companies Worked Count" },
      { key: "honors_count", label: "Honors & Awards Count" },
      { key: "explore_button_text", label: "Explore Button Text" },
      { key: "explore_button_url", label: "Explore Button URL" },
    ],
  },
  {
    title: "Footer",
    fields: [
      { key: "footer_text", label: "Footer Text" },
      { key: "copyright_year", label: "Copyright Year" },
    ],
  },
  {
    title: "Hero Code Card",
    fields: [
      {
        key: "code_card_stack",
        label: "Stack chips (comma-separated, max 3) — e.g. TypeScript, React, Next.js",
      },
    ],
  },
  {
    title: "Section: Expertise",
    fields: [
      { key: "expertise_eyebrow", label: "Eyebrow (e.g. Capabilities)" },
      { key: "expertise_heading", label: "Heading (e.g. What I build)" },
      { key: "expertise_description", label: "Description" },
    ],
  },
  {
    title: "Section: Certifications",
    fields: [
      { key: "certifications_eyebrow", label: "Eyebrow" },
      { key: "certifications_heading", label: "Heading" },
      { key: "certifications_description", label: "Description" },
    ],
  },
  {
    title: "Section: Recommendations",
    fields: [
      { key: "recommendations_eyebrow", label: "Eyebrow" },
      { key: "recommendations_heading", label: "Heading" },
      { key: "recommendations_description", label: "Description" },
    ],
  },
  {
    title: "Section: Client Reviews",
    fields: [
      { key: "reviews_eyebrow", label: "Eyebrow" },
      { key: "reviews_heading", label: "Heading" },
      { key: "reviews_description", label: "Description" },
    ],
  },
  {
    title: "Section: Skills Page",
    fields: [
      { key: "skills_eyebrow", label: "Eyebrow" },
      { key: "skills_heading", label: "Heading" },
      { key: "skills_description", label: "Description" },
    ],
  },
  {
    title: "Section: Background — Experience",
    fields: [
      { key: "experience_eyebrow", label: "Eyebrow (e.g. Career)" },
      { key: "experience_heading", label: "Heading (e.g. Experience)" },
      { key: "experience_description", label: "Description" },
    ],
  },
  {
    title: "Section: Background — Education",
    fields: [
      { key: "education_eyebrow", label: "Eyebrow (e.g. Studies)" },
      { key: "education_heading", label: "Heading (e.g. Education)" },
      { key: "education_description", label: "Description" },
    ],
  },
  {
    title: "Section: Portfolio Page",
    fields: [
      { key: "portfolio_eyebrow", label: "Eyebrow (e.g. Selected work)" },
      { key: "portfolio_heading", label: "Heading (e.g. Projects)" },
      { key: "portfolio_description", label: "Description" },
    ],
  },
  {
    title: "Section: Contact — Info",
    fields: [
      { key: "contact_eyebrow", label: "Eyebrow (e.g. Reach out)" },
      { key: "contact_heading", label: "Heading (e.g. Contact information)" },
      { key: "contact_description", label: "Description" },
    ],
  },
  {
    title: "Section: Contact — Form",
    fields: [
      { key: "contact_form_eyebrow", label: "Eyebrow (e.g. Inbox)" },
      { key: "contact_form_heading", label: "Heading (e.g. Send a message)" },
      { key: "contact_form_description", label: "Description" },
    ],
  },
  {
    title: "Section: GitHub — Activity",
    fields: [{ key: "github_section_heading", label: "Heading (default: GitHub Activity)" }],
  },
  {
    title: "Section: GitHub — Stats",
    fields: [
      { key: "github_stats_eyebrow", label: "Eyebrow (default: Profile)" },
      { key: "github_stats_heading", label: "Heading (default: Stats)" },
    ],
  },
  {
    title: "Section: GitHub — Top Languages",
    fields: [
      { key: "github_languages_eyebrow", label: "Eyebrow (default: Composition)" },
      { key: "github_languages_heading", label: "Heading (default: Top Languages)" },
    ],
  },
  {
    title: "Section: GitHub — Featured Repos",
    fields: [
      { key: "github_repos_eyebrow", label: "Eyebrow (default: Open source)" },
      { key: "github_repos_heading", label: "Heading (default: Featured Repositories)" },
    ],
  },
  {
    title: "Section: GitHub — Achievements",
    fields: [
      { key: "github_achievements_eyebrow", label: "Eyebrow (default: Milestones)" },
      { key: "github_achievements_heading", label: "Heading (default: Achievements)" },
    ],
  },
  {
    title: "Section: Blog",
    fields: [
      { key: "blog_eyebrow", label: "Eyebrow (default: Writing)" },
      { key: "blog_heading", label: "Heading (default: Thoughts & Tutorials)" },
      { key: "blog_description", label: "Description" },
    ],
  },
];

export default function ProfileClient({ profile }: { profile: Profile | null }) {
  const [form, setForm] = useState<Record<string, unknown>>(
    (profile as unknown as Record<string, unknown>) ?? {}
  );
  const [subheadings, setSubheadings] = useState<string[]>(profile?.banner_subheadings || []);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const result = await updateProfile({
      ...form,
      banner_subheadings: subheadings.filter(Boolean),
    });
    setLoading(false);
    if (result?.error) setError(result.error);
    else setSuccess(true);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-Snow text-2xl font-bold">Profile & Banner</h1>
          <p className="text-LightGray text-sm mt-1">Edit your personal info, links, and banner</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="button flex items-center justify-center gap-2 disabled:opacity-50 w-full sm:w-auto"
        >
          {loading && <FiLoader className="animate-spin" />}
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {success && (
        <div className="text-Green text-sm bg-Green/10 rounded-lg p-3 mb-4">
          Profile updated successfully!
        </div>
      )}
      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 rounded-lg p-3 mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div key={section.title} className="card_stylings p-6">
            <h2 className="text-Snow text-base font-semibold mb-4">{section.title}</h2>
            <div className="flex flex-col gap-3">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label className="text-LightGray text-xs mb-1 block">{field.label}</label>
                  <input
                    value={String(form[field.key] || "")}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Availability Status */}
        <div className="card_stylings p-6">
          <h2 className="text-Snow text-base font-semibold mb-4">Availability Status</h2>
          <div className="flex flex-col gap-3">
            <p className="text-LightGray text-xs">
              Shown as a badge below your name in the sidebar. Recruiters look for this first.
            </p>
            <div className="flex flex-col gap-2">
              {[
                { value: "open_to_work", label: "Open to Work", dot: "bg-emerald-400" },
                { value: "freelance", label: "Available for Freelance", dot: "bg-amber-400" },
                { value: "not_available", label: "Not Available (hidden)", dot: "bg-SlateGray" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 cursor-pointer select-none rounded-lg p-3 border transition-colors ${
                    form.availability_status === opt.value
                      ? "border-Green/40 bg-Green/5"
                      : "border-DarkGray/50 hover:border-DarkGray"
                  }`}
                >
                  <input
                    type="radio"
                    name="availability_status"
                    value={opt.value}
                    checked={form.availability_status === opt.value}
                    onChange={(e) => setForm({ ...form, availability_status: e.target.value })}
                    className="sr-only"
                  />
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${opt.dot}`} />
                  <span className="text-Snow text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Media section with upload */}
        <div className="card_stylings p-6">
          <h2 className="text-Snow text-base font-semibold mb-4">Media</h2>
          <div className="flex flex-col gap-5">
            <ImageUpload
              label="Profile Image"
              value={String(form.profile_image_url || "")}
              onChange={(url) => setForm({ ...form, profile_image_url: url })}
              bucket="profile"
            />
            <ImageUpload
              label="Banner Background Image"
              value={String(form.banner_image_url || "")}
              onChange={(url) => setForm({ ...form, banner_image_url: url })}
              bucket="profile"
            />
            <ImageUpload
              label="Banner Character/Emoji Image"
              value={String(form.banner_emoji_url || "")}
              onChange={(url) => setForm({ ...form, banner_emoji_url: url })}
              bucket="profile"
            />
            <ImageUpload
              label="Resume PDF"
              value={String(form.resume_url || "")}
              onChange={(url) => setForm({ ...form, resume_url: url })}
              bucket="documents"
              accept=".pdf,application/pdf"
            />
          </div>
        </div>

        {/* Home Page Sections */}
        <div className="card_stylings p-6">
          <h2 className="text-Snow text-base font-semibold mb-4">Home Page Sections</h2>
          <div className="flex flex-col gap-3">
            {[
              {
                key: "show_github_section",
                label: "GitHub Activity",
                desc: "Contribution graph, stats, top languages, and featured repositories.",
              },
              {
                key: "show_expertise_section",
                label: "My Expertise",
                desc: "Show expertise cards on the home page.",
              },
              {
                key: "show_certifications_section",
                label: "Certifications",
                desc: "Show your professional certifications and badges on the home page.",
              },
              {
                key: "show_recommendations_section",
                label: "Recommendations",
                desc: "Show LinkedIn-style recommendations on the home page.",
              },
              {
                key: "show_reviews_section",
                label: "Client Reviews",
                desc: "Show client review testimonials on the home page.",
              },
            ].map((item) => (
              <label key={item.key} className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form[item.key] !== false}
                  onChange={(e) => setForm({ ...form, [item.key]: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-Green cursor-pointer"
                />
                <div className="flex-1">
                  <div className="text-Snow text-sm font-medium">{item.label}</div>
                  <div className="text-LightGray text-xs mt-0.5">{item.desc}</div>
                </div>
              </label>
            ))}
          </div>

          {/* GitHub settings (shown when GitHub section is enabled) */}
          {form.show_github_section !== false && (
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-DarkGray/30">
              <div>
                <label className="text-LightGray text-xs mb-1 block">GitHub Section Heading</label>
                <input
                  value={String(form.github_section_heading || "")}
                  onChange={(e) => setForm({ ...form, github_section_heading: e.target.value })}
                  placeholder="GitHub Activity"
                  className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                />
              </div>

              {(() => {
                const username = parseGithubUsername(String(form.github_url || ""));
                if (!form.github_url) {
                  return (
                    <div className="text-xs text-yellow-400 bg-yellow-400/10 rounded-lg p-3 border border-yellow-400/20">
                      Enter your GitHub URL in the Social Links section above for this to work.
                    </div>
                  );
                }
                if (!username) {
                  return (
                    <div className="text-xs text-red-400 bg-red-400/10 rounded-lg p-3 border border-red-400/20">
                      Could not parse a GitHub username from your URL. Expected format:
                      https://github.com/your-username
                    </div>
                  );
                }
                return (
                  <div className="text-xs text-LightGray bg-DeepNightBlack rounded-lg p-3 border border-DarkGray/50">
                    Detected username: <span className="text-Green font-semibold">{username}</span>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Blog Post — Related Posts */}
        <div className="card_stylings p-6">
          <h2 className="text-Snow text-base font-semibold mb-1">Blog Post Settings</h2>
          <p className="text-LightGray text-xs mb-4">
            Controls for the individual blog post detail page.
          </p>
          <div className="flex flex-col gap-4">
            {/* Toggle */}
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.show_related_posts !== false}
                onChange={(e) => setForm({ ...form, show_related_posts: e.target.checked })}
                className="mt-1 w-4 h-4 accent-Green cursor-pointer"
              />
              <div className="flex-1">
                <div className="text-Snow text-sm font-medium">Show Related Posts</div>
                <div className="text-LightGray text-xs mt-0.5">
                  Display a &ldquo;Keep Reading&rdquo; section at the end of each post with posts
                  sharing the same tags.
                </div>
              </div>
            </label>

            {/* Heading fields — only visible when enabled */}
            {form.show_related_posts !== false && (
              <div className="flex flex-col gap-3 pl-7">
                <div>
                  <label className="text-LightGray text-xs mb-1 block">
                    Eyebrow <span className="text-DarkGray">(default: Related Posts)</span>
                  </label>
                  <input
                    value={String(form.related_posts_eyebrow || "")}
                    onChange={(e) => setForm({ ...form, related_posts_eyebrow: e.target.value })}
                    placeholder="Related Posts"
                    className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                  />
                </div>
                <div>
                  <label className="text-LightGray text-xs mb-1 block">
                    Heading <span className="text-DarkGray">(default: Keep Reading)</span>
                  </label>
                  <input
                    value={String(form.related_posts_heading || "")}
                    onChange={(e) => setForm({ ...form, related_posts_heading: e.target.value })}
                    placeholder="Keep Reading"
                    className="w-full bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Typewriter Subheadings */}
        <div className="card_stylings p-6">
          <h2 className="text-Snow text-base font-semibold mb-4">Typewriter Subheadings</h2>
          <div className="flex flex-col gap-2">
            {subheadings.map((s, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  value={s}
                  onChange={(e) => {
                    const n = [...subheadings];
                    n[i] = e.target.value;
                    setSubheadings(n);
                  }}
                  className="flex-1 bg-DeepNightBlack text-Snow text-sm rounded-lg border border-DarkGray/50 outline-none p-3 focus:border-Green"
                  placeholder="e.g. React.Js Engineer"
                />
                <Tooltip content="Remove">
                  <button
                    onClick={() => setSubheadings(subheadings.filter((_, j) => j !== i))}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0"
                  >
                    <FiX className="text-xs" />
                  </button>
                </Tooltip>
              </div>
            ))}
            <button
              onClick={() => setSubheadings([...subheadings, ""])}
              className="text-Green text-xs hover:underline mt-1"
            >
              + Add Subheading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
