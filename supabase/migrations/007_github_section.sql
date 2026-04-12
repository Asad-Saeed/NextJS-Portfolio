-- Add GitHub integration fields to profile table
ALTER TABLE profile
  ADD COLUMN IF NOT EXISTS show_github_section BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS github_section_heading TEXT NOT NULL DEFAULT 'GitHub Activity';
