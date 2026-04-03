export const revalidate = 60;

import Edu_Card from "@/components/Background/Edu_Card";
import Exp_Card from "@/components/Background/Exp_Card";
import BannerLayout from "@/components/Common/BannerLayout";
import Footer from "@/components/Footer";
import { getProfileBySlug, getFooterData } from "@/lib/queries/profile";
import { getEducation } from "@/lib/queries/education";
import { getExperience } from "@/lib/queries/experience";
import { notFound } from "next/navigation";

export default async function BackgroundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = (profileData as any).user_id;
  const [education, experience, footerData] = await Promise.all([
    getEducation(userId),
    getExperience(userId),
    getFooterData(userId),
  ]);

  return (
    <BannerLayout>
      <div className="relative grid md:grid-cols-2 gap-x-10 px-4 pb-2 pt-10">
        <div className="hidden md:block absolute left-1/2 top-10 bottom-2 w-1 rounded-full bg-SlateGray" />
        <div className="flex flex-col gap-y-4 order-2 md:order-1">
          <div className="mt-10 md:mt-0 text-xl text-Snow font-semibold">Education</div>
          {education.map((item: any) => (
            <Edu_Card key={item.id} data={item} />
          ))}
        </div>
        <div className="order-1 md:order-2">
          <div className="flex flex-col gap-y-4">
            <div className="md:pt-0 pt-4 text-xl text-Snow font-semibold">Experience</div>
            {experience.map((item: any) => (
              <Exp_Card key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer data={footerData} />
    </BannerLayout>
  );
}
