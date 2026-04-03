"use client";

import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { updateProfile } from "@/lib/actions/profile";
import ImageUpload from "@/components/admin/ImageUpload";

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
    title: "Banner Content",
    fields: [
      { key: "banner_heading", label: "Banner Heading" },
      { key: "completed_projects_count", label: "Completed Projects Count" },
      { key: "freelance_clients_count", label: "Freelance Clients Count" },
      { key: "honors_count", label: "Honors & Awards Count" },
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

export default function ProfileClient({ profile }: { profile: any }) {
  const [form, setForm] = useState<Record<string, any>>(profile || {});
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-Snow text-2xl font-bold">Profile & Banner</h1>
          <p className="text-LightGray text-sm mt-1">Edit your personal info, links, and banner</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="button flex items-center gap-2 disabled:opacity-50"
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
                    value={form[field.key] || ""}
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
              value={form.profile_image_url || ""}
              onChange={(url) => setForm({ ...form, profile_image_url: url })}
              bucket="profile"
            />
            <ImageUpload
              label="Banner Image"
              value={form.banner_image_url || ""}
              onChange={(url) => setForm({ ...form, banner_image_url: url })}
              bucket="profile"
            />
            <ImageUpload
              label="Resume PDF"
              value={form.resume_url || ""}
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
              <div key={i} className="flex gap-2">
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
                  className="text-red-400 hover:text-red-300 px-2"
                >
                  Remove
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
