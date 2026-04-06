-- Add per-page banner headings to profile table
ALTER TABLE profile ADD COLUMN IF NOT EXISTS skills_banner_heading TEXT NOT NULL DEFAULT 'What Skills I Have!';
ALTER TABLE profile ADD COLUMN IF NOT EXISTS background_banner_heading TEXT NOT NULL DEFAULT 'My Background';
ALTER TABLE profile ADD COLUMN IF NOT EXISTS portfolio_banner_heading TEXT NOT NULL DEFAULT 'My Portfolio';
ALTER TABLE profile ADD COLUMN IF NOT EXISTS contact_banner_heading TEXT NOT NULL DEFAULT 'Get In Touch';

-- Update existing rows with defaults
UPDATE profile SET
  skills_banner_heading = 'What Skills I Have!',
  background_banner_heading = 'My Background',
  portfolio_banner_heading = 'My Portfolio',
  contact_banner_heading = 'Get In Touch'
WHERE skills_banner_heading = 'What Skills I Have!';
