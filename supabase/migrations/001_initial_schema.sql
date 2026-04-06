-- ============================================
-- Portfolio CMS Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- TABLE: profile (single row)
CREATE TABLE profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT '',
  designation TEXT NOT NULL DEFAULT '',
  residence TEXT NOT NULL DEFAULT '',
  nationality TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  age TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  github_url TEXT NOT NULL DEFAULT '',
  linkedin_url TEXT NOT NULL DEFAULT '',
  upwork_url TEXT NOT NULL DEFAULT '',
  profile_image_url TEXT NOT NULL DEFAULT '',
  resume_url TEXT NOT NULL DEFAULT '',
  banner_image_url TEXT NOT NULL DEFAULT '',
  banner_heading TEXT NOT NULL DEFAULT '',
  banner_subheadings TEXT[] NOT NULL DEFAULT '{}',
  completed_projects_count TEXT NOT NULL DEFAULT '0',
  freelance_clients_count TEXT NOT NULL DEFAULT '0',
  honors_count TEXT NOT NULL DEFAULT '0',
  footer_text TEXT NOT NULL DEFAULT '',
  copyright_year TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- TABLE: education
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  marks TEXT NOT NULL DEFAULT '',
  degree TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  year TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- TABLE: experience
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  year TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- TABLE: expertise
CREATE TABLE expertise (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- TABLE: portfolio_projects
CREATE TABLE portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name TEXT NOT NULL,
  url TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  project_detail TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- TABLE: project_technologies (junction)
CREATE TABLE project_technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  tech_name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- TABLE: skills
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tech_name TEXT NOT NULL,
  url TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- TABLE: skill_levels (junction)
CREATE TABLE skill_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT '0%',
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- TABLE: recommendations
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image_url TEXT NOT NULL DEFAULT '',
  designation TEXT NOT NULL DEFAULT '',
  view TEXT NOT NULL DEFAULT '',
  linkedin_url TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- TABLE: client_reviews
CREATE TABLE client_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_location TEXT NOT NULL DEFAULT '',
  client_source TEXT NOT NULL DEFAULT '',
  client_review TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- TABLE: languages
CREATE TABLE languages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  proficiency INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- TABLE: tech_stack (sidebar badges)
CREATE TABLE tech_stack (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- TABLE: sidebar_skills (sidebar progress bars)
CREATE TABLE sidebar_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT '0%',
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX idx_education_sort ON education(sort_order);
CREATE INDEX idx_experience_sort ON experience(sort_order);
CREATE INDEX idx_expertise_sort ON expertise(sort_order);
CREATE INDEX idx_portfolio_projects_sort ON portfolio_projects(sort_order);
CREATE INDEX idx_project_technologies_project ON project_technologies(project_id);
CREATE INDEX idx_skills_sort ON skills(sort_order);
CREATE INDEX idx_skill_levels_skill ON skill_levels(skill_id);
CREATE INDEX idx_recommendations_sort ON recommendations(sort_order);
CREATE INDEX idx_client_reviews_sort ON client_reviews(sort_order);
CREATE INDEX idx_languages_sort ON languages(sort_order);
CREATE INDEX idx_tech_stack_sort ON tech_stack(sort_order);
CREATE INDEX idx_sidebar_skills_sort ON sidebar_skills(sort_order);

-- ============================================
-- Updated_at trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON profile FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON education FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON experience FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON expertise FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON portfolio_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON recommendations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON client_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Row Level Security
-- ============================================
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE expertise ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE sidebar_skills ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read" ON profile FOR SELECT USING (true);
CREATE POLICY "Public read" ON education FOR SELECT USING (true);
CREATE POLICY "Public read" ON experience FOR SELECT USING (true);
CREATE POLICY "Public read" ON expertise FOR SELECT USING (true);
CREATE POLICY "Public read" ON portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Public read" ON project_technologies FOR SELECT USING (true);
CREATE POLICY "Public read" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read" ON skill_levels FOR SELECT USING (true);
CREATE POLICY "Public read" ON recommendations FOR SELECT USING (true);
CREATE POLICY "Public read" ON client_reviews FOR SELECT USING (true);
CREATE POLICY "Public read" ON languages FOR SELECT USING (true);
CREATE POLICY "Public read" ON tech_stack FOR SELECT USING (true);
CREATE POLICY "Public read" ON sidebar_skills FOR SELECT USING (true);

-- Authenticated write policies
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
    EXECUTE format('CREATE POLICY "Auth insert" ON %I FOR INSERT WITH CHECK (auth.role() = ''authenticated'')', tbl);
    EXECUTE format('CREATE POLICY "Auth update" ON %I FOR UPDATE USING (auth.role() = ''authenticated'')', tbl);
    EXECUTE format('CREATE POLICY "Auth delete" ON %I FOR DELETE USING (auth.role() = ''authenticated'')', tbl);
  END LOOP;
END $$;

-- ============================================
-- Storage buckets (run these separately if needed)
-- ============================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('profile', 'profile', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('projects', 'projects', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('skills', 'skills', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('recommendations', 'recommendations', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true);
