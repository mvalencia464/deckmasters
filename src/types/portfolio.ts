export type ServiceNiche = 'Kitchen' | 'Bathroom' | 'Living' | 'Outdoor' | 'Full Home' | 'Roofing' | 'Flooring';

export interface ProjectImage {
  url: string;
  label?: string;
}

export interface Project {
  id: string;
  title: string;
  niche: ServiceNiche;
  location: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  gallery: ProjectImage[];
  date: string;
  featured?: boolean;
}

export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
