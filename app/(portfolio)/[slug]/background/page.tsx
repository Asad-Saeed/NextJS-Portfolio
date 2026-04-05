export const revalidate = 60;

import Edu_Card from "@/components/Background/Edu_Card";
import Exp_Card from "@/components/Background/Exp_Card";
import Banner from "@/components/HomeComponents/Banner";
import Footer from "@/components/Footer";
import { getProfileBySlug, getBannerData, getFooterData } from "@/lib/queries/profile";
import { getEducation } from "@/lib/queries/education";
import { getExperience } from "@/lib/queries/experience";
import { notFound } from "next/navigation";

export default async function BackgroundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = (profileData as any).user_id;
  const [bannerData, education, experience, footerData] = await Promise.all([
    getBannerData(userId),
    getEducation(userId),
    getExperience(userId),
    getFooterData(userId),
  ]);

  return (
    <div>
      <Banner data={bannerData} heading={bannerData?.background_banner_heading} />
      <div className="relative grid md:grid-cols-2 gap-x-10 px-4 sm:px-6 pb-2 pt-6">
        <div className="hidden md:block absolute left-1/2 top-6 bottom-2 w-1 rounded-full bg-SlateGray" />
        <div className="flex flex-col gap-y-4 order-2 md:order-1">
          <div className="mt-6 md:mt-0 text-xl text-Green font-semibold">Education</div>
          {education.map((item: any) => (
            <Edu_Card key={item.id} data={item} />
          ))}
        </div>
        <div className="order-1 md:order-2">
          <div className="flex flex-col gap-y-4">
            <div className="text-xl text-Green font-semibold">Experience</div>
            {experience.map((item: any) => (
              <Exp_Card key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer data={footerData} />
    </div>
  );
}
