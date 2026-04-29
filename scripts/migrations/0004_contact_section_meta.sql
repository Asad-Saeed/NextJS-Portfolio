-- =====================================================================
-- Migration: Contact page section meta
-- Adds editable eyebrow / heading / description for both the Contact
-- info section and the Send-a-message form section.
-- =====================================================================

ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS contact_eyebrow text,
  ADD COLUMN IF NOT EXISTS contact_heading text,
  ADD COLUMN IF NOT EXISTS contact_description text,

  ADD COLUMN IF NOT EXISTS contact_form_eyebrow text,
  ADD COLUMN IF NOT EXISTS contact_form_heading text,
  ADD COLUMN IF NOT EXISTS contact_form_description text;
