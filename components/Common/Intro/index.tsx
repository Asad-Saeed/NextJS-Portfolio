import Link from "next/link";
import Image from "next/image";
import { FaDownload, FaUser } from "react-icons/fa";
import Contact from "./Contact";
import Download from "./Download";
import Languages from "./Languages";
import Location from "./Location";
import Tools from "./Tools";
import Skills from "./Skills";
import AvailabilityBadge from "@/components/Common/AvailabilityBadge";
import SidebarSkeleton from "./SidebarSkeleton";
import AvatarLongPressTrigger from "./AvatarLongPressTrigger";
import { SidebarData } from "@/types";

interface IntroProps {
  sidebarData?: SidebarData;
}

const Intro = ({ sidebarData }: IntroProps) => {
  const profile = sidebarData?.profile;
  const homeUrl = "/";

  if (!profile) return <SidebarSkeleton />;

  const profileImage = profile?.profile_image_url;
  const name = profile?.name || "";
  const designation = profile?.designation || "";

  return (
    <div className="h-full flex flex-col overflow-y-auto overflow-x-hidden no-scrollbar">
      {/* Sticky header — identity card (sticky only on desktop sidebar) */}
      <header
        className="relative lg:sticky lg:top-0 z-30 flex flex-col items-center px-4 sm:px-5 pt-8 pb-5 gap-y-2.5"
        style={{
          backgroundColor: "var(--ds-surface)",
          boxShadow: "inset 0 -1px 0 0 var(--ds-border-shadow)",
        }}
      >
        {/* Top mono fingerprint row */}
        <div
          className="absolute top-3 inset-x-0 flex items-center justify-between px-4"
          aria-hidden
        >
          <span className="text-mono-label truncate" style={{ color: "var(--ds-fg-muted)" }}>
            ~/profile
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-mono-label"
            style={{ color: "var(--ds-fg-tertiary)" }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--ds-develop)" }}
            />
            LIVE
          </span>
        </div>

        {/* Avatar with conic-gradient ring (long-press → admin via client island) */}
        <AvatarLongPressTrigger className="relative cursor-pointer select-none group">
          <span
            aria-hidden
            className="absolute -inset-1 rounded-full opacity-50 blur-md transition-opacity duration-300 group-hover:opacity-80"
            style={{
              background:
                "conic-gradient(from 180deg, var(--ds-develop), var(--ds-preview), var(--ds-ship), var(--ds-develop))",
            }}
          />
          {profileImage ? (
            <Image
              className="relative w-[72px] h-[72px] sm:w-[76px] sm:h-[76px] rounded-full object-cover object-[center_30%] transition-transform duration-300 group-hover:scale-105"
              style={{ boxShadow: "0 0 0 2px var(--ds-surface), var(--ds-shadow-border-light)" }}
              src={profileImage}
              alt={name || "Profile"}
              width={160}
              height={160}
              sizes="76px"
              priority
              fetchPriority="high"
              draggable={false}
            />
          ) : (
            <div
              className="relative w-[72px] h-[72px] sm:w-[76px] sm:h-[76px] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundColor: "var(--ds-surface-subtle)",
                boxShadow: "0 0 0 2px var(--ds-surface), var(--ds-shadow-border-light)",
                color: "var(--ds-fg-muted)",
              }}
            >
              <FaUser className="text-2xl" />
            </div>
          )}
        </AvatarLongPressTrigger>

        <Link
          href={homeUrl}
          rel="noreferrer"
          className="text-[15px] sm:text-[16px] font-semibold leading-tight text-center break-words max-w-full"
          style={{ color: "var(--ds-fg)", letterSpacing: "-0.025em" }}
        >
          {name}
        </Link>

        <AvailabilityBadge status={profile?.availability_status} />

        {designation && (
          <span
            className="text-[12px] text-center leading-snug max-w-[14rem] break-words"
            style={{ color: "var(--ds-fg-secondary)", letterSpacing: "-0.005em" }}
          >
            {designation}
          </span>
        )}
      </header>

      {/* Scrollable content */}
      <div className="flex flex-col px-4 sm:px-5 pb-3">
        <Location profile={profile ?? undefined} />
        <Languages data={sidebarData?.languages} />
        <Skills data={sidebarData?.sidebarSkills} />
        <Tools data={sidebarData?.techStack} />
        <Contact profile={profile ?? undefined} />
        <Download icon={<FaDownload />} resumeUrl={profile?.resume_url} />
      </div>
    </div>
  );
};

export default Intro;
