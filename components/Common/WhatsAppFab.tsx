import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppFabProps {
  phone?: string | null;
  label?: string;
}

function toWaNumber(raw: string): string | null {
  const first = raw.split(/[/|,]/)[0]?.trim() ?? "";
  const digits = first.replace(/[^0-9]/g, "");
  if (!digits) return null;
  // Local PK numbers start with 0; convert to +92 international form.
  if (digits.startsWith("0")) return `92${digits.slice(1)}`;
  return digits;
}

export default function WhatsAppFab({ phone, label = "Chat with Asad" }: WhatsAppFabProps) {
  if (!phone) return null;
  const waNumber = toWaNumber(phone);
  if (!waNumber) return null;

  return (
    <a
      href={`https://wa.me/${waNumber}`}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${label} on WhatsApp`}
      className="wa-fab group fixed z-40 inline-flex items-center gap-2 bottom-20 right-4 lg:bottom-6 lg:right-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-full"
      style={{ outlineColor: "transparent" }}
    >
      <span
        className="wa-tip hidden sm:inline-flex items-center px-4 py-2.5 rounded-full text-sm font-medium opacity-0 motion-reduce:opacity-100"
        style={{
          backgroundColor: "var(--ds-surface)",
          color: "var(--ds-fg)",
          boxShadow: "var(--ds-shadow-border), var(--ds-shadow-elevation)",
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </span>

      <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center">
        <span
          aria-hidden
          className="wa-halo absolute inset-0 rounded-full"
          style={{ backgroundColor: "#25D366" }}
        />
        <span
          aria-hidden
          className="wa-halo wa-halo-delayed absolute inset-0 rounded-full"
          style={{ backgroundColor: "#25D366" }}
        />
        <span
          className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none"
          style={{
            backgroundColor: "#25D366",
            boxShadow: "0 8px 24px -6px rgba(37, 211, 102, 0.55), 0 0 0 1px rgba(0,0,0,0.04)",
          }}
        >
          <FaWhatsapp aria-hidden size={24} className="wa-wiggle" />
        </span>
      </span>
    </a>
  );
}
