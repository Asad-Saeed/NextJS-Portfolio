"use client";

import CrudPage from "@/components/admin/CrudPage";
import { createExpertise, updateExpertise, deleteExpertise } from "@/lib/actions/expertise";

const columns = [
  { key: "title", label: "Title" },
  {
    key: "description",
    label: "Description",
    render: (v: string) => (v?.length > 80 ? v.slice(0, 80) + "..." : v),
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

export default function ExpertiseClient({ data }: { data: any[] }) {
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
