# NextJS Portfolio — Multi-Tenant Developer Portfolio Platform

A production-grade, multi-tenant portfolio platform where developers can sign up, build, and manage their personal portfolio — featuring dynamic GitHub integration, case study project pages, admin-managed content, per-user SEO, and a professional dark UI.

Built with Next.js 16, React 19, TypeScript, Supabase (Auth, Database, Storage), Tailwind CSS v4, and Ant Design.

## Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript 6 |
| **Database & Auth** | Supabase (PostgreSQL, Auth, Row-Level Security, Storage) |
| **Styling** | Tailwind CSS v4, PostCSS, SASS |
| **UI Components** | Ant Design 6, React Icons |
| **State Management** | TanStack React Query 5 |
| **HTTP Client** | Axios |
| **GitHub Integration** | GitHub GraphQL API, jogruber Contributions API |
| **SEO** | JSON-LD Structured Data, Dynamic Metadata, Sitemap, Robots |
| **Animations** | Typewriter Effect, React Scroll |
| **Fonts** | Inter (sans), Fira Code (mono) via next/font |

## Key Features

- **Multi-Tenant Architecture** — any user signs up and gets their own portfolio at `/{slug}`
- **Dynamic GitHub Section** — contribution heatmap with year switcher, pro stats (stars, repos, followers), top languages, pinned repositories, and computed achievements — powered by GitHub GraphQL API with automatic jogruber fallback
- **Case Study Project Pages** — rich project detail pages with challenge, solution, impact metrics, and role at `/{slug}/portfolio/{project}`
- **Admin Dashboard** — full CRUD management for profile, education, experience, expertise, projects, skills, recommendations, reviews, sidebar, and messages
- **Section Visibility Toggles** — admin checkboxes to show/hide GitHub, Expertise, Recommendations, and Client Reviews sections on the home page
- **Availability Status Badge** — "Open to Work" / "Available for Freelance" indicator with animated pulse dot, manageable from admin
- **Dynamic Per-User Favicons** — profile image rendered as circular favicon via `next/og` ImageResponse, with black-dot fallback
- **Per-Page SEO** — unique metadata, OpenGraph, Twitter cards, canonical URLs, and JSON-LD `Person` schema for every portfolio page
- **Dynamic Sitemap & Robots** — auto-generated from all profile slugs, disallows admin/auth/API routes
- **Contact Form** — with WhatsApp integration, email links, and message storage
- **Responsive Design** — mobile bottom navigation with animated tab bar, desktop sidebar + right nav layout
- **Image Upload** — Supabase Storage with presigned URLs, supports profile images, banners, project screenshots, and resume PDFs
- **Auth System** — signup/login with Supabase Auth, admin route protection via middleware

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Supabase project (free tier works)

### Clone the Repository

```bash
git clone https://github.com/Asad-Saeed/NextJS-Portfolio.git
cd NextJS-Portfolio
```

### Install Dependencies

```bash
npm install
```

### Environment Setup

Create `.env.local` with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional — auto-detected on Vercel if not set
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional — enables accurate GitHub contribution data including private repos
GITHUB_TOKEN=ghp_your_personal_access_token
```

### Database Setup

Run the migrations in order from `supabase/migrations/` in your Supabase SQL Editor:

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
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
NextJS-Portfolio/
├── app/
│   ├── (auth)/auth/               # Login & signup pages
│   ├── (admin)/admin/             # Admin dashboard & CRUD pages
│   │   ├── profile/               # Profile, banner, GitHub, section toggles
│   │   ├── education/             # Education management
│   │   ├── experience/            # Experience management
│   │   ├── expertise/             # Expertise cards management
│   │   ├── portfolio/             # Projects & case studies management
│   │   ├── skills/                # Skills management
│   │   ├── recommendations/       # Recommendations management
│   │   ├── reviews/               # Client reviews management
│   │   ├── sidebar/               # Languages, tech stack, sidebar skills
│   │   └── messages/              # Contact form messages
│   ├── (portfolio)/[slug]/        # Dynamic portfolio pages
│   │   ├── skills/                # Skills page
│   │   ├── background/            # Education & experience
│   │   ├── portfolio/             # Projects listing
│   │   │   └── [project]/         # Case study detail page
│   │   └── contact/               # Contact form
│   ├── api/                       # API routes
│   │   └── github/contributions/  # GitHub year-switch endpoint
│   ├── sitemap.ts                 # Dynamic sitemap
│   ├── robots.ts                  # Robots.txt
│   ├── icon.tsx                   # Root favicon (black dot)
│   └── not-found.tsx              # Custom 404 page
├── components/
│   ├── Common/                    # Intro sidebar, badges, skeletons
│   ├── HomeComponents/            # Banner, expertise, recommendations, reviews
│   │   └── GitHub/                # Contribution graph, pro stats, achievements
│   ├── Portfolio/                 # Project cards
│   ├── Background/                # Education & experience cards
│   ├── admin/                     # Admin shell, CRUD page, image upload
│   └── Footer.tsx                 # Page footer
├── lib/
│   ├── actions/                   # Server actions (auth, profile, portfolio, etc.)
│   ├── queries/                   # Supabase read queries
│   ├── supabase/                  # Client, server, admin, public, middleware clients
│   ├── github.ts                  # GitHub API helpers (GraphQL + REST + jogruber)
│   └── site-url.ts                # Site URL auto-detection helper
├── types/                         # TypeScript interfaces
├── styles/                        # Global CSS & Tailwind theme
├── supabase/migrations/           # SQL migration files
├── scripts/                       # Seed scripts
├── public/                        # Static assets
├── next.config.ts                 # Next.js config (serverActions bodySizeLimit)
└── tsconfig.json                  # TypeScript config
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run seed` | Seed database with sample data |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
4. Deploy — `NEXT_PUBLIC_SITE_URL` auto-detects from `VERCEL_PROJECT_PRODUCTION_URL`

### GitHub Token (Optional)

For accurate GitHub contribution data (including private repos), create a GitHub PAT with `read:user` scope and add `GITHUB_TOKEN` to your environment variables.

## Developed By

**Asad Saeed** — Senior Frontend & MERN Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-Asad--Saeed-181717?logo=github)](https://github.com/Asad-Saeed)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-asad--saeed--dev-0A66C2?logo=linkedin)](https://linkedin.com/in/asad-saeed-4685a9202)
[![Portfolio](https://img.shields.io/badge/Portfolio-asad--saeed.vercel.app-000?logo=vercel)](https://asad-saeed.vercel.app)

## License

MIT
