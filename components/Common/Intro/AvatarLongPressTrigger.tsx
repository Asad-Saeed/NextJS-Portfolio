"use client";

import { useRouter } from "next/navigation";
import { useLongPress } from "@/lib/hooks/useLongPress";
import { createClient } from "@/lib/supabase/client";

interface AvatarLongPressTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export default function AvatarLongPressTrigger({
  children,
  className,
}: AvatarLongPressTriggerProps) {
  const router = useRouter();

  const longPressHandlers = useLongPress(async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      router.push(user ? "/admin" : "/auth/login");
    } catch {
      router.push("/auth/login");
    }
  }, 5000);

  return (
    <div {...longPressHandlers} className={className}>
      {children}
    </div>
  );
}
