export type ServiceNiche = 'New Build' | 'Resurfacing' | 'Railing' | 'Covered Deck' | 'Commercial';

export interface ProjectImage {
  url: string;
  label?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  rating: number;
}

export interface Project {
  id: string;
  title: string;
  niche: ServiceNiche;
  location: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  gallery?: ProjectImage[];
  date: string;
  featured?: boolean;
  testimonial?: Testimonial;
}

export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
