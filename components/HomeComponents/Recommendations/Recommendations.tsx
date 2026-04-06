import RecommendationCard from "./RecommendationCard";
import { Recommendation } from "@/types";

interface RecommendationsProps {
  data: Recommendation[];
}

const Recommendations = ({ data }: RecommendationsProps) => {
  return (
    <>
      <div className="px-4 sm:px-6 py-4 text-lg font-semibold text-Green">Recommendations</div>
      <div className="grid w-full grid-flow-row md:grid-cols-2 gap-4 px-4 sm:px-6 pb-6">
        {data?.map((item: Recommendation) => (
          <RecommendationCard key={item.id} data={item} />
        ))}
      </div>
    </>
  );
};

export default Recommendations;
