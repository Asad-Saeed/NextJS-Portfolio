-- Add banner emoji/character image URL and explore button
ALTER TABLE profile ADD COLUMN IF NOT EXISTS banner_emoji_url TEXT NOT NULL DEFAULT '';
ALTER TABLE profile ADD COLUMN IF NOT EXISTS explore_button_text TEXT NOT NULL DEFAULT 'Explore';
ALTER TABLE profile ADD COLUMN IF NOT EXISTS explore_button_url TEXT NOT NULL DEFAULT '';
