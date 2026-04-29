import ReviewCard from "./ReviewCard";
import SectionHeader from "@/components/Common/SectionHeader";
import { ClientReview } from "@/types";

interface ClientReviewsProps {
  data: ClientReview[];
  eyebrow?: string;
  heading?: string;
  description?: string;
}

const ClientReviews = ({ data, eyebrow, heading, description }: ClientReviewsProps) => {
  if (!data?.length) return null;

  return (
    <section
      aria-labelledby="client-reviews-heading"
      className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto"
    >
      <SectionHeader
        id="client-reviews-heading"
        eyebrow={eyebrow ?? ""}
        title={heading ?? ""}
        description={description}
      />

      <div className="overflow-x-auto no-scrollbar -mx-5 sm:-mx-8 px-5 sm:px-8 py-2">
        <div className="flex gap-2.5 min-w-min">
          {data.map((item: ClientReview) => (
            <ReviewCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
