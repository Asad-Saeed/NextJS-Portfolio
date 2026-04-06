"use client";

import CrudPage from "@/components/admin/CrudPage";
import { createExpertise, updateExpertise, deleteExpertise } from "@/lib/actions/expertise";
import { Expertise } from "@/types";

const columns = [
  { key: "title", label: "Title" },
  {
    key: "description",
    label: "Description",
    render: (v: string | number | boolean | null | undefined) => {
      const s = String(v || "");
      return s.length > 80 ? s.slice(0, 80) + "..." : s;
    },
  },
  { key: "sort_order", label: "Order" },
];

const fields = [
  { key: "title", label: "Title", placeholder: "e.g. Frontend Engineer" },
  {
    key: "description",
    label: "Description",
    type: "textarea" as const,
    placeholder: "Expertise description...",
  },
  { key: "sort_order", label: "Sort Order", type: "number" as const, placeholder: "0" },
];

export default function ExpertiseClient({ data }: { data: Expertise[] }) {
  return (
    <CrudPage
      title="Expertise"
      data={data}
      columns={columns}
      fields={fields}
      onCreate={createExpertise}
      onUpdate={updateExpertise}
      onDelete={deleteExpertise}
    />
  );
}
