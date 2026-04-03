"use client";

import Edu_Card from "@/components/Background/Edu_Card";
import Exp_Card from "@/components/Background/Exp_Card";
import BannerLayout from "@/components/Common/BannerLayout";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ParagraphSkeleton from "@/components/Common/ParagraphSkeleton";

export default function BackgroundPage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["background"],
    queryFn: () => axios.get("/api/background").then(({ data }) => data),
  });

  return (
    <BannerLayout>
      <div className="relative grid md:grid-cols-2 gap-x-10 px-4 pb-2 pt-10">
        {/* Centered vertical divider */}
        <div className="hidden md:block absolute left-1/2 top-10 bottom-2 w-1 rounded-full bg-SlateGray" />
        <div className="flex flex-col gap-y-4 order-2 md:order-1">
          <div className="mt-10 md:mt-0 text-xl text-Snow font-semibold">Education</div>
          {isLoading
            ? [1, 2, 3].map((i) => (
                <ParagraphSkeleton key={i} className={"p-8 h-full w-full relative"} />
              ))
            : data &&
              data[0]?.eduCards?.map((item: any, key: number) => (
                <Edu_Card key={key} data={item} />
              ))}
        </div>
        <div className="order-1 md:order-2">
          <div className="flex flex-col gap-y-4">
            <div className=" md:pt-0 pt-4 text-xl text-Snow font-semibold">Experience</div>

            {isLoading
              ? [1, 2, 3].map((i) => (
                  <ParagraphSkeleton key={i} className={"p-8 h-full w-full relative"} />
                ))
              : data &&
                data[1]?.expCards?.map((item: any, key: number) => (
                  <Exp_Card key={key} data={item} />
                ))}
          </div>
        </div>
      </div>
      <Footer />
    </BannerLayout>
  );
}
