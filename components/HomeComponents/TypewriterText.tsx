"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface TypewriterTextProps {
  strings?: string[];
}

// Defer the typewriter-effect bundle until after mount; render the first
// string as a static fallback during SSR + initial client paint so there's
// no CLS and the SEO crawl sees real content.
const TypewriterInner = dynamic(() => import("typewriter-effect"), { ssr: false });

export default function TypewriterText({ strings }: TypewriterTextProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!strings?.length) return null;

  return (
    <span style={{ display: "inline-block", minHeight: "1em" }}>
      {!mounted ? (
        <span>{strings[0]}</span>
      ) : (
        <TypewriterInner
          options={{
            strings,
            autoStart: true,
            loop: true,
          }}
        />
      )}
    </span>
  );
}
