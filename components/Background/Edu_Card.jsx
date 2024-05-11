import React from "react";
import CardLayout from "../Common/CardLayout";

const Edu_Card = ({ data }) => {
  return (
    <CardLayout className="keepItEmpty">
      <div className="card_stylings transition px-8 py-10">
        <div className="flex justify-between">
          <div className="flex-initial text-[17px] text-Snow font-medium">
            {data.title}
          </div>
        </div>
        <div className="text-xs text-LightGray font-normal italic mt-1 ">
          {data.degree}
        </div>
        <div className="text-LightGray text-sm font-normal mt-4 ">
          {data.detail}
        </div>
        <div className="flex justify-between text-LightGray bg-DeepNightBlack w-full h-auto text-xs rounded-full py-3 px-6 mt-4 font-normal opacity-50">
          <div>{data.year}</div> <div>{data.marks}</div>
        </div>
      </div>
    </CardLayout>
  );
};

export default Edu_Card;
