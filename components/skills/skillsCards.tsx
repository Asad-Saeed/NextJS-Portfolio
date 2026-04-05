import SkillCard from "./skillCard";

interface SkillsCardsProps {
  data: any[];
}

const SkillsCards = ({ data }: SkillsCardsProps) => {
  return (
    <>
      <div className="px-4 sm:px-6 py-4 text-lg font-semibold text-Green">My Skills</div>
      <div className="grid grid-flow-row md:grid-cols-2 gap-4 px-4 sm:px-6 mb-6">
        {data?.map((item: any) => (
          <SkillCard key={item.id} data={item} />
        ))}
      </div>
    </>
  );
};

export default SkillsCards;
