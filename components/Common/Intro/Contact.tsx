import { CONTACTS } from "../../../constants/constants";
import Link from "next/link";

const Contact = ({ profile }: { profile?: any }) => {
  const email = profile?.email || CONTACTS.EMAIL;
  const phone = profile?.phone || CONTACTS.PHONE;
  const phones = phone
    .split(/[/|]/)
    .map((p: string) => p.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col space-y-2 py-5 border-b border-SlateGray">
      <div className="flex flex-col">
        <span className="text-Snow text-xs font-bold">Email Address</span>
        <span className="text-xs text-LightGray">
          <Link href={`mailto:${email}`} className="hover:text-Green transition-colors">
            {email}
          </Link>
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-Snow text-xs font-bold">Phone</span>
        <span className="text-xs text-LightGray flex flex-wrap items-center gap-1">
          {phones.map((p: string, i: number) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-SlateGray">/</span>}
              <Link
                href={`https://wa.me/${p.replace(/[^0-9]/g, "")}`}
                target="_blank"
                className="hover:text-Green transition-colors"
              >
                {p}
              </Link>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Contact;
