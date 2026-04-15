import Link from "next/link";
import { Profile } from "@/types";

const Contact = ({ profile }: { profile?: Partial<Profile> }) => {
  const email = profile?.email || "";
  const phone = profile?.phone || "";
  const phones = phone
    .split(/[/|]/)
    .map((p: string) => p.trim())
    .filter(Boolean);

  if (!email && phones.length === 0) return null;

  return (
    <div className="flex flex-col space-y-2 py-5 border-b border-SlateGray">
      {email && (
        <div className="flex flex-col">
          <span className="text-Snow text-xs font-bold">Email Address</span>
          <span className="text-xs text-LightGray">
            <Link href={`mailto:${email}`} className="hover:text-Green transition-colors">
              {email}
            </Link>
          </span>
        </div>
      )}
      {phones.length > 0 && (
        <div className="flex flex-col">
          <span className="text-Snow text-xs font-bold">Phone</span>
          <span className="text-xs text-LightGray flex flex-wrap items-center gap-1">
            {phones.map((p: string, i: number) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <span className="text-SlateGray">/</span>}
                <Link
                  href={`https://wa.me/${p.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-Green transition-colors"
                >
                  {p}
                </Link>
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );
};

export default Contact;
