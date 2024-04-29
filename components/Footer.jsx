import Link from "next/link";
import { AiFillCopyrightCircle } from "react-icons/ai";
import { MdMail } from "react-icons/md";

const Footer = () => {
  return (
    <div id="intro" className="mt-4 mb-10 lg:mb-0">
      <div className="flex h-10 items-center justify-between text-xs font-normal text-LightGray py-4 px-2 md:px-4 w-full bg-MidNightBlack">
        <div className="flex items-center">
          <div className="mr-1 text-base">
            <AiFillCopyrightCircle />
          </div>
          <span>2024 All Rights Reserved.</span>
        </div>
        <div className="flex items-center">
          <Link
            href="https://www.upwork.com/freelancers/~01c9dc528b3e2edcde"
            target="_blank"
            rel="noreferrer"
          >
            Made with ❤️ by <span className="font-bold">Asad Saeed</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center">
          <div className="mr-1 text-base">
            <MdMail />
          </div>
          <div>
            <Link
              href="mailto:asadsaeed.dev@gmail.com"
              className="cursor-pointer"
            >
              asadsaeed.dev@gmail.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

