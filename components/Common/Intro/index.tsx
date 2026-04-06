"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import Contact from "./Contact";
import Download from "./Download";
import Languages from "./Languages";
import Location from "./Location";
import Tools from "./Tools";
import Skills from "./Skills";
import Image from "next/image";
import { useLongPress } from "@/lib/hooks/useLongPress";
import { createClient } from "@/lib/supabase/client";

interface IntroProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  sidebarData?: any;
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
      router.push("/admin/login");
    }
  }, 5000);

  const profileImage = profile?.profile_image_url || "/images/asadsaeed.jpg";
  const name = profile?.name || "Asad Saeed";
  const designation =
    profile?.designation || "Front End Engineer | React Js | Next Js | MERN Stack";
  const githubUrl = profile?.github_url || "https://github.com/Asad-Saeed";
  const linkedinUrl = profile?.linkedin_url || "https://www.linkedin.com/in/asad-saeed-4685a9202/";

  return (
    <>
      {/* fixed at top */}
      <div className="headerr z-50 absolute bg-MidNightBlack backdrop-blur-sm inset-y-0 h-48 top-0 flex items-center justify-center w-full flex-col px-4 gap-y-4 card_stylings">
        <div {...longPressHandlers} className="cursor-pointer select-none">
          <Image
            className="w-20 h-20 rounded-full border bottom-1 p-1 border-Green"
            src={profileImage}
            alt={name}
            width={80}
            height={80}
            draggable={false}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-Snow text-base font-bold break-normal">
            <Link href={homeUrl} rel="noreferrer">
              {name}
            </Link>
          </span>
          <span className="text-sm text-LightGray text-center mt-2">{designation}</span>
        </div>
      </div>

      {/* middle components */}
      <div className="beech z-20 flex flex-col overflow-y-scroll pt-48 top-48 overflow-x-hidden no-scrollbar px-4">
        <Location profile={profile} />
        <Languages data={sidebarData?.languages} />
        <Skills data={sidebarData?.sidebarSkills} />
        <Tools data={sidebarData?.techStack} />
        <Contact profile={profile} />
        <Download icon={<FaDownload />} resumeUrl={profile?.resume_url} />
      </div>

      {/* fixed at bottom */}
      <div className="footer absolute flex justify-center space-x-6 text-xl items-center bottom-0 z-50 h-10 w-full bg-MidNightBlack text-Snow">
        <Link
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-Green transition-colors"
        >
          <FaGithub />
        </Link>
        <Link
          href={linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-Green transition-colors"
        >
          <FaLinkedin />
        </Link>
      </div>
    </>
  );
};

export default Intro;
