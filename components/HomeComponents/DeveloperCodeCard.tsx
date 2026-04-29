import { ReactNode } from "react";

interface DeveloperCodeCardProps {
  name?: string;
  designation?: string;
  /** Tech names — first 3 will render. Comes from admin-managed tech_stack. */
  stack?: string[];
  /** Profile.availability_status string from admin. */
  availabilityStatus?: string;
}

type Token = { text: string; color?: string };

function Line({ num, tokens, indent = 0 }: { num: number; tokens: Token[]; indent?: number }) {
  return (
    <div className="flex items-baseline gap-3">
      <span
        className="select-none tabular-nums text-right w-5 shrink-0 text-[11px]"
        style={{ color: "var(--ds-fg-muted)" }}
      >
        {num}
      </span>
      <span className="whitespace-pre" style={{ color: "var(--ds-fg-secondary)" }}>
        {"  ".repeat(indent)}
        {tokens.map((t, i) =>
          t.color ? (
            <span key={i} style={{ color: t.color }}>
              {t.text}
            </span>
          ) : (
            <span key={i}>{t.text}</span>
          )
        )}
      </span>
    </div>
  );
}

function statusToLabel(status?: string): string {
  switch (status) {
    case "open_to_work":
      return "available";
    case "freelance":
      return "freelance";
    case "not_available":
      return "busy";
    default:
      return status ?? "";
  }
}

export default function DeveloperCodeCard({
  name,
  designation,
  stack,
  availabilityStatus,
}: DeveloperCodeCardProps) {
  const displayName = name ?? "";
  const role = designation ?? "";
  const techs = (stack ?? []).slice(0, 3);
  const statusLabel = statusToLabel(availabilityStatus);
  const isShipping = availabilityStatus !== "not_available";

  const PURPLE = "var(--ds-console-purple)";
  const BLUE = "var(--ds-console-blue)";
  const PINK = "var(--ds-console-pink)";
  const FG = "var(--ds-fg)";
  const DEVELOP = "var(--ds-develop)";

  // Build the stack array tokens dynamically.
  const stackTokens: Token[] = [{ text: "stack", color: PINK }, { text: ": [" }];
  techs.forEach((t, i) => {
    stackTokens.push({ text: `"${t}"`, color: FG });
    if (i < techs.length - 1) stackTokens.push({ text: ", " });
  });
  stackTokens.push({ text: "]," });

  const lines: { tokens: Token[]; indent?: number }[] = [
    {
      tokens: [
        { text: "const", color: PURPLE },
        { text: " " },
        { text: "developer", color: BLUE },
        { text: " " },
        { text: "=", color: PURPLE },
        { text: " {" },
      ],
    },
    {
      tokens: [
        { text: "name", color: PINK },
        { text: ": " },
        { text: `"${displayName}"`, color: FG },
        { text: "," },
      ],
      indent: 1,
    },
    {
      tokens: [
        { text: "role", color: PINK },
        { text: ": " },
        { text: `"${role}"`, color: FG },
        { text: "," },
      ],
      indent: 1,
    },
    { tokens: stackTokens, indent: 1 },
    {
      tokens: [
        { text: "status", color: PINK },
        { text: ": " },
        { text: `"${statusLabel}"`, color: DEVELOP },
        { text: "," },
      ],
      indent: 1,
    },
    {
      tokens: [
        { text: "shipping", color: PINK },
        { text: ": " },
        { text: String(isShipping), color: DEVELOP },
        { text: "," },
      ],
      indent: 1,
    },
    { tokens: [{ text: "};" }] },
  ];

  const dot = (color: string): ReactNode => (
    <span
      className="block w-2.5 h-2.5 rounded-full"
      style={{ backgroundColor: color }}
      aria-hidden
    />
  );

  return (
    <div className="relative w-full max-w-md sm:max-w-lg xl:w-[400px] 2xl:w-[440px] mx-auto xl:mx-0">
      <div
        className="rounded-xl overflow-hidden font-mono text-[12px] leading-[1.7]"
        style={{
          backgroundColor: "var(--ds-surface)",
          boxShadow: "var(--ds-shadow-border), 0 24px 48px -16px rgba(0,0,0,0.5)",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 px-3 py-2.5"
          style={{ boxShadow: "inset 0 -1px 0 0 var(--ds-border-shadow)" }}
        >
          <span className="flex items-center gap-1.5">
            {dot("var(--ds-ship)")}
            {dot("#f5b942")}
            {dot("#27c93f")}
          </span>
          <div className="flex-1 flex justify-center">
            <span
              className="text-mono-label inline-flex items-center gap-1.5"
              style={{ color: "var(--ds-fg-tertiary)" }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--ds-develop)" }}
              />
              developer.ts
            </span>
          </div>
          <span className="text-mono-label" style={{ color: "var(--ds-fg-muted)" }}>
            01
          </span>
        </div>

        {/* Code body */}
        <div className="relative px-4 py-4 sm:px-5 sm:py-5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 80% 10%, rgba(10,114,239,0.10), transparent 60%)",
            }}
          />
          <div className="relative">
            {lines.map((line, idx) => (
              <Line key={idx} num={idx + 1} tokens={line.tokens} indent={line.indent} />
            ))}
          </div>
        </div>

        {/* Status footer */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{
            backgroundColor: "var(--ds-surface-subtle)",
            boxShadow: "inset 0 1px 0 0 var(--ds-border-shadow)",
          }}
        >
          <span className="text-mono-label" style={{ color: "var(--ds-fg-tertiary)" }}>
            TypeScript · UTF-8
          </span>
          <span
            className="text-mono-label inline-flex items-center gap-1.5"
            style={{ color: "var(--ds-fg-tertiary)" }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--ds-develop)" }}
            />
            Ln {lines.length} · Col 3
          </span>
        </div>
      </div>
    </div>
  );
}
