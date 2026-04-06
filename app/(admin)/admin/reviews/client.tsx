"use client";

import CrudPage from "@/components/admin/CrudPage";
import { createReview, updateReview, deleteReview } from "@/lib/actions/reviews";
import { ClientReview } from "@/types";

const columns = [
  { key: "client_name", label: "Client" },
  { key: "client_location", label: "Location" },
  {
    key: "client_review",
    label: "Review",
    render: (v: string | number | boolean | null | undefined) => {
      const s = String(v || "");
      return s.length > 60 ? s.slice(0, 60) + "..." : s;
    },
  },
  { key: "sort_order", label: "Order" },
];

const fields = [
  { key: "client_name", label: "Client Name", placeholder: "Client name" },
  { key: "client_location", label: "Location", placeholder: "e.g. United Kingdom" },
  { key: "client_source", label: "Source", placeholder: "e.g. Upwork" },
  {
    key: "client_review",
    label: "Review Text",
    type: "textarea" as const,
    placeholder: "Review...",
  },
  { key: "sort_order", label: "Sort Order", type: "number" as const, placeholder: "0" },
];

export default function ReviewsClient({ data }: { data: ClientReview[] }) {
  return (
    <CrudPage
      title="Reviews"
      data={data}
      columns={columns}
      fields={fields}
      onCreate={createReview}
      onUpdate={updateReview}
      onDelete={deleteReview}
    />
  );
}
