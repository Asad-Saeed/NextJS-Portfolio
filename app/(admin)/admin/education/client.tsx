"use client";

import CrudPage from "@/components/admin/CrudPage";
import { createEducation, updateEducation, deleteEducation } from "@/lib/actions/education";

const columns = [
  { key: "title", label: "Title" },
  { key: "degree", label: "Degree" },
  { key: "year", label: "Year" },
  { key: "marks", label: "Marks" },
  { key: "sort_order", label: "Order" },
];

const fields = [
  { key: "title", label: "Institution Name", placeholder: "e.g. University Name" },
  { key: "degree", label: "Degree", placeholder: "e.g. Bachelor of Engineering" },
  { key: "detail", label: "Description", type: "textarea" as const, placeholder: "Details..." },
  { key: "year", label: "Year Range", placeholder: "e.g. 2018-2022" },
  { key: "marks", label: "Marks/CGPA", placeholder: "e.g. CGPA: 3.67/4.00" },
  { key: "sort_order", label: "Sort Order", type: "number" as const, placeholder: "0" },
];

export default function EducationClient({ data }: { data: any[] }) {
  return (
    <CrudPage
      title="Education"
      data={data}
      columns={columns}
      fields={fields}
      onCreate={createEducation}
      onUpdate={updateEducation}
      onDelete={deleteEducation}
    />
  );
}
