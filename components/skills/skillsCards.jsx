import { useQuery } from "react-query";
import axios from "axios";
import ImageAndParagraphSkeleton from "../Common/ImageAndParagraphSkeleton";
import SkillCard from "./skillCard";

const SkillsCards = () => {
  const { isLoading, error, data } = useQuery("skills", () =>
    axios
      .get("api/skills")
      .then(({ data }) => data)
      .catch((error) => console.error("Error fetching testimonials:", error))
  );
  return (
    <div className="grid justify items-center grid-flow-row md:grid-cols-2 grid-rows-auto gap-4 px-8 my-6">
      {isLoading
        ? [1, 2, 3, 4].map(() => (
            <ImageAndParagraphSkeleton className={"w-full object-cover"} />
          ))
        : data?.map((data, key) => <SkillCard key={key} data={data} />)}
    </div>
  );
};

export default SkillsCards;
