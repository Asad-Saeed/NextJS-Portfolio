-- Complete banner fields migration (run this one file — covers 004 + 005)
-- Safe to run even if some columns already exist

ALTER TABLE profile ADD COLUMN IF NOT EXISTS skills_banner_heading TEXT NOT NULL DEFAULT 'What Skills I Have!';
ALTER TABLE profile ADD COLUMN IF NOT EXISTS background_banner_heading TEXT NOT NULL DEFAULT 'My Background';
ALTER TABLE profile ADD COLUMN IF NOT EXISTS portfolio_banner_heading TEXT NOT NULL DEFAULT 'My Portfolio';
ALTER TABLE profile ADD COLUMN IF NOT EXISTS contact_banner_heading TEXT NOT NULL DEFAULT 'Get In Touch';
ALTER TABLE profile ADD COLUMN IF NOT EXISTS banner_emoji_url TEXT NOT NULL DEFAULT '';
ALTER TABLE profile ADD COLUMN IF NOT EXISTS explore_button_text TEXT NOT NULL DEFAULT 'Explore';
ALTER TABLE profile ADD COLUMN IF NOT EXISTS explore_button_url TEXT NOT NULL DEFAULT '';

-- Seed existing profiles with proper values
UPDATE profile SET
  skills_banner_heading = COALESCE(NULLIF(skills_banner_heading, ''), 'What Skills I Have!'),
  background_banner_heading = COALESCE(NULLIF(background_banner_heading, ''), 'My Background'),
  portfolio_banner_heading = COALESCE(NULLIF(portfolio_banner_heading, ''), 'My Portfolio'),
  contact_banner_heading = COALESCE(NULLIF(contact_banner_heading, ''), 'Get In Touch'),
  explore_button_text = COALESCE(NULLIF(explore_button_text, ''), 'Explore'),
  explore_button_url = COALESCE(NULLIF(explore_button_url, ''), upwork_url)
WHERE explore_button_url = '' OR explore_button_url IS NULL;
