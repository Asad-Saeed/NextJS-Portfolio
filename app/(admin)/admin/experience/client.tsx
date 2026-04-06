"use client";

import CrudPage from "@/components/admin/CrudPage";
import { createExperience, updateExperience, deleteExperience } from "@/lib/actions/experience";
import { Experience } from "@/types";

const columns = [
  { key: "title", label: "Company" },
  { key: "role", label: "Role" },
  { key: "year", label: "Period" },
  { key: "location", label: "Location" },
  { key: "sort_order", label: "Order" },
];

const fields = [
  { key: "title", label: "Company Name", placeholder: "e.g. Global Software Consulting" },
  { key: "role", label: "Role", placeholder: "e.g. Senior Frontend Engineer" },
  { key: "url", label: "Company URL", placeholder: "https://..." },
  {
    key: "description",
    label: "Description",
    type: "textarea" as const,
    placeholder: "Job description...",
  },
  { key: "year", label: "Period", placeholder: "e.g. 06/2023 - Present" },
  { key: "location", label: "Location", placeholder: "e.g. Lahore, Pakistan" },
  { key: "sort_order", label: "Sort Order", type: "number" as const, placeholder: "0" },
];

export default function ExperienceClient({ data }: { data: Experience[] }) {
  return (
    <CrudPage
      title="Experience"
      data={data}
      columns={columns}
      fields={fields}
      onCreate={createExperience}
      onUpdate={updateExperience}
      onDelete={deleteExperience}
    />
  );
}
