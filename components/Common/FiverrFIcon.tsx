interface FiverrFIconProps {
  size?: number | string;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

/**
 * Minimal Fiverr "F" mark — just the letter F styled like an icon glyph.
 * Compatible signature with react-icons (size prop) so it can be dropped
 * into icon arrays alongside FaGithub, FaLinkedin, etc.
 */
export default function FiverrFIcon({
  size = 14,
  className = "",
  "aria-hidden": ariaHidden = true,
}: FiverrFIconProps) {
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <span
      aria-hidden={ariaHidden}
      className={`inline-flex items-center justify-center font-bold leading-none tracking-tight ${className}`}
      style={{
        width: px,
        height: px,
        fontSize: typeof size === "number" ? `${size + 1}px` : size,
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      F
    </span>
  );
}
