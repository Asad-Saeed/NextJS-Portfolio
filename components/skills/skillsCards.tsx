import SkillCard from "./skillCard";

interface SkillsCardsProps {
  data: any[];
}

const SkillsCards = ({ data }: SkillsCardsProps) => {
  return (
    <div className="grid justify items-center grid-flow-row md:grid-cols-2 grid-rows-auto gap-4 px-8 my-6">
      {data?.map((item: any) => (
        <SkillCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default SkillsCards;
