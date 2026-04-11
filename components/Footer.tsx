import Link from "next/link";
import { AiFillCopyrightCircle } from "react-icons/ai";
import { MdMail } from "react-icons/md";
import { FooterData } from "@/types";

interface FooterProps {
  data?: FooterData | null;
}

const Footer = ({ data }: FooterProps) => {
  const year = data?.copyright_year || `${new Date().getFullYear()}`;
  const footerText = data?.footer_text || "Made with ❤️";
  const upworkUrl = data?.upwork_url || "";
  const email = data?.email || "";

  return (
    <div id="intro" className="mt-4 mb-10 lg:mb-0">
      <div className="flex h-10 items-center justify-between text-xs font-normal text-LightGray py-4 px-2 md:px-4 w-full bg-MidNightBlack">
        <div className="flex items-center">
          <div className="mr-1 text-base">
            <AiFillCopyrightCircle />
          </div>
          <span>{year} All Rights Reserved.</span>
        </div>
        <div className="flex items-center">
          {upworkUrl ? (
            <Link href={upworkUrl} target="_blank" rel="noreferrer">
              {footerText}
            </Link>
          ) : (
            <span>{footerText}</span>
          )}
        </div>
        {email && (
          <div className="hidden md:flex items-center hover:text-Green transition-colors">
            <div className="mr-1 text-base">
              <MdMail />
            </div>
            <div>
              <Link href={`mailto:${email}`} className="cursor-pointer">
                {email}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
