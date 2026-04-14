"use client";

import { useState } from "react";
import Banner from "@/components/HomeComponents/Banner";
import { BannerData } from "@/lib/queries/profile";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import { HiMail, HiUser } from "react-icons/hi";
import { BsChatTextFill } from "react-icons/bs";
import { FiLoader, FiCheck } from "react-icons/fi";
import Footer from "@/components/Footer";
import Link from "next/link";
import { sendMessage } from "@/lib/actions/messages";
import { Profile, FooterData } from "@/types";

interface ContactClientProps {
  profile: Profile | null;
  slug: string;
  footerData: FooterData | null;
  bannerData: BannerData | null;
}

export default function ContactClient({
  profile,
  slug,
  footerData,
  bannerData,
}: ContactClientProps) {
  const [form, setForm] = useState({ sender_name: "", sender_email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await sendMessage({
      slug,
      sender_name: form.sender_name,
      sender_email: form.sender_email,
      message: form.message,
    });

    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setForm({ sender_name: "", sender_email: "", message: "" });
    }
  }

  const email = profile?.email || "";
  const github = profile?.github_url || "";
  const linkedin = profile?.linkedin_url || "";
  const upwork = profile?.upwork_url || "";
  const phone = profile?.phone || "";
  const city = profile?.city || "";
  const residence = profile?.residence || "";

  return (
    <div>
      <Banner data={bannerData} heading={bannerData?.contact_banner_heading} />
      <div className="px-4 sm:px-6">
        <div className="my-6 text-Snow flex flex-col gap-y-5">
          <h2 className="text-lg font-semibold text-Green">Contact Information</h2>
          <div className="flex flex-col md:flex-row items-center gap-5 text-xs">
            <div className="card_stylings w-full md:w-1/2 p-5 md:p-6 lg:p-8 flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <span className="md:text-base">Country:</span>
                <span className="text-LightGray md:text-sm">{residence}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="md:text-base">City:</span>
                <span className="text-LightGray md:text-sm">{city}</span>
              </div>
            </div>
            <div className="card_stylings rounded-xl w-full md:w-1/2 p-5 md:p-6 lg:p-8 flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <span className="md:text-base">Email:</span>
                <a
                  href={`mailto:${email}`}
                  className="text-LightGray text-sm hover:text-Green transition-colors"
                >
                  {email}
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span className="md:text-base">Phone:</span>
                <span className="text-sm flex flex-wrap items-center gap-1">
                  {phone.split(/[/|]/).map((p: string, i: number) => (
                    <span key={i} className="flex items-center gap-1">
                      {i > 0 && <span className="text-SlateGray">/</span>}
                      <a
                        href={`https://wa.me/${p.trim().replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        className="text-LightGray hover:text-Green transition-colors"
                      >
                        {p.trim()}
                      </a>
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-16 w-full card_stylings text-xl sm:text-3xl flex gap-x-8 sm:gap-x-16 items-center justify-center text-Snow">
          {email && (
            <Link
              className="hover:scale-125 hover:text-Green ease-in-out duration-700 transition-colors"
              href={`mailto:${email}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Send an email"
            >
              <HiMail aria-hidden="true" />
            </Link>
          )}
          {github && (
            <Link
              className="hover:scale-125 hover:text-Green ease-in-out duration-700 transition-colors"
              href={github}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit GitHub profile"
            >
              <FaGithub aria-hidden="true" />
            </Link>
          )}
          {linkedin && (
            <Link
              className="hover:scale-125 hover:text-Green ease-in-out duration-700 transition-colors"
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit LinkedIn profile"
            >
              <FaLinkedin aria-hidden="true" />
            </Link>
          )}
          {upwork && (
            <Link
              className="hover:scale-125 hover:text-Green ease-in-out duration-700 transition-colors text-2xl sm:text-4xl mt-1"
              href={upwork}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Upwork profile"
            >
              <SiUpwork aria-hidden="true" />
            </Link>
          )}
        </div>

        <div className="my-12 w-full h-auto text-Snow">
          <h2 className="text-lg font-semibold text-Green">Get In Touch</h2>
          <form
            onSubmit={handleSubmit}
            className="mt-4 py-6 px-4 sm:px-6 card_stylings rounded-xl text-sm"
          >
            <div className="flex flex-col w-full">
              <label htmlFor="sender_name" className="sr-only">
                Your name
              </label>
              <div className="userIcon relative mb-6">
                <div
                  id="icon"
                  className="absolute inset-y-0 left-0 flex items-center pl-3 text-xl pointer-events-none"
                  aria-hidden="true"
                >
                  <HiUser />
                </div>
                <input
                  id="sender_name"
                  name="sender_name"
                  type="text"
                  autoComplete="name"
                  className="input_stylings"
                  placeholder="Name"
                  required
                  value={form.sender_name}
                  onChange={(e) => setForm({ ...form, sender_name: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="sender_email" className="sr-only">
                Your email address
              </label>
              <div className="mailIcon relative mb-6">
                <div
                  id="icon"
                  className="absolute inset-y-0 left-0 flex items-center text-xl pl-3 pointer-events-none"
                  aria-hidden="true"
                >
                  <HiMail />
                </div>
                <input
                  id="sender_email"
                  name="sender_email"
                  type="email"
                  autoComplete="email"
                  className="input_stylings"
                  placeholder="Email"
                  required
                  value={form.sender_email}
                  onChange={(e) => setForm({ ...form, sender_email: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="message" className="sr-only">
                Your message
              </label>
              <div className="textIcon relative mb-6">
                <div
                  id="icon"
                  className="absolute top-3 left-0 flex items-center text-lg pl-3 pointer-events-none"
                  aria-hidden="true"
                >
                  <BsChatTextFill />
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  cols={50}
                  className="input_stylings"
                  placeholder="Message"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
            </div>

            {success && (
              <div className="flex items-center gap-2 text-Green text-sm bg-Green/10 rounded-lg p-3 mb-4">
                <FiCheck /> Message sent successfully!
              </div>
            )}

            {error && (
              <div className="text-red-400 text-sm bg-red-400/10 rounded-lg p-3 mb-4">{error}</div>
            )}

            <div className="my-4">
              <button
                type="submit"
                disabled={loading}
                className="button flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading && <FiLoader className="animate-spin" />}
                {loading ? "Sending..." : "SEND MESSAGE"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer data={footerData} />
    </div>
  );
}
