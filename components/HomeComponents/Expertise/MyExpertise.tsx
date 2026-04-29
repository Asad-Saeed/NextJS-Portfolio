import ExpertiseCard from "./ExpertiseCard";
import SectionHeader from "@/components/Common/SectionHeader";
import { Expertise } from "@/types";

interface MyExpertiseProps {
  data: Expertise[];
  eyebrow?: string;
  heading?: string;
  description?: string;
}

const MyExpertise = ({ data, eyebrow, heading, description }: MyExpertiseProps) => {
  if (!data?.length) return null;

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto"
    >
      <SectionHeader
        id="expertise-heading"
        eyebrow={eyebrow ?? ""}
        title={heading ?? ""}
        description={description}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((item: Expertise, idx: number) => (
          <ExpertiseCard key={item.id} data={item} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default MyExpertise;
