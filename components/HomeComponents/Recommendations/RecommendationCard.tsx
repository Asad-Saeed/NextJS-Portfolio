import React from "react";
import Image from "next/image";
import CardLayout from "../../Common/CardLayout";

const RecommendationCard = ({ data }: { data: any }) => {
  const imageUrl = data?.image_url || (data?.image ? `/${data.image}` : "");
  const linkedinUrl = data?.linkedin_url || data?.linkednURL || "#";

  return (
    <CardLayout>
      <div className="p-4 sm:p-6 h-full relative card_stylings transition">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={data?.name}
            width={64}
            height={64}
            className="absolute z-10 right-10 -top-5 border-Green w-16 h-16 border-[3px] rounded-full m-0"
          />
        )}
        <div className=" text-Snow underline italic">
          <a href={linkedinUrl} target="_blank" rel="noreferrer">
            {data?.name}
          </a>
        </div>
        <div className="text-xs text-LightGray italic mt-1">{data?.designation}</div>
        <div className="text-sm mt-2 text-LightGray font-normal ">{data?.view}</div>
      </div>
    </CardLayout>
  );
};

export default RecommendationCard;
