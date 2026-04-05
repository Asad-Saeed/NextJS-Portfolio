import ExpertiseCard from "./ExpertiseCard";

interface MyExpertiseProps {
  data: any[];
}

const MyExpertise = ({ data }: MyExpertiseProps) => {
  return (
    <>
      <div className="px-4 sm:px-6 py-4 text-lg font-semibold text-Green">My Expertise</div>
      <div className="grid grid-flow-row md:grid-cols-2 gap-4 px-4 sm:px-6">
        {data?.map((item: any) => (
          <ExpertiseCard key={item.id} data={item} />
        ))}
      </div>
    </>
  );
};

export default MyExpertise;
