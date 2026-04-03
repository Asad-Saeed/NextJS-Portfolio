"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ImageAndParagraphSkeleton from "../Common/ImageAndParagraphSkeleton";
import SkillCard from "./skillCard";

const SkillsCards = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["skills"],
    queryFn: () => axios.get("/api/skills").then(({ data }) => data),
  });
  return (
    <div className="grid justify items-center grid-flow-row md:grid-cols-2 grid-rows-auto gap-4 px-8 my-6">
      {isLoading
        ? [1, 2, 3, 4].map((i) => (
            <ImageAndParagraphSkeleton key={i} className={"w-full object-cover"} />
          ))
        : data?.map((item: any, key: number) => <SkillCard key={key} data={item} />)}
    </div>
  );
};

export default SkillsCards;
