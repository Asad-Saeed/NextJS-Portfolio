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
  linkedin_url: string;
  upwork_url: string;
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
  url: string;
  image_url: string;
  project_detail: string;
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
}
