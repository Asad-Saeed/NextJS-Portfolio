export const revalidate = 3600;

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/HomeComponents/Banner";
import Footer from "@/components/Footer";
import Badge from "@/components/Common/Badge";
import { FiExternalLink, FiArrowLeft } from "react-icons/fi";
import { getProfileBySlug, getBannerData, getFooterData } from "@/lib/queries/profile";
import { getProjectBySlug } from "@/lib/queries/portfolio";
import { getSiteUrl } from "@/lib/site-url";
import { notFound } from "next/navigation";
import { ProjectTechnology } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; project: string }>;
}): Promise<Metadata> {
  const { slug, project } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) return {};
  const projectData = await getProjectBySlug(profileData.user_id, project);
  if (!projectData) return {};
  return {
    title: projectData.project_name,
    description:
      projectData.challenge || projectData.project_detail || `Project by ${profileData.name}`,
    alternates: { canonical: `/${slug}/portfolio/${project}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string; project: string }>;
}) {
  const { slug, project } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = profileData.user_id;
  const [projectData, bannerData, footerData] = await Promise.all([
    getProjectBySlug(userId, project),
    getBannerData(userId),
    getFooterData(userId),
  ]);

  if (!projectData) notFound();

  const techs = projectData.project_technologies || [];

  const siteUrl = getSiteUrl();
  const projectUrl = `${siteUrl}/${slug}/portfolio/${project}`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: profileData.name || "Portfolio",
        item: `${siteUrl}/${slug}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteUrl}/${slug}/portfolio`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: projectData.project_name,
        item: projectUrl,
      },
    ],
  };

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: projectData.project_name,
    ...(projectData.project_detail || projectData.challenge
      ? { description: projectData.project_detail || projectData.challenge }
      : {}),
    ...(projectData.image_url && { image: projectData.image_url }),
    ...(projectData.url && { url: projectData.url }),
    mainEntityOfPage: projectUrl,
    author: {
      "@type": "Person",
      name: profileData.name || "Portfolio",
      url: `${siteUrl}/${slug}`,
    },
    ...(techs.length > 0 && {
      keywords: techs.map((t: ProjectTechnology) => t.tech_name).join(", "),
    }),
    ...(projectData.created_at && { dateCreated: projectData.created_at }),
    ...(projectData.updated_at && { dateModified: projectData.updated_at }),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <Banner data={bannerData} heading={bannerData?.portfolio_banner_heading} />

      <div className="px-4 sm:px-6 py-6">
        {/* Back link */}
        <Link
          href={`/${slug}/portfolio`}
          className="inline-flex items-center gap-1.5 text-xs text-LightGray hover:text-Green transition-colors mb-6"
        >
          <FiArrowLeft /> Back to Projects
        </Link>

        {/* Project header */}
        <div className="card_stylings p-5 sm:p-8 mb-4">
          {projectData.image_url && (
            <div className="rounded-lg overflow-hidden mb-6">
              <Image
                src={projectData.image_url}
                alt={projectData.project_name}
                width={1200}
                height={600}
                sizes="(min-width: 1024px) 75vw, 100vw"
                priority
                className="w-full object-cover h-48 sm:h-64 md:h-80"
              />
            </div>
          )}

          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-Snow text-xl sm:text-3xl font-bold">{projectData.project_name}</h2>
            {projectData.url && (
              <a
                href={projectData.url}
                target="_blank"
                rel="noreferrer noopener"
                className="button flex items-center gap-2 shrink-0"
              >
                Visit Project <FiExternalLink />
              </a>
            )}
          </div>

          {techs.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {techs.map((t: ProjectTechnology, i: number) => (
                <Badge key={i} title={t.tech_name} />
              ))}
            </div>
          )}

          {projectData.project_detail && (
            <p className="text-LightGray text-sm leading-relaxed">{projectData.project_detail}</p>
          )}
        </div>

        {/* Case study sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectData.challenge && (
            <div className="card_stylings p-5 sm:p-6">
              <h2 className="text-Green text-xs font-semibold uppercase tracking-wider mb-3">
                The Challenge
              </h2>
              <p className="text-Snow text-sm leading-relaxed">{projectData.challenge}</p>
            </div>
          )}

          {projectData.solution && (
            <div className="card_stylings p-5 sm:p-6">
              <h2 className="text-Green text-xs font-semibold uppercase tracking-wider mb-3">
                The Solution
              </h2>
              <p className="text-Snow text-sm leading-relaxed">{projectData.solution}</p>
            </div>
          )}

          {projectData.impact && (
            <div className="card_stylings p-5 sm:p-6">
              <h2 className="text-Green text-xs font-semibold uppercase tracking-wider mb-3">
                Impact & Results
              </h2>
              <p className="text-Snow text-sm leading-relaxed font-medium">{projectData.impact}</p>
            </div>
          )}

          {projectData.role && (
            <div className="card_stylings p-5 sm:p-6">
              <h2 className="text-Green text-xs font-semibold uppercase tracking-wider mb-3">
                My Role
              </h2>
              <p className="text-Snow text-sm leading-relaxed">{projectData.role}</p>
            </div>
          )}
        </div>
      </div>

      <Footer data={footerData} />
    </div>
  );
}
