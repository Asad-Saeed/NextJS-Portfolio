import Link from "next/link";
import { AiFillCopyrightCircle } from "react-icons/ai";
import { MdMail } from "react-icons/md";
import { FooterData } from "@/types";

interface FooterProps {
  data?: FooterData | null;
}

const Footer = ({ data }: FooterProps) => {
  return (
    <div id="intro" className="mt-4 mb-10 lg:mb-0">
      <div className="flex h-10 items-center justify-between text-xs font-normal text-LightGray py-4 px-2 md:px-4 w-full bg-MidNightBlack">
        <div className="flex items-center">
          <div className="mr-1 text-base">
            <AiFillCopyrightCircle />
          </div>
          <span>{data?.copyright_year || "2024"} All Rights Reserved.</span>
        </div>
        <div className="flex items-center">
          <Link href={data?.upwork_url || "#"} target="_blank" rel="noreferrer">
            {data?.footer_text || "Made with ❤️ by Asad Saeed"}
          </Link>
        </div>
        <div className="hidden md:flex items-center hover:text-Green transition-colors">
          <div className="mr-1 text-base">
            <MdMail />
          </div>
          <div>
            <Link
              href={`mailto:${data?.email || "asadsaeed.dev@gmail.com"}`}
              className="cursor-pointer"
            >
              {data?.email || "asadsaeed.dev@gmail.com"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
