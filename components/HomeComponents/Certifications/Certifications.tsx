import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiShield } from "react-icons/fi";
import { Certification } from "@/types";

interface CertificationsProps {
  data: Certification[];
}

const Certifications = ({ data }: CertificationsProps) => {
  if (!data?.length) return null;

  return (
    <>
      <div className="px-4 sm:px-6 py-4 text-lg font-semibold text-Green">Certifications</div>
      <div className="grid w-full grid-flow-row sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 pb-6">
        {data.map((cert) => (
          <div
            key={cert.id}
            className="card_stylings p-4 flex items-start gap-4 hover:border-Green/50 transition-colors"
          >
            {cert.badge_image_url ? (
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-DeepNightBlack flex items-center justify-center">
                <Image
                  src={cert.badge_image_url}
                  alt={cert.title}
                  width={64}
                  height={64}
                  sizes="64px"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-lg shrink-0 bg-Green/10 border border-Green/20 flex items-center justify-center">
                <FiShield className="text-Green text-2xl" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="text-Snow text-sm font-semibold leading-tight line-clamp-2">
                {cert.title}
              </h3>
              {cert.issuer && <p className="text-LightGray text-xs mt-1 truncate">{cert.issuer}</p>}
              {cert.issue_date && (
                <p className="text-LightGray/60 text-[10px] mt-0.5">{cert.issue_date}</p>
              )}
              {cert.credential_url && (
                <Link
                  href={cert.credential_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-Green hover:underline mt-2"
                >
                  Verify <FiExternalLink className="text-[10px]" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Certifications;
