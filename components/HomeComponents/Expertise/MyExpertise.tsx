import ExpertiseCard from "./ExpertiseCard";

interface MyExpertiseProps {
  data: any[];
}

const MyExpertise = ({ data }: MyExpertiseProps) => {
  return (
    <>
      <div className="px-2 md:px-8 py-4 text-lg font-bold text-Snow">My Expertise</div>
      <div className="grid justify items-center grid-flow-row md:grid-cols-2 lg:grid-cols-2 grid-rows-auto gap-4 px-2 md:px-8 ">
        {data?.map((item: any) => (
          <ExpertiseCard key={item.id} data={item} />
        ))}
      </div>
    </>
  );
};

export default MyExpertise;
