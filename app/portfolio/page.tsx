"use client";

import { useQuery } from "@tanstack/react-query";
import BannerLayout from "@/components/Common/BannerLayout";
import Footer from "@/components/Footer";
import PortfolioCard from "@/components/Portfolio/PortfolioCard";
import axios from "axios";
import ImageAndParagraphSkeleton from "@/components/Common/ImageAndParagraphSkeleton";

export default function PortfolioPage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => axios.get("/api/portfolio").then(({ data }) => data),
  });

  return (
    <BannerLayout>
      <div className="grid justify items-center grid-flow-row md:grid-cols-2 grid-rows-auto gap-4 px-8 my-6">
        {isLoading
          ? [1, 2, 3, 4].map((i) => (
              <ImageAndParagraphSkeleton key={i} className={"w-full object-cover"} />
            ))
          : data?.map((item: any, key: number) => <PortfolioCard key={key} data={item} />)}
      </div>
      <Footer />
    </BannerLayout>
  );
}
