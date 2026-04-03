import React from "react";

interface LinearBarProps {
  title: string;
  percent: string;
  bgColor: string;
}

const LinearBar = ({ title, percent, bgColor }: LinearBarProps) => {
  return (
    <div className="">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-LightGray">{title}</span>
        <span className="text-xs text-LightGray">{percent}</span>
      </div>
      <div className="w-full bg-DarkGray rounded-full h-2">
        <div className={`${bgColor} h-2 rounded-full w-16 `} style={{ width: `${percent}` }}></div>
      </div>
    </div>
  );
};

export default LinearBar;
