"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

interface TypewriterTextProps {
  strings?: string[];
}

// Defer the typewriter-effect bundle until after mount; render the first
// string as a static fallback during SSR + initial client paint so there's
// no CLS and the SEO crawl sees real content.
const TypewriterInner = dynamic(() => import("typewriter-effect"), { ssr: false });

const subscribe = () => () => {};

export default function TypewriterText({ strings }: TypewriterTextProps) {
  // false during SSR + first client render, true after hydration — no Effect needed.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

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
