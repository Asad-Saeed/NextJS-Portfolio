# Asad Saeed — Developer Portfolio

A production-grade personal portfolio built with Next.js 16 App Router, React 19, and Supabase. All content is admin-managed via a full CRUD dashboard. The public site renders from the database with deep SEO, AEO (AI answer-engine optimization), Core Web Vitals, and accessibility investment.

**Live:** [asad-saeed.vercel.app](https://asad-saeed.vercel.app)

---

## Tech Stack

| Category               | Technologies                                                   |
| ---------------------- | -------------------------------------------------------------- |
| **Framework**          | Next.js 16 (App Router), React 19, TypeScript 6                |
| **Backend**            | Supabase (PostgreSQL, Auth, Row-Level Security, Storage)       |
| **Styling**            | Tailwind CSS v4 (CSS-first config), PostCSS, Sass              |
| **Editor**             | Tiptap v3 (WYSIWYG blog editor)                                |
| **Data fetching**      | Native `fetch`, React Server Components, Server Actions        |
| **GitHub Integration** | GitHub GraphQL API, jogruber Contributions API                 |
| **SEO / AEO**          | JSON-LD, Dynamic Metadata, OG Images, Sitemap, RSS, `llms.txt` |
| **Animations**         | Typewriter Effect, React Scroll                                |
| **Fonts**              | Inter (sans), Fira Code (mono) via `next/font`                 |

> No Ant Design, React Query, Axios, or Redux — deliberately minimal.

---

## Features

- **Admin Dashboard** — full CRUD for profile, education, experience, expertise, projects, skills, recommendations, reviews, certifications, blog posts, and messages
- **Blog Module** — WYSIWYG editor (Tiptap), tag chips, slug management, draft/publish workflow, RSS feed, per-post OG image, related posts, image lightbox
- **Dynamic GitHub Section** — contribution heatmap (year switcher), pro stats, top languages, featured repos, computed achievements
- **Case Study Project Pages** — challenge / solution / impact / role detail pages
- **Section Visibility Toggles** — show/hide any home-page section from admin
- **Availability Status Badge** — animated "Open to Work" indicator
- **Per-Page SEO** — `generateMetadata`, canonical URLs, JSON-LD (`Person`, `BlogPosting`, `BreadcrumbList`), OG + Twitter cards
- **AEO / GEO** — `llms.txt` machine-readable profile; AI crawlers explicitly allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- **Dynamic Sitemap & Robots** — image-sitemap extension for projects and blog posts
- **RSS Feed** — `/blog/rss.xml` (RSS 2.0 + `atom:link`, ISR 1h)
- **Responsive Design** — mobile bottom nav + safe-area insets; desktop sidebar + right nav rail
- **Image Upload** — Supabase Storage (upload or paste URL); 10 MB cap; bucket-scoped
- **Contact Form** — message storage + WhatsApp integration
- **Auth** — Supabase Auth; admin routes protected via Next.js middleware

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Supabase project (free tier works)

### Install

```bash
git clone https://github.com/Asad-Saeed/NextJS-Portfolio.git
cd NextJS-Portfolio
npm install
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Auto-detected on Vercel if omitted
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional — enables private-repo contribution data
GITHUB_TOKEN=ghp_your_personal_access_token
```

### Database Setup

Run migrations in order from `supabase/migrations/` in the Supabase SQL Editor:

```
001_initial_schema.sql
002_multi_user.sql
003_messages.sql
004_page_banners.sql
005_banner_emoji.sql
006_banner_complete.sql
007_github_section.sql
008_section_visibility.sql
009_availability_status.sql
010_case_studies.sql
011_unique_project_slug.sql
012_certifications.sql
013_secondary_github.sql
014_blog.sql
015_related_posts_settings.sql
```

### Run

```bash
npm run dev       # http://localhost:3000
npm run build
npm start
```

---

## Project Structure

```
NextJS-Portfolio/
├── app/
│   ├── (auth)/auth/               # Login & signup
│   ├── (admin)/admin/             # Admin dashboard
│   │   ├── profile/               # Profile, SEO, section toggles
│   │   ├── blog/                  # Blog post CRUD + WYSIWYG editor
│   │   ├── portfolio/             # Projects & case studies
│   │   ├── skills/                # Skills management
│   │   ├── expertise/             # Expertise cards
│   │   ├── education/             # Education
│   │   ├── experience/            # Work experience
│   │   ├── recommendations/       # LinkedIn-style recommendations
│   │   ├── reviews/               # Client reviews
│   │   ├── certifications/        # Certifications & badges
│   │   ├── sidebar/               # Languages, tech stack, sidebar skills
│   │   └── messages/              # Contact messages
│   ├── (portfolio)/               # Public portfolio pages
│   │   ├── page.tsx               # Home — banner, GitHub, expertise, blog…
│   │   ├── blog/                  # Blog list (paginated) + [slug] detail
│   │   ├── skills/                # Skills page
│   │   ├── background/            # Education & experience
│   │   ├── portfolio/             # Projects + [project] case study
│   │   └── contact/               # Contact form
│   ├── blog/rss.xml/route.ts      # RSS 2.0 feed
│   ├── llms.txt/route.ts          # Machine-readable profile for AI crawlers
│   ├── sitemap.ts                 # Dynamic sitemap (image-sitemap ext)
│   ├── robots.ts                  # Robots rules (AI crawlers allowed)
│   └── icon.tsx                   # Favicon (profile initials)
├── components/
│   ├── Common/                    # Design-system primitives (Tooltip, ThemeToggle…)
│   ├── Blog/                      # ArticleContent (lightbox), CoverImage (expand)
│   ├── HomeComponents/            # Banner, Blog cards, GitHub, Expertise…
│   ├── Portfolio/                 # Project cards
│   ├── admin/                     # AdminShell, CrudPage, RichTextEditor, ImageUpload
│   └── Footer.tsx
├── lib/
│   ├── actions/                   # Server Actions (auth, profile, blog, portfolio…)
│   ├── queries/                   # Supabase read queries
│   ├── supabase/                  # Client variants (public, server, admin, middleware)
│   ├── markdown.ts                # sanitizeContent, computeReadingTime, generateSlug
│   ├── json-ld.ts                 # safeJsonLd() — XSS-safe JSON-LD serialiser
│   └── scroll.ts                  # react-scroll wrapper with Suspense guards
├── types/index.ts                 # TypeScript interfaces (mirror DB schema)
├── styles/globals.css             # Tailwind v4 config + ds-* design tokens
└── supabase/migrations/           # SQL migration files (001–015)
```

---

## Scripts

| Command                | Description              |
| ---------------------- | ------------------------ |
| `npm run dev`          | Start development server |
| `npm run build`        | Build for production     |
| `npm start`            | Start production server  |
| `npm run lint`         | ESLint                   |
| `npm run format`       | Prettier write           |
| `npm run format:check` | Prettier check           |

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Add env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy — `NEXT_PUBLIC_SITE_URL` auto-detects from `VERCEL_PROJECT_PRODUCTION_URL`

---

## Developed By

**Asad Saeed** — Senior Frontend Engineer | MERN Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-Asad--Saeed-181717?logo=github)](https://github.com/Asad-Saeed)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-asad--saeed--dev-0A66C2?logo=linkedin)](https://linkedin.com/in/asad-saeed-4685a9202)
[![Portfolio](https://img.shields.io/badge/Portfolio-asad--saeed.vercel.app-000?logo=vercel)](https://asad-saeed.vercel.app)

## License

MIT
