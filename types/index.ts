export interface EduCard {
  id: number;
  title: string;
  marks: string;
  degree: string;
  detail: string;
  year: string;
}

export interface ExpCard {
  id: number;
  title: string;
  role: string;
  url: string;
  desc: string;
  year: string;
  location: string;
}

export interface BackgroundData {
  eduCards?: EduCard[];
  expCards?: ExpCard[];
}

export interface ExpertiseItem {
  id: number;
  title: string;
  desc: string;
}

export interface TechUsed {
  tech: string;
}

export interface PortfolioProject {
  id: number;
  projectName: string;
  url: string;
  image: string;
  projectDetail: string;
  technologiesUsed: TechUsed[];
}

export interface RecommendationItem {
  id: number;
  name: string;
  image: string;
  designation: string;
  view: string;
  linkednURL: string;
}

export interface ReviewItem {
  id: number;
  clientName: string;
  clientLocation: string;
  clientSource: string;
  clientReview: string;
}

export interface SkillLevel {
  title: string;
  level: string;
}

export interface SkillItem {
  id: number;
  techName: string;
  url: string;
  image: string;
  skill: SkillLevel[];
  description: string;
}
