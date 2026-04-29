import Link from "next/link";

interface DownloadProps {
  icon: React.ReactNode;
  resumeUrl?: string;
}

const Download = ({ icon, resumeUrl }: DownloadProps) => {
  if (!resumeUrl) return null;

  return (
    <Link
      href={resumeUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="ds-btn-ghost mt-4 mb-2 w-full"
    >
      <span>Download Resume</span>
      <span aria-hidden className="opacity-60">
        {icon}
      </span>
    </Link>
  );
};

export default Download;
