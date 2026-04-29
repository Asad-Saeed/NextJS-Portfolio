-- =====================================================================
-- Migration: Fiverr URL
-- Adds an optional Fiverr profile URL alongside the other social links.
-- Used in: Footer, Contact page socials, Person JSON-LD `sameAs`.
-- =====================================================================

ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS fiverr_url text;
