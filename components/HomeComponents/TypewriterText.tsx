"use client";

import Typewriter from "typewriter-effect";

interface TypewriterTextProps {
  strings?: string[];
}

export default function TypewriterText({ strings }: TypewriterTextProps) {
  if (!strings?.length) return null;
  return (
    <Typewriter
      options={{
        strings,
        autoStart: true,
        loop: true,
      }}
    />
  );
}
