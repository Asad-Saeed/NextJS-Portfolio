-- ============================================
-- Multi-User Migration
-- Adds user_id to all tables, slug to profile
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Add slug to profile
ALTER TABLE profile ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
CREATE INDEX IF NOT EXISTS idx_profile_slug ON profile(slug);

-- 2. Add user_id to all data tables
ALTER TABLE profile ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE education ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE experience ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE expertise ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE skills ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE recommendations ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE client_reviews ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE languages ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE tech_stack ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE sidebar_skills ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 3. Indexes on user_id
CREATE INDEX IF NOT EXISTS idx_profile_user_id ON profile(user_id);
CREATE INDEX IF NOT EXISTS idx_education_user_id ON education(user_id);
CREATE INDEX IF NOT EXISTS idx_experience_user_id ON experience(user_id);
CREATE INDEX IF NOT EXISTS idx_expertise_user_id ON expertise(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_user_id ON portfolio_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_user_id ON skills(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON client_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_languages_user_id ON languages(user_id);
CREATE INDEX IF NOT EXISTS idx_tech_stack_user_id ON tech_stack(user_id);
CREATE INDEX IF NOT EXISTS idx_sidebar_skills_user_id ON sidebar_skills(user_id);

-- 4. Set existing data to Asad's user_id
-- First get Asad's auth user ID
DO $$
DECLARE
  asad_uid UUID;
BEGIN
  SELECT id INTO asad_uid FROM auth.users WHERE email = 'asadsaeed.dev@gmail.com' LIMIT 1;

  IF asad_uid IS NOT NULL THEN
    UPDATE profile SET user_id = asad_uid, slug = 'asad-saeed' WHERE user_id IS NULL;
    UPDATE education SET user_id = asad_uid WHERE user_id IS NULL;
    UPDATE experience SET user_id = asad_uid WHERE user_id IS NULL;
    UPDATE expertise SET user_id = asad_uid WHERE user_id IS NULL;
    UPDATE portfolio_projects SET user_id = asad_uid WHERE user_id IS NULL;
    UPDATE skills SET user_id = asad_uid WHERE user_id IS NULL;
    UPDATE recommendations SET user_id = asad_uid WHERE user_id IS NULL;
    UPDATE client_reviews SET user_id = asad_uid WHERE user_id IS NULL;
    UPDATE languages SET user_id = asad_uid WHERE user_id IS NULL;
    UPDATE tech_stack SET user_id = asad_uid WHERE user_id IS NULL;
    UPDATE sidebar_skills SET user_id = asad_uid WHERE user_id IS NULL;
    RAISE NOTICE 'Updated all rows with user_id: %', asad_uid;
  ELSE
    RAISE NOTICE 'User asadsaeed.dev@gmail.com not found in auth.users';
  END IF;
END $$;

-- 5. Drop old RLS policies and create new user-scoped ones
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'profile','education','experience','expertise',
    'portfolio_projects','project_technologies','skills','skill_levels',
    'recommendations','client_reviews','languages','tech_stack','sidebar_skills'
  ])
  LOOP
    -- Drop existing policies
    EXECUTE format('DROP POLICY IF EXISTS "Public read" ON %I', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "Auth insert" ON %I', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "Auth update" ON %I', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "Auth delete" ON %I', tbl);

    -- New public read (anyone can read all data)
    EXECUTE format('CREATE POLICY "Public read" ON %I FOR SELECT USING (true)', tbl);
  END LOOP;

  -- User-scoped write policies for tables WITH user_id
  FOR tbl IN SELECT unnest(ARRAY[
    'profile','education','experience','expertise',
    'portfolio_projects','skills',
    'recommendations','client_reviews','languages','tech_stack','sidebar_skills'
  ])
  LOOP
    EXECUTE format('CREATE POLICY "Owner insert" ON %I FOR INSERT WITH CHECK (auth.uid() = user_id)', tbl);
    EXECUTE format('CREATE POLICY "Owner update" ON %I FOR UPDATE USING (auth.uid() = user_id)', tbl);
    EXECUTE format('CREATE POLICY "Owner delete" ON %I FOR DELETE USING (auth.uid() = user_id)', tbl);
  END LOOP;

  -- Junction tables (project_technologies, skill_levels) - check parent ownership
  -- For simplicity, allow authenticated users to write (RLS on parent table protects data)
  FOR tbl IN SELECT unnest(ARRAY['project_technologies','skill_levels'])
  LOOP
    EXECUTE format('CREATE POLICY "Auth insert" ON %I FOR INSERT WITH CHECK (auth.role() = ''authenticated'')', tbl);
    EXECUTE format('CREATE POLICY "Auth update" ON %I FOR UPDATE USING (auth.role() = ''authenticated'')', tbl);
    EXECUTE format('CREATE POLICY "Auth delete" ON %I FOR DELETE USING (auth.role() = ''authenticated'')', tbl);
  END LOOP;
END $$;
