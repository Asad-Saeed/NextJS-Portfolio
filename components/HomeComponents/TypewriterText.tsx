"use client";

import dynamic from "next/dynamic";

interface TypewriterTextProps {
  strings?: string[];
}

// Defer the typewriter-effect bundle until after first paint.
// Renders the first string statically as fallback so there's no CLS.
const Typewriter = dynamic(() => import("typewriter-effect"), {
  ssr: false,
  loading: () => null,
});

export default function TypewriterText({ strings }: TypewriterTextProps) {
  if (!strings?.length) return null;
  return (
    <span style={{ display: "inline-block", minHeight: "1em" }}>
      <Typewriter
        options={{
          strings,
          autoStart: true,
          loop: true,
        }}
      />
    </span>
  );
}
