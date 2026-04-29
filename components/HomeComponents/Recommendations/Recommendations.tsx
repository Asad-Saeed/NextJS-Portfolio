import RecommendationCard from "./RecommendationCard";
import SectionHeader from "@/components/Common/SectionHeader";
import { Recommendation } from "@/types";

interface RecommendationsProps {
  data: Recommendation[];
  eyebrow?: string;
  heading?: string;
  description?: string;
}

const Recommendations = ({ data, eyebrow, heading, description }: RecommendationsProps) => {
  if (!data?.length) return null;

  return (
    <section
      aria-labelledby="recommendations-heading"
      className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto"
    >
      <SectionHeader
        id="recommendations-heading"
        eyebrow={eyebrow ?? ""}
        title={heading ?? ""}
        description={description}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data.map((item: Recommendation) => (
          <RecommendationCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
