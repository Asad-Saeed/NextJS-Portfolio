# CLAUDE.md — Project Rules (read first, every session)

> Auto-loaded into every Claude session. These rules are **mandatory** — treat each as an acceptance
> criterion. If a change would break one, stop and flag it. Deep reference: **`docs/knowledgebase.md`**
> (local-only, gitignored) — read it before non-trivial work. This file is the committed summary.

## What this is

Single-tenant developer portfolio. **Next.js 16 App Router + React 19 + TS 6 + Supabase (Postgres/Auth/RLS/Storage) + Tailwind v4**. Content is admin-managed via CRUD; public site renders from the DB with heavy SEO/AEO investment.

**Stack is deliberately minimal.** No Ant Design, React Query, Axios, Redux, or form lib — native `fetch`, Server Components, Server Actions, `useState` only. The README is stale (ignore its "multi-tenant"/Ant Design claims); trust the code and `docs/knowledgebase.md`.

## Workflow (engineering charter)

1. **Plan before coding.** For any ticket: summarize the requirement, list impacted areas, give a technical approach + risks + test strategy, then **wait for approval** before implementing.
2. Reuse existing patterns/primitives; don't introduce new patterns or deps without a strong, stated reason.
3. Protect existing behavior — no regressions to auth, routing (`proxy.ts`), or `show_*_section` toggles.
4. Avoid overengineering. Simplest maintainable solution.
5. Commit/push **only when asked**; branch first; use the required `Co-Authored-By` trailer.

## Data layer (strict)

- **Reads** → `lib/queries/*` via `getPublicSupabaseClient()`; silent fallback (`?? []` / `null`); wrap in `React.cache()` if reused per render.
- **Writes** → `lib/actions/*` with `"use server"`; check `auth.getUser()` → `if (!user) return { error }`; scope with `.eq("user_id", user.id)`; uniform return `{ success: true } | { error: string }` (**never throw**); `revalidatePath("/", "layout")` after mutating.
- **Clients:** public reads → `getPublicSupabaseClient()`; authed writes → `createServerSupabaseClient()`; signup/storage → `getAdminSupabaseClient()` (**service role, server-only, never reaches browser**).
- Junction tables (`skill_levels`, `project_technologies`) → delete-then-insert on update.
- Never trust client-supplied `user_id`; resolve owner server-side.

## SEO rules (every public route)

- Export async `generateMetadata()` with DB-driven title/description, **canonical** (`alternates.canonical`), `openGraph`, `twitter: summary_large_image`.
- JSON-LD only via `safeJsonLd()` (`lib/json-ld.ts`) before `dangerouslySetInnerHTML`. Keep correct schema.org `@type`s; every page gets a `BreadcrumbList`.
- New indexable route → add to `app/sitemap.ts` (with image-sitemap ext if it has a primary image).
- All URLs from `getSiteUrl()`. `(admin)`/`(auth)`/404 must be `robots: { index:false, follow:false }`. New private namespaces → add to `PRIVATE_PATHS` in `app/robots.ts`.

## AEO/GEO rules (AI answer-engine optimization)

- AI crawlers are **explicitly allowed** in `app/robots.ts` (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.). Don't block them.
- **Update `app/llms.txt/route.ts`** whenever profile content types change.
- Write answer-first, self-contained facts; keep the person's name/role/location/links identical across `Person` JSON-LD, `llms.txt`, OG images, and visible text. Use semantic headings (one `h1`).

## Performance

Server-first (client only for interactivity); `<Suspense>` + dimension-matched skeleton + `loading.tsx` for async; `next/image` with `sizes` (`priority` only for LCP); keep `revalidate=3600`; new image hosts → `next.config.ts remotePatterns`; import `react-icons` from subpaths; respect `prefers-reduced-motion`.

## Accessibility

Semantic landmarks, one `h1`, `aria-label` on icon buttons, `aria-current="page"` on active nav, visible focus, contrast in **both** themes, meaningful `alt`.

## Security

Service-role key server-only; auth-gate every mutation; RLS (public-SELECT + owner-write) mandatory on new tables; never disable `next.config.ts` security headers; uploads via `uploadFile` (validate bucket/type, 10 MB cap); escape JSON-LD via `safeJsonLd`; redirects only via `redirect()`/`notFound()`.

## Database changes

Append a **new numbered migration** (`supabase/migrations/0NN_*.sql`) — never edit shipped ones; update `types/index.ts` (rows map 1:1 to columns); add RLS policies; note it in `docs/knowledgebase.md`.

## Styling

Tailwind v4 is CSS-first (**no `tailwind.config.ts`**) — config lives in `styles/globals.css` (`@theme`/`@utility`/`@keyframes`). Style with `--ds-*` tokens or `ds-*` utilities; **never hardcode colors or inline new keyframes**. Theme via `next-themes` (`data-theme`, default dark).

## Adding a feature (recipes)

- **Admin entity:** `lib/actions/<e>.ts` + `lib/queries/<e>.ts` + `app/(admin)/admin/<e>/{page,client}.tsx` (use `CrudPage`) + nav entry in `AdminShell`.
- **Public page:** `generateMetadata` + canonical + JSON-LD + breadcrumb + `loading.tsx` + sitemap entry + `llms.txt` if profile content.

## Definition of Done

Acceptance criteria met, no regressions; SEO + AEO + perf + a11y + security rules satisfied; DB migration + types + RLS if schema changed; `npm run lint` and `npm run format:check` pass; `docs/knowledgebase.md` updated if a pattern/table/rule changed.

**Path alias:** `@/*` → repo root. **Aliased commands above are exact.**
