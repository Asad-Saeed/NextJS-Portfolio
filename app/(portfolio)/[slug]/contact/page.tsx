import type { Metadata } from "next";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import { HiMail } from "react-icons/hi";
import Banner from "@/components/HomeComponents/Banner";
import Footer from "@/components/Footer";
import { getProfileBySlug, getBannerData, getFooterData } from "@/lib/queries/profile";
import { getSiteUrl } from "@/lib/site-url";
import { notFound } from "next/navigation";
import ContactForm from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) return {};
  const name = profileData.name || "Portfolio";
  const description = `Get in touch with ${name}.`;
  const url = `/${slug}/contact`;
  const profileImage = profileData.profile_image_url || undefined;
  return {
    title: "Contact",
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `Contact | ${name}`,
      description,
      url,
      type: "profile",
      siteName: `${name} — Portfolio`,
      ...(profileImage && { images: [{ url: profileImage, alt: name }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: `Contact | ${name}`,
      description,
      ...(profileImage && { images: [profileImage] }),
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profileData = await getProfileBySlug(slug);
  if (!profileData) notFound();

  const userId = profileData.user_id;
  const [bannerData, footerData] = await Promise.all([
    getBannerData(userId),
    getFooterData(userId),
  ]);

  const siteUrl = getSiteUrl();
  const sameAs = [profileData.github_url, profileData.linkedin_url, profileData.upwork_url].filter(
    Boolean
  );
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.name || undefined,
    url: `${siteUrl}/${slug}/contact`,
    ...(profileData.profile_image_url && { image: profileData.profile_image_url }),
    ...(profileData.email && { email: profileData.email }),
    ...(profileData.phone && { telephone: profileData.phone }),
    ...(sameAs.length > 0 && { sameAs }),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "personal",
      ...(profileData.email && { email: profileData.email }),
      ...(profileData.phone && { telephone: profileData.phone }),
      availableLanguage: ["English"],
    },
  };

  const email = profileData.email || "";
  const github = profileData.github_url || "";
  const linkedin = profileData.linkedin_url || "";
  const upwork = profileData.upwork_url || "";
  const phone = profileData.phone || "";
  const city = profileData.city || "";
  const residence = profileData.residence || "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
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
                          rel="noreferrer noopener"
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
                rel="noreferrer noopener"
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
                rel="noreferrer noopener"
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
                rel="noreferrer noopener"
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
                rel="noreferrer noopener"
                aria-label="Visit Upwork profile"
              >
                <SiUpwork aria-hidden="true" />
              </Link>
            )}
          </div>

          <ContactForm slug={slug} />
        </div>
        <Footer data={footerData} />
      </div>
    </>
  );
}
