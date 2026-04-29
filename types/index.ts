// ===== Database row types (match Supabase columns) =====

export interface Profile {
  id: string;
  user_id: string;
  slug: string;
  name: string;
  designation: string;
  residence: string;
  nationality: string;
  city: string;
  age: string;
  email: string;
  phone: string;
  github_url: string;
  secondary_github_url: string;
  linkedin_url: string;
  upwork_url: string;
  fiverr_url?: string;
  profile_image_url: string;
  resume_url: string;
  banner_image_url: string;
  banner_emoji_url: string;
  banner_heading: string;
  banner_subheadings: string[];
  completed_projects_count: string;
  freelance_clients_count: string;
  honors_count: string;
  footer_text: string;
  copyright_year: string;
  skills_banner_heading: string;
  background_banner_heading: string;
  portfolio_banner_heading: string;
  contact_banner_heading: string;
  explore_button_text: string;
  explore_button_url: string;
  show_github_section: boolean;
  github_section_heading: string;
  show_expertise_section: boolean;
  show_recommendations_section: boolean;
  show_reviews_section: boolean;
  show_certifications_section: boolean;
  availability_status: string;
  // ===== Admin-editable section meta (eyebrow + heading + description) =====
  expertise_eyebrow?: string;
  expertise_heading?: string;
  expertise_description?: string;
  certifications_eyebrow?: string;
  certifications_heading?: string;
  certifications_description?: string;
  recommendations_eyebrow?: string;
  recommendations_heading?: string;
  recommendations_description?: string;
  reviews_eyebrow?: string;
  reviews_heading?: string;
  reviews_description?: string;
  skills_eyebrow?: string;
  skills_heading?: string;
  skills_description?: string;
  github_eyebrow?: string;
  github_description?: string;
  github_stats_eyebrow?: string;
  github_stats_heading?: string;
  github_languages_eyebrow?: string;
  github_languages_heading?: string;
  github_repos_eyebrow?: string;
  github_repos_heading?: string;
  github_achievements_eyebrow?: string;
  github_achievements_heading?: string;
  // Background page (Education + Experience)
  education_eyebrow?: string;
  education_heading?: string;
  education_description?: string;
  experience_eyebrow?: string;
  experience_heading?: string;
  experience_description?: string;
  // Portfolio (Projects) page
  portfolio_eyebrow?: string;
  portfolio_heading?: string;
  portfolio_description?: string;
  // Contact page
  contact_eyebrow?: string;
  contact_heading?: string;
  contact_description?: string;
  contact_form_eyebrow?: string;
  contact_form_heading?: string;
  contact_form_description?: string;
  /** Comma-separated stack names for the hero code card (e.g. "TypeScript, React, Next.js"). */
  code_card_stack?: string;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  user_id: string;
  title: string;
  marks: string;
  degree: string;
  detail: string;
  year: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  user_id: string;
  title: string;
  role: string;
  url: string;
  description: string;
  year: string;
  location: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Expertise {
  id: string;
  user_id: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectTechnology {
  id: string;
  project_id: string;
  tech_name: string;
  sort_order: number;
}

export interface PortfolioProject {
  id: string;
  user_id: string;
  project_name: string;
  project_slug: string;
  url: string;
  image_url: string;
  project_detail: string;
  challenge: string;
  solution: string;
  impact: string;
  role: string;
  sort_order: number;
  project_technologies: ProjectTechnology[];
  created_at: string;
  updated_at: string;
}

export interface SkillLevel {
  id: string;
  skill_id: string;
  title: string;
  level: string;
  sort_order: number;
}

export interface Skill {
  id: string;
  user_id: string;
  tech_name: string;
  url: string;
  image_url: string;
  description: string;
  sort_order: number;
  skill_levels: SkillLevel[];
  created_at: string;
  updated_at: string;
}

export interface Recommendation {
  id: string;
  user_id: string;
  name: string;
  image_url: string;
  designation: string;
  view: string;
  linkedin_url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ClientReview {
  id: string;
  user_id: string;
  client_name: string;
  client_location: string;
  client_source: string;
  client_review: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Language {
  id: string;
  user_id: string;
  name: string;
  proficiency: number;
  sort_order: number;
}

export interface TechStack {
  id: string;
  user_id: string;
  name: string;
  sort_order: number;
}

export interface SidebarSkill {
  id: string;
  user_id: string;
  title: string;
  level: string;
  sort_order: number;
}

export interface Certification {
  id: string;
  user_id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_url: string;
  badge_image_url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  user_id: string;
  sender_name: string;
  sender_email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// ===== Derived types =====

export interface SidebarData {
  profile: Partial<Profile> | null;
  languages: Language[];
  techStack: TechStack[];
  sidebarSkills: SidebarSkill[];
}

export interface FooterData {
  footer_text: string;
  copyright_year: string;
  email: string;
  upwork_url: string;
  github_url?: string;
  linkedin_url?: string;
  fiverr_url?: string;
  name?: string;
}
