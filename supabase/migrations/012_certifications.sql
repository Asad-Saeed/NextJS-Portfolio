CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  issuer TEXT NOT NULL DEFAULT '',
  issue_date TEXT NOT NULL DEFAULT '',
  credential_url TEXT NOT NULL DEFAULT '',
  badge_image_url TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_certifications_user_id ON certifications(user_id);

ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON certifications
  FOR SELECT USING (true);

CREATE POLICY "Users can manage own certifications" ON certifications
  FOR ALL USING (auth.uid() = user_id);

ALTER TABLE profile
  ADD COLUMN IF NOT EXISTS show_certifications_section BOOLEAN NOT NULL DEFAULT TRUE;
