"use client";

import CrudPage from "@/components/admin/CrudPage";
import {
  createRecommendation,
  updateRecommendation,
  deleteRecommendation,
} from "@/lib/actions/recommendations";
import { Recommendation } from "@/types";

const columns = [
  { key: "name", label: "Name" },
  { key: "designation", label: "Designation" },
  { key: "sort_order", label: "Order" },
];

const fields = [
  { key: "name", label: "Name", placeholder: "Recommender name" },
  { key: "designation", label: "Designation", placeholder: "e.g. React JS | Next JS" },
  {
    key: "view",
    label: "Recommendation Text",
    type: "textarea" as const,
    placeholder: "Recommendation...",
  },
  { key: "linkedin_url", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/..." },
  { key: "image_url", label: "Profile Photo", type: "image" as const, bucket: "recommendations" },
  { key: "sort_order", label: "Sort Order", type: "number" as const, placeholder: "0" },
];

export default function RecommendationsClient({ data }: { data: Recommendation[] }) {
  return (
    <CrudPage
      title="Recommendations"
      data={data}
      columns={columns}
      fields={fields}
      onCreate={createRecommendation}
      onUpdate={updateRecommendation}
      onDelete={deleteRecommendation}
    />
  );
}
