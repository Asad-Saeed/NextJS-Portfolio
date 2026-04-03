"use client";

import RecommendationCard from "./RecommendationCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ParagraphSkeleton from "../../Common/ParagraphSkeleton";

const Recommendations = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => axios.get("/api/recommendations").then(({ data }) => data),
  });

  return (
    <>
      <div className="px-2 md:px-8 py-4 text-lg font-bold text-Snow">Recommendations</div>
      <div className="grid w-full h-full mt-5 justify-items-start grid-flow-row md:grid-cols-2 grid-rows-auto gap-x-4 gap-y-4 px-2 md:px-8 pb-8">
        {isLoading
          ? [1, 2, 3, 4].map((i) => (
              <ParagraphSkeleton key={i} className={"p-8 h-full w-full relative"} />
            ))
          : data?.map((item: any, key: number) => <RecommendationCard key={key} data={item} />)}
      </div>
    </>
  );
};

export default Recommendations;
