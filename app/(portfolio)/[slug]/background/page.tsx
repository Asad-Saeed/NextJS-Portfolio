export const revalidate = 3600;

import type { Metadata } from "next";
import Edu_Card from "@/components/Background/Edu_Card";
import Exp_Card from "@/components/Background/Exp_Card";
import Banner from "@/components/HomeComponents/Banner";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/Common/SectionHeader";
import { getProfileBySlug, getFooterData } from "@/lib/queries/profile";
import { getEducation } from "@/lib/queries/education";
import { getExperience } from "@/lib/queries/experience";
import { notFound } from "next/navigation";

const STEPPER_ACCENTS = ["#3291ff", "#ff4d8d", "#ff5b4f"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) return {};
  const name = profileData.name || "Portfolio";
  const heading = profileData.background_banner_heading || "Background";
  const description =
    [profileData.experience_description, profileData.education_description]
      .filter(Boolean)
      .join(" — ") || `Education and work experience of ${name}.`;
  const url = `/${slug}/background`;
  const profileImage = profileData.profile_image_url || undefined;
  return {
    title: heading,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${heading} | ${name}`,
      description,
      url,
      type: "profile",
      siteName: `${name} — Portfolio`,
      ...(profileImage && { images: [{ url: profileImage, alt: name }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${heading} | ${name}`,
      description,
      ...(profileImage && { images: [profileImage] }),
    },
  };
}

export default async function BackgroundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = profileData.user_id;
  const bannerData = profileData;
  const [education, experience, footerData] = await Promise.all([
    getEducation(userId),
    getExperience(userId),
    getFooterData(userId),
  ]);

  return (
    <div>
      <Banner
        data={bannerData}
        heading={bannerData?.background_banner_heading}
        slug={slug}
        name={profileData.name}
        designation={profileData.designation}
        stack={(profileData.code_card_stack ?? "")
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
          .slice(0, 3)}
        availabilityStatus={profileData.availability_status}
      />

      <section aria-label="Background" className="px-5 sm:px-8 py-4 sm:py-5 max-w-6xl mx-auto">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-8 md:gap-y-0">
          {/* Center vertical timeline rail — desktop only */}
          <div
            aria-hidden
            className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px"
            style={{ backgroundColor: "var(--ds-border-light)" }}
          />

          {/* Experience column — left on desktop, first on mobile */}
          {experience.length > 0 && (
            <div className="flex flex-col gap-2.5 self-start min-w-0">
              <SectionHeader
                id="experience-heading"
                eyebrow={profileData.experience_eyebrow ?? ""}
                title={profileData.experience_heading ?? ""}
                description={profileData.experience_description}
              />
              {experience.map((item, idx) => (
                <div key={item.id} className="relative">
                  {/* Stepper node — sits on the central rail, halo punches through the line */}
                  <span
                    aria-hidden
                    className="hidden md:block absolute md:right-[-1rem] lg:right-[-1.5rem] translate-x-1/2 top-6 w-3 h-3 rounded-full z-10"
                    style={{
                      backgroundColor: STEPPER_ACCENTS[idx % STEPPER_ACCENTS.length],
                      boxShadow:
                        "0 0 0 3px var(--ds-bg), 0 0 0 4px var(--ds-border-light), 0 0 12px -2px " +
                        STEPPER_ACCENTS[idx % STEPPER_ACCENTS.length],
                    }}
                  />
                  {/* Hairline connector from card to rail */}
                  <span
                    aria-hidden
                    className="hidden md:block absolute right-0 top-7 h-px md:w-3 lg:w-5 translate-x-full"
                    style={{ backgroundColor: "var(--ds-border-light)" }}
                  />
                  <Exp_Card data={item} index={idx} />
                </div>
              ))}
            </div>
          )}

          {/* Education column — right on desktop, second on mobile */}
          {education.length > 0 && (
            <div className="flex flex-col gap-2.5 self-start min-w-0">
              <SectionHeader
                id="education-heading"
                eyebrow={profileData.education_eyebrow ?? ""}
                title={profileData.education_heading ?? ""}
                description={profileData.education_description}
              />
              {education.map((item, idx) => (
                <div key={item.id} className="relative">
                  <span
                    aria-hidden
                    className="hidden md:block absolute md:left-[-1rem] lg:left-[-1.5rem] -translate-x-1/2 top-6 w-3 h-3 rounded-full z-10"
                    style={{
                      backgroundColor: STEPPER_ACCENTS[idx % STEPPER_ACCENTS.length],
                      boxShadow:
                        "0 0 0 3px var(--ds-bg), 0 0 0 4px var(--ds-border-light), 0 0 12px -2px " +
                        STEPPER_ACCENTS[idx % STEPPER_ACCENTS.length],
                    }}
                  />
                  <span
                    aria-hidden
                    className="hidden md:block absolute left-0 top-7 h-px md:w-3 lg:w-5 -translate-x-full"
                    style={{ backgroundColor: "var(--ds-border-light)" }}
                  />
                  <Edu_Card data={item} index={idx} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer data={footerData} />
    </div>
  );
}
