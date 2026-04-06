"use client";

import Typewriter from "typewriter-effect";
import BannerLayout from "../Common/BannerLayout";
import Link from "next/link";
import Image from "next/image";
import { BannerData } from "@/lib/queries/profile";

interface BannerProps {
  data: BannerData | null;
  heading?: string;
}

const Banner = ({ data, heading }: BannerProps) => {
  const emojiSrc = data?.banner_emoji_url || "/images/emoji.png";
  const bgImage = data?.banner_image_url || "/images/background.png";
  const buttonText = data?.explore_button_text || "Explore";
  const buttonUrl = data?.explore_button_url || data?.upwork_url;

  return (
    <BannerLayout backgroundImage={bgImage}>
      <div className="absolute inset-0 z-20 flex flex-col justify-between py-3 sm:py-5 w-full h-full bg-linear-to-t from-MidNightBlack">
        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center px-3 sm:px-6">
          <div className="bg-LightGray/10 w-full p-6 sm:p-8 rounded-xl overflow-visible relative">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-3xl md:text-4xl xl:text-5xl text-Snow font-bold leading-tight">
                  {heading || data?.banner_heading}
                </h1>
                <div className="mt-1.5 sm:mt-3 font-cascadia-normal text-Snow text-[10px] sm:text-sm">
                  <span className="flex flex-wrap items-center gap-x-1">
                    <span>
                      {"<"}
                      <span className="text-Green font-bold">🫣</span>
                      {">"}
                    </span>
                    <span className="text-Snow text-[8px] min-[400px]:text-[10px] sm:text-lg md:text-xl xl:text-2xl font-bold whitespace-nowrap">
                      I am a{" "}
                      <span className="inline-block">
                        <Typewriter
                          options={{
                            strings: data?.banner_subheadings,
                            autoStart: true,
                            loop: true,
                          }}
                        />
                      </span>
                    </span>
                    <span>
                      {"</"}
                      <span className="text-Green font-bold">😎</span>
                      {">"}
                    </span>
                  </span>
                </div>
                {buttonUrl && (
                  <div className="mt-3 sm:mt-5">
                    <Link className="button" target="_blank" href={buttonUrl}>
                      {buttonText}
                    </Link>
                  </div>
                )}
              </div>

              {/* Emoji — hidden on very small, shown from 400px+ */}
              <div className="w-20 h-24 min-[400px]:w-28 min-[400px]:h-32 sm:w-36 sm:h-40 md:w-44 md:h-48 absolute right-3 sm:right-6 bottom-0 shrink-0">
                <Image
                  className="w-full h-full object-contain"
                  src={emojiSrc}
                  alt="banner character"
                  width={192}
                  height={208}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-around w-full px-3 sm:px-6 pt-2">
          <div className="flex flex-col items-center text-center">
            <span className="text-sm sm:text-xl text-Green font-bold">
              {data?.completed_projects_count}
            </span>
            <span className="text-[8px] sm:text-xs text-Snow">Completed Projects</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-sm sm:text-xl text-Green font-bold">
              {data?.freelance_clients_count}
            </span>
            <span className="text-[8px] sm:text-xs text-Snow">Companies Worked</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-sm sm:text-xl text-Green font-bold">{data?.honors_count}</span>
            <span className="text-[8px] sm:text-xs text-Snow">Honors & Awards</span>
          </div>
        </div>
      </div>
    </BannerLayout>
  );
};

export default Banner;
