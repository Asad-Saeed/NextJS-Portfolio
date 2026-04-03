import Link from "next/link";

interface DownloadProps {
  icon: React.ReactNode;
  resumeUrl?: string;
}

const Download = ({ icon, resumeUrl }: DownloadProps) => {
  return (
    <>
      <Link
        href={resumeUrl || "/Asad_Saeed_Resume.pdf"}
        target="_blank"
        className="flex flex-row justify-between text-LightGray items-center gap-x-4 py-5 pb-14"
      >
        <span className="text-Snow">Download Resume</span>
        <span>{icon}</span>
      </Link>
    </>
  );
};

export default Download;
