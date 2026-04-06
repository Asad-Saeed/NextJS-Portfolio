"use client";

import CrudPage from "@/components/admin/CrudPage";
import { createReview, updateReview, deleteReview } from "@/lib/actions/reviews";

const columns = [
  { key: "client_name", label: "Client" },
  { key: "client_location", label: "Location" },
  {
    key: "client_review",
    label: "Review",
    render: (v: string) => (v?.length > 60 ? v.slice(0, 60) + "..." : v),
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

export default function ReviewsClient({ data }: { data: any[] }) {
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
