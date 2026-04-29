-- =====================================================================
-- Migration: Section meta + hero code-card stack
-- Adds editable eyebrow / heading / description columns for every
-- top-level section on the portfolio, plus a comma-separated stack
-- list for the hero "developer.ts" card.
--
-- Safe to run multiple times: every column uses IF NOT EXISTS.
-- Run via Supabase SQL editor or `psql`.
-- =====================================================================

-- Hero code card
ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS code_card_stack text;

-- Home page sections
ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS expertise_eyebrow text,
  ADD COLUMN IF NOT EXISTS expertise_heading text,
  ADD COLUMN IF NOT EXISTS expertise_description text,

  ADD COLUMN IF NOT EXISTS certifications_eyebrow text,
  ADD COLUMN IF NOT EXISTS certifications_heading text,
  ADD COLUMN IF NOT EXISTS certifications_description text,

  ADD COLUMN IF NOT EXISTS recommendations_eyebrow text,
  ADD COLUMN IF NOT EXISTS recommendations_heading text,
  ADD COLUMN IF NOT EXISTS recommendations_description text,

  ADD COLUMN IF NOT EXISTS reviews_eyebrow text,
  ADD COLUMN IF NOT EXISTS reviews_heading text,
  ADD COLUMN IF NOT EXISTS reviews_description text;

-- Skills page section
ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS skills_eyebrow text,
  ADD COLUMN IF NOT EXISTS skills_heading text,
  ADD COLUMN IF NOT EXISTS skills_description text;

-- GitHub sub-sections
ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS github_eyebrow text,
  ADD COLUMN IF NOT EXISTS github_description text,

  ADD COLUMN IF NOT EXISTS github_stats_eyebrow text,
  ADD COLUMN IF NOT EXISTS github_stats_heading text,

  ADD COLUMN IF NOT EXISTS github_languages_eyebrow text,
  ADD COLUMN IF NOT EXISTS github_languages_heading text,

  ADD COLUMN IF NOT EXISTS github_repos_eyebrow text,
  ADD COLUMN IF NOT EXISTS github_repos_heading text,

  ADD COLUMN IF NOT EXISTS github_achievements_eyebrow text,
  ADD COLUMN IF NOT EXISTS github_achievements_heading text;
