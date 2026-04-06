import React from "react";
import Image from "next/image";
import ProgressBar from "./progressBar";

const SkillCard = ({ data }: { data: any }) => {
  const imageUrl = data?.image_url || (data?.image ? `/${data.image}` : "");
  const techName = data?.tech_name || data?.techName;
  const levels = data?.skill_levels || data?.skill || [];

  return (
    <div className="bg-EveningBlack/95 border border-DarkGray/30 rounded-xl overflow-hidden h-full">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={techName}
          width={600}
          height={400}
          className="w-full object-cover opacity-30 h-24 sm:h-48 md:h-64"
        />
      )}
      <div
        id="arrow"
        className="py-2 px-4 sm:px-6 bg-EveningBlack/95 hover:-translate-y-10 transition-all ease-in-out duration-500"
      >
        <div className="flex justify-between p-0 m-0">
          <h3 className="mr-2 font-semibold py-2 text-base sm:text-xl text-Snow leading-tight sm:leading-normal">
            {techName}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-LightGray my-1">{data?.description}</p>
        <div className="text-sm gap-3 py-2 sm:py-4">
          {levels?.map((skill: any, index: number) => (
            <ProgressBar key={index} title={skill.title} percent={skill.level} bgColor="bg-Green" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
