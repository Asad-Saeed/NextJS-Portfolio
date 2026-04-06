import Image from "next/image";
import Badge from "../Common/Badge";
import { FiExternalLink } from "react-icons/fi";

const PortfolioCard = ({ data }: { data: any }) => {
  const imageUrl = data?.image_url || (data?.image ? `/${data.image}` : "");
  const projectName = data?.project_name || data?.projectName;
  const projectDetail = data?.project_detail || data?.projectDetail;
  const techs = data?.project_technologies || data?.technologiesUsed || [];

  return (
    <div className="bg-EveningBlack/95 border border-DarkGray/30 rounded-xl overflow-hidden h-full">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={projectName}
          width={600}
          height={400}
          className="w-full object-cover opacity-30 h-32 sm:h-48 md:h-64"
        />
      )}
      <div
        id="arrow"
        className="py-2 px-4 sm:px-6 bg-EveningBlack/95 hover:-translate-y-10 transition-all ease-in-out duration-500"
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
        <div className="flex flex-wrap gap-2 py-2">
          {techs.map((t: any, i: number) => (
            <Badge key={i} title={t.tech_name || t.tech} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
