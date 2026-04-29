import Link from "next/link";
import SidebarSection from "./SidebarSection";
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
    <SidebarSection index={5} label="Contact">
      <div className="flex flex-col gap-3">
        {email && (
          <div>
            <div
              className="text-[10px] uppercase mb-1"
              style={{ color: "var(--ds-fg-muted)", letterSpacing: "0.06em" }}
            >
              Email
            </div>
            <Link
              href={`mailto:${email}`}
              className="text-[12.5px] font-medium break-all hover:underline transition-colors"
              style={{ color: "var(--ds-fg)" }}
            >
              {email}
            </Link>
          </div>
        )}
        {phones.length > 0 && (
          <div>
            <div
              className="text-[10px] uppercase mb-1"
              style={{ color: "var(--ds-fg-muted)", letterSpacing: "0.06em" }}
            >
              Phone
            </div>
            <div
              className="text-[12.5px] font-medium flex flex-wrap items-center gap-x-1.5"
              style={{ color: "var(--ds-fg)" }}
            >
              {phones.map((p: string, i: number) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <span style={{ color: "var(--ds-fg-muted)" }} aria-hidden>
                      ·
                    </span>
                  )}
                  <Link
                    href={`https://wa.me/${p.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:underline tabular-nums"
                  >
                    {p}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </SidebarSection>
  );
};

export default Contact;
