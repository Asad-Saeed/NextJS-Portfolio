// Parses the admin-managed `code_card_stack` (comma-separated tech names)
// into a trimmed array of up to `limit` non-empty entries.
export function parseCodeCardStack(raw: string | null | undefined, limit = 3): string[] {
  return (raw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, limit);
}
