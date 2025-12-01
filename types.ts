export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  STUDY = 'study',
  LECTURE = 'lecture',
  TEMPLATES = 'templates',
  PORTFOLIO = 'portfolio',
  CONTACT = 'contact'
}

export enum FormStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  fullDescription: string;
}

export interface TemplateItem {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  features: string[];
}

export interface CourseItem {
  id: string;
  type: 'study' | 'lecture';
  title: string;
  date: string;
  description: string;
  targetAudience: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
