import React from "react";
import CardLayout from "../Common/CardLayout";
const Edu_Card = ({ data }: { data: any }) => {
  return (
    <CardLayout className="keepItEmpty">
      <div className="card_stylings transition px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex justify-between">
          <div className="flex-initial text-[17px] text-Snow font-medium">{data.title}</div>
        </div>
        <div className="text-xs text-LightGray font-normal italic mt-1 ">{data.degree}</div>
        <div className="text-LightGray text-sm font-normal mt-4 ">{data.detail}</div>
        <div className="flex justify-between text-SilverGray bg-DeepNightBlack w-full h-auto text-xs rounded-full py-3 px-6 mt-4 font-normal">
          <div>{data.year}</div> <div>{data.marks}</div>
        </div>
      </div>
    </CardLayout>
  );
};

export default Edu_Card;
