import { useState } from "react";
import BannerLayout from "../components/Common/BannerLayout";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import { HiMail, HiUser } from "react-icons/hi";
import { BsChatTextFill } from "react-icons/bs";
import Fiverr_Icon from "../components/Fiverr_Icon";
import Footer from "../components/Footer";
import { Modal } from "antd";
import Link from "next/link";

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BannerLayout>
      <div className=" px-4 py-2">
        <div className="my-6 text-Snow flex flex-col gap-y-5">
          <h1 className="text-lg font-bold">Contact Information</h1>
          <div className="flex flex-col md:flex-row items-center gap-5 text-xs">
            <div className="card_stylings w-full md:w-1/2 p-5 md:p-6 lg:p-8 flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <span className="md:text-base">Country:</span>
                <span className="text-LightGray md:text-sm">
                  Pakistan
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="md:text-base">City:</span>
                <span className="text-LightGray md:text-sm">Lahore</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="md:text-base">Company:</span>
                <span className="text-LightGray md:text-sm">
                  Global Software Consulting
                </span>
              </div>
            </div>
            <div className="card_stylings rounded-xl w-full md:w-1/2 p-5 md:p-6 lg:p-8 flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <span className="md:text-base">Email:</span>
                <span className="text-LightGray text-sm">
                asadsaeed.dev@gmail.com
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="md:text-base">Linkedin:</span>
                <span className="text-LightGray text-sm">
                asad-saeed-4685a9202
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="md:text-base">Phone:</span>
                <span className="text-LightGray text-sm">
                +92 3017631644 / +92 478730644
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-16 w-full card_stylings text-xl sm:text-3xl flex gap-x-8 sm:gap-x-16 items-center justify-center text-Snow">
          <Link
            className="hover:scale-125 ease-in-out duration-700"
            href="mailto:asadsaeed.dev@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <HiMail />
          </Link>
          <Link
            className="hover:scale-125 ease-in-out duration-700"
            href="https://github.com/Asad-Saeed"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </Link>
          <Link
            className="hover:scale-125 ease-in-out duration-700"
            href="https://www.linkedin.com/in/asad-saeed-4685a9202/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </Link>
          {/* <a className='hover:scale-125 ease-in-out duration-700' href="https://x.com/iosamajavaid" target='_blank' rel="noreferrer"><FaTwitter /></a> 
        <Link
            className="hover:scale-125 ease-in-out duration-700 hidden sm:block"
            href="https://www.fiverr.com/codeworthy"
            target="_blank"
            rel="noreferrer"
          >
            <Fiverr_Icon />
          </Link>
        */}

          <Link
            className="hover:scale-125 ease-in-out duration-700 text-2xl sm:text-4xl mt-1"
            href="https://www.upwork.com/freelancers/~01c9dc528b3e2edcde"
            target="_blank"
            rel="noreferrer"
          >
            <SiUpwork />
          </Link>
        </div>

        
    <div className="my-12 w-full h-auto text-Snow">
          <h1 className="text-lg font-bold">Get In Touch</h1>
          <div className="mt-4 py-8 px-8 card_stylings rounded-xl text-sm">
            <div>
              <div className="flex flex-col w-full">
                <div className="userIcon relative mb-6">
                  <div
                    id="icon"
                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-xl pointer-events-none"
                  >
                    <HiUser />
                  </div>
                  <input
                    type="text"
                    className="input_stylings"
                    placeholder="Name"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full">
                <div className="mailIcon relative mb-6">
                  <div
                    id="icon"
                    className="absolute inset-y-0 left-0 flex items-center text-xl pl-3 pointer-events-none"
                  >
                    <HiMail />
                  </div>
                  <input
                    type="text"
                    className="input_stylings"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full">
                <div className="textIcon relative mb-6">
                  <div
                    id="icon"
                    className="absolute top-3 left-0 flex items-center text-lg pl-3 pointer-events-none"
                  >
                    <BsChatTextFill />
                  </div>
                  <textarea
                    rows={6}
                    cols={50}
                    className="input_stylings"
                    placeholder="Message"
                  />
                </div>
              </div>

              <div className="my-4">
                <button onClick={() => setIsOpen(true)} className="button">
                  {" "}
                  SEND MESSAGE{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
   
      </div>
      <Modal
        className="card_stylings backdrop-blur-3xl drop-shadow-2xl"
        centered
        open={isOpen}
        footer={null}
        closable={false}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-Green font-bold text-2xl">In Progress</h1>
          <a
            className="underline text-Snow"
            target="_blank"
            href="https://github.com/Asad-Saeed/NextJS-Portfolio"
          >
            Be the one to integrate this!
          </a>
        </div>
      </Modal>
      <Footer />
    </BannerLayout>
  );
};

export default Contact;
