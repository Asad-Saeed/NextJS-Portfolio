"use client";

import ExpertiseCard from "./ExpertiseCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ParagraphSkeleton from "../../Common/ParagraphSkeleton";

const MyExpertise = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["expertise"],
    queryFn: () => axios.get("/api/expertise").then(({ data }) => data),
  });

  return (
    <>
      <div className="px-2 md:px-8 py-4 text-lg font-bold text-Snow">My Expertise</div>
      <div className="grid justify items-center grid-flow-row md:grid-cols-2 lg:grid-cols-2 grid-rows-auto gap-4 px-2 md:px-8 ">
        {isLoading
          ? [1, 2, 3, 4, 5, 6].map((i) => <ParagraphSkeleton key={i} className={"space-y-2 p-8"} />)
          : data?.map((item: any, key: number) => <ExpertiseCard key={key} data={item} />)}
      </div>
    </>
  );
};

export default MyExpertise;
