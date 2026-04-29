// Resolves the active single-tenant portfolio slug from the environment.
export function getPortfolioSlug(): string {
  return process.env.PORTFOLIO_SLUG || process.env.NEXT_PUBLIC_DEFAULT_SLUG || "asad-saeed";
}
