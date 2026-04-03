"use client";

import ReviewCard from "./ReviewCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ParagraphSkeleton from "../../Common/ParagraphSkeleton";

const ClientReviews = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["review"],
    queryFn: () => axios.get("/api/review").then(({ data }) => data),
  });

  return (
    <>
      <div className="px-2 md:px-8 py-4 text-lg font-bold text-Snow">Clients Reviews</div>
      <div className="overflow-x-auto w-full grid  justify-items-center grid-flow-col gap-4 px-2 md:px-8 pt-2 pb-4">
        {isLoading
          ? [1, 2, 3, 4, 5].map((i) => (
              <ParagraphSkeleton key={i} className="w-80 md:w-96 h-full p-4 md:p-8" />
            ))
          : data?.map((item: any, key: number) => <ReviewCard key={key} data={item} />)}
      </div>
    </>
  );
};

export default ClientReviews;
