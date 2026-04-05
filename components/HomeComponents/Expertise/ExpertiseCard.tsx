import CardLayout from "../../Common/CardLayout";
const ExpertiseCard = ({ data }: { data: any }) => {
  return (
    <CardLayout>
      <div className="h-full space-y-2 p-4 sm:p-6 card_stylings">
        <div className=" text-Snow">{data.title}</div>
        <div className="text-sm text-LightGray font-normal">{data.desc || data.description}</div>
      </div>
    </CardLayout>
  );
};

export default ExpertiseCard;
