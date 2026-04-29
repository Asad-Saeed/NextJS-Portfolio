-- =====================================================================
-- Migration: Background page (Education + Experience) section meta
-- Adds editable eyebrow / heading / description for the two sections
-- on the Background page.
-- =====================================================================

ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS education_eyebrow text,
  ADD COLUMN IF NOT EXISTS education_heading text,
  ADD COLUMN IF NOT EXISTS education_description text,

  ADD COLUMN IF NOT EXISTS experience_eyebrow text,
  ADD COLUMN IF NOT EXISTS experience_heading text,
  ADD COLUMN IF NOT EXISTS experience_description text;
