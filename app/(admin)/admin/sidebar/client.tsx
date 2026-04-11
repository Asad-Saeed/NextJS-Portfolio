"use client";

import CrudPage from "@/components/admin/CrudPage";
import {
  createLanguage,
  updateLanguage,
  deleteLanguage,
  createTechStack,
  updateTechStack,
  deleteTechStack,
  createSidebarSkill,
  updateSidebarSkill,
  deleteSidebarSkill,
} from "@/lib/actions/sidebar";
import { Language, TechStack, SidebarSkill } from "@/types";

interface SidebarClientProps {
  languages: Language[];
  techStack: TechStack[];
  sidebarSkills: SidebarSkill[];
}

export default function SidebarClient({ languages, techStack, sidebarSkills }: SidebarClientProps) {
  return (
    <div className="flex flex-col gap-12">
      <CrudPage
        title="Languages"
        data={languages}
        columns={[
          { key: "name", label: "Language" },
          { key: "proficiency", label: "Proficiency %" },
          { key: "sort_order", label: "Order" },
        ]}
        fields={[
          { key: "name", label: "Language Name", placeholder: "e.g. English" },
          { key: "proficiency", label: "Proficiency (%)", type: "number", placeholder: "98" },
          { key: "sort_order", label: "Sort Order", type: "number", placeholder: "0" },
        ]}
        onCreate={createLanguage}
        onUpdate={updateLanguage}
        onDelete={deleteLanguage}
      />

      <CrudPage
        title="Sidebar Skills"
        data={sidebarSkills}
        columns={[
          { key: "title", label: "Skill" },
          { key: "level", label: "Level" },
          { key: "sort_order", label: "Order" },
        ]}
        fields={[
          { key: "title", label: "Skill Title", placeholder: "e.g. React Js" },
          { key: "level", label: "Level", placeholder: "e.g. 95%" },
          { key: "sort_order", label: "Sort Order", type: "number", placeholder: "0" },
        ]}
        onCreate={createSidebarSkill}
        onUpdate={updateSidebarSkill}
        onDelete={deleteSidebarSkill}
      />

      <CrudPage
        title="Tech Stack Badges"
        data={techStack}
        columns={[
          { key: "name", label: "Technology" },
          { key: "sort_order", label: "Order" },
        ]}
        fields={[
          { key: "name", label: "Technology Name", placeholder: "e.g. ReactJS" },
          { key: "sort_order", label: "Sort Order", type: "number", placeholder: "0" },
        ]}
        onCreate={createTechStack}
        onUpdate={updateTechStack}
        onDelete={deleteTechStack}
      />
    </div>
  );
}
