"use client";

import CrudPage from "@/components/admin/CrudPage";
import {
  createCertification,
  updateCertification,
  deleteCertification,
} from "@/lib/actions/certifications";
import { Certification } from "@/types";

const columns = [
  { key: "title", label: "Certification" },
  { key: "issuer", label: "Issuer" },
  { key: "issue_date", label: "Date" },
  { key: "sort_order", label: "Order" },
];

const fields = [
  {
    key: "title",
    label: "Certification Title",
    placeholder: "e.g. AWS Certified Solutions Architect",
  },
  { key: "issuer", label: "Issuing Organization", placeholder: "e.g. Amazon Web Services" },
  { key: "issue_date", label: "Issue Date", placeholder: "e.g. Jan 2024" },
  { key: "credential_url", label: "Verification URL", placeholder: "https://..." },
  {
    key: "badge_image_url",
    label: "Badge Image",
    type: "image" as const,
    bucket: "certifications",
  },
  { key: "sort_order", label: "Sort Order", type: "number" as const, placeholder: "0" },
];

export default function CertificationsClient({ data }: { data: Certification[] }) {
  return (
    <CrudPage
      title="Certifications"
      data={data}
      columns={columns}
      fields={fields}
      onCreate={createCertification}
      onUpdate={updateCertification}
      onDelete={deleteCertification}
    />
  );
}
