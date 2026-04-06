"use client";

import { useState } from "react";
import { FiLoader, FiX } from "react-icons/fi";
import { updateProfile } from "@/lib/actions/profile";
import ImageUpload from "@/components/admin/ImageUpload";
import { Profile } from "@/types";

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
      { key: "linkedin_url", label: "LinkedIn URL" },
      { key: "upwork_url", label: "Upwork URL" },
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
                <button
                  onClick={() => setSubheadings(subheadings.filter((_, j) => j !== i))}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0"
                >
                  <FiX className="text-xs" />
                </button>
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
