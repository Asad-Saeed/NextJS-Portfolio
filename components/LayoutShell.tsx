import Intro from "@/components/Common/Intro";
import LayoutInteractivity from "./LayoutInteractivity";
import WhatsAppFab from "@/components/Common/WhatsAppFab";
import { SidebarData } from "@/types";

interface LayoutShellProps {
  children: React.ReactNode;
  sidebarData?: SidebarData;
  phone?: string | null;
}

export default function LayoutShell({ children, sidebarData, phone }: LayoutShellProps) {
  const firstName = sidebarData?.profile?.name?.trim().split(/\s+/)[0];
  const whatsappLabel = firstName ? `Chat with ${firstName}` : undefined;

  return (
    <LayoutInteractivity
      sidebar={<Intro sidebarData={sidebarData} />}
      whatsappFab={<WhatsAppFab phone={phone} label={whatsappLabel} />}
    >
      {children}
    </LayoutInteractivity>
  );
}
