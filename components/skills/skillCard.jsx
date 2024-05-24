import React from "react";
import ProgressBar from "./progressBar";

const SkillCard = ({ data }) => {
  return (
    <div className="card_stylings overflow-hidden h-full">
      <img
        src={data?.image}
        alt="portfolio img"
        className="w-full object-cover opacity-30 h-32 sm:h-48 md:h-64"
      />
      <div
        id="arrow"
        className="py-2 px-6 card_stylings hover:-translate-y-10 transition-all ease-in-out duration-500"
      >
        <div className="flex justify-between p-0 m-0 ">
          <h3 className="mr-2 underline italic font-semibold pt-2 text-xl text-Snow leading-tight sm:leading-normal">
            {data?.techName}
          </h3>
        </div>
        <div className="text-sm gap-3 py-4">
           {data?.skill?.map((skill, index) => {
            return <ProgressBar key={index} title={skill.title} percent={skill.level} bgColor='bg-Green' />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
