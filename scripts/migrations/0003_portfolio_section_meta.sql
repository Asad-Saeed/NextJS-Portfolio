-- =====================================================================
-- Migration: Portfolio page section meta
-- Adds editable eyebrow / heading / description for the Projects section.
-- =====================================================================

ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS portfolio_eyebrow text,
  ADD COLUMN IF NOT EXISTS portfolio_heading text,
  ADD COLUMN IF NOT EXISTS portfolio_description text;
