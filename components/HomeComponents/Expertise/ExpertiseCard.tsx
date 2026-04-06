import CardLayout from "../../Common/CardLayout";
import { Expertise } from "@/types";
const ExpertiseCard = ({ data }: { data: Expertise }) => {
  return (
    <CardLayout>
      <div className="h-full space-y-2 p-4 sm:p-6 card_stylings">
        <div className=" text-Snow">{data.title}</div>
        <div className="text-sm text-LightGray font-normal">{data.description}</div>
      </div>
    </CardLayout>
  );
};

export default ExpertiseCard;
