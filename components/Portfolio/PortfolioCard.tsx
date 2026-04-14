import Image from "next/image";
import Link from "next/link";
import Badge from "../Common/Badge";
import { FiExternalLink, FiArrowRight } from "react-icons/fi";
import { PortfolioProject, ProjectTechnology } from "@/types";

interface PortfolioCardProps {
  data: PortfolioProject;
  slug: string;
}

const PortfolioCard = ({ data, slug }: PortfolioCardProps) => {
  const imageUrl = data?.image_url || "";
  const projectName = data?.project_name;
  const projectDetail = data?.project_detail;
  const techs = data?.project_technologies || [];
  const hasCaseStudy = data.challenge || data.solution || data.impact;

  return (
    <div className="bg-EveningBlack/95 border border-DarkGray/30 rounded-xl overflow-hidden h-full flex flex-col">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={projectName}
          width={600}
          height={400}
          sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
          className="w-full object-cover opacity-30 h-32 sm:h-48 md:h-64"
        />
      )}
      <div
        id="arrow"
        className="py-2 px-4 sm:px-6 bg-EveningBlack/95 hover:-translate-y-10 transition-all ease-in-out duration-500 flex-1 flex flex-col"
      >
        <div className="flex items-center justify-between py-2">
          <h3 className="font-semibold text-lg sm:text-2xl text-Snow leading-tight sm:leading-normal">
            {projectName}
          </h3>
          {data?.url && (
            <a
              href={data.url}
              target="_blank"
              rel="noreferrer"
              className="text-LightGray hover:text-Green transition-colors duration-300 ml-3 shrink-0"
            >
              <FiExternalLink className="text-lg sm:text-xl" />
            </a>
          )}
        </div>
        <p className="text-xs sm:text-sm text-LightGray my-1">{projectDetail}</p>
        <div className="flex items-end gap-3 mt-auto">
          <div className="flex-1 min-w-0 flex flex-wrap gap-2 py-2">
            {techs.map((t: ProjectTechnology, i: number) => (
              <Badge key={i} title={t.tech_name} />
            ))}
          </div>
          {hasCaseStudy && data.project_slug && (
            <Link
              href={`/${slug}/portfolio/${data.project_slug}`}
              className="shrink-0 mb-2 inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-Green font-medium border border-Green/30 rounded-full px-3 py-1.5 hover:bg-Green/10 transition-colors whitespace-nowrap"
            >
              Case Study <FiArrowRight />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
