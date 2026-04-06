import ReviewCard from "./ReviewCard";
import { ClientReview } from "@/types";

interface ClientReviewsProps {
  data: ClientReview[];
}

const ClientReviews = ({ data }: ClientReviewsProps) => {
  return (
    <>
      <div className="px-4 sm:px-6 py-4 text-lg font-semibold text-Green">Clients Reviews</div>
      <div className="overflow-x-auto w-full grid justify-items-center grid-flow-col gap-4 px-4 sm:px-6 pt-2 pb-4">
        {data?.map((item: ClientReview) => (
          <ReviewCard key={item.id} data={item} />
        ))}
      </div>
    </>
  );
};

export default ClientReviews;
