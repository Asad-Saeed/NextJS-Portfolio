import React from "react";

interface ProgressBarProps {
  title: string;
  percent: string;
  bgColor: string;
}

const ProgressBar = ({ title, percent, bgColor }: ProgressBarProps) => {
  return (
    <div className="">
      <div className="flex justify-between mb-1">
        <span className="text-lg text-LightGray">{title}</span>
        <span className="text-lg text-LightGray">{percent}</span>
      </div>
      <div className="w-full bg-DarkGray rounded-full h-2">
        <div className={`${bgColor} h-2 rounded-full w-16 `} style={{ width: `${percent}` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
