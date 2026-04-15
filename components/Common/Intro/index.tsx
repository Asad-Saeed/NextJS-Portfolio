"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaDownload, FaGithub, FaLinkedin, FaUser } from "react-icons/fa";
import Contact from "./Contact";
import Download from "./Download";
import Languages from "./Languages";
import Location from "./Location";
import Tools from "./Tools";
import Skills from "./Skills";
import Image from "next/image";
import { useLongPress } from "@/lib/hooks/useLongPress";
import { createClient } from "@/lib/supabase/client";
import AvailabilityBadge from "@/components/Common/AvailabilityBadge";
import { SidebarData } from "@/types";

interface IntroProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  sidebarData?: SidebarData;
  slug?: string;
}

const Intro = ({ isOpen, setIsOpen, sidebarData, slug }: IntroProps) => {
  const router = useRouter();
  const profile = sidebarData?.profile;
  const homeUrl = slug ? `/${slug}` : "/";

  const longPressHandlers = useLongPress(async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      router.push("/admin");
    } else {
      router.push("/auth/login");
    }
  }, 5000);

  const profileImage = profile?.profile_image_url;
  const name = profile?.name || "";
  const designation = profile?.designation || "";
  const githubUrl = profile?.github_url || "";
  const linkedinUrl = profile?.linkedin_url || "";

  return (
    <>
      {/* fixed at top */}
      <div className="headerr z-50 absolute bg-MidNightBlack backdrop-blur-sm inset-y-0 h-48 top-0 flex items-center justify-center w-full flex-col px-4 gap-y-1 card_stylings">
        <div {...longPressHandlers} className="cursor-pointer select-none">
          {profileImage ? (
            <Image
              className="w-20 h-20 rounded-full border border-Green object-cover object-[center_30%]"
              src={profileImage}
              alt={name || "Profile"}
              width={160}
              height={160}
              sizes="80px"
              priority
              draggable={false}
            />
          ) : (
            <div className="w-20 h-20 rounded-full border bottom-1 p-1 border-Green flex items-center justify-center bg-DeepNightBlack">
              <FaUser className="text-LightGray text-3xl" />
            </div>
          )}
        </div>
        <span className="text-Snow text-base font-bold break-normal">
          <Link href={homeUrl} rel="noreferrer">
            {name}
          </Link>
        </span>
        <AvailabilityBadge status={profile?.availability_status} />
        {designation && <span className="text-sm text-LightGray text-center">{designation}</span>}
      </div>

      {/* middle components */}
      <div className="beech z-20 flex flex-col overflow-y-scroll pt-48 top-48 overflow-x-hidden no-scrollbar px-4">
        <Location profile={profile ?? undefined} />
        <Languages data={sidebarData?.languages} />
        <Skills data={sidebarData?.sidebarSkills} />
        <Tools data={sidebarData?.techStack} />
        <Contact profile={profile ?? undefined} />
        <Download icon={<FaDownload />} resumeUrl={profile?.resume_url} />
      </div>

      {/* fixed at bottom */}
      {(githubUrl || linkedinUrl) && (
        <div className="footer absolute flex justify-center space-x-6 text-xl items-center bottom-0 z-50 h-10 w-full bg-MidNightBlack text-Snow">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-Green transition-colors"
              aria-label="Visit GitHub profile"
            >
              <FaGithub aria-hidden="true" />
            </Link>
          )}
          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-Green transition-colors"
              aria-label="Visit LinkedIn profile"
            >
              <FaLinkedin aria-hidden="true" />
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Intro;
