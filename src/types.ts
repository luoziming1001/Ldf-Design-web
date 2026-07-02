export interface Project {
  id: string;
  title: string;
  englishTitle: string;
  category: string;
  imageUrl: string;
  client: string;
  date: string;
  role: string;
  description: string;
  tags: string[];
  stats: { label: string; value: string }[];
  concept: string;
  tools: string[];
  beforeImage: string; // Dynamic Before / After comparator (e.g. C4D Model structure vs Final lighting render)
  afterImage: string;
}

export interface DesignerStat {
  id: string;
  label: string;
  value: string;
  unit?: string;
  description: string;
}

export interface SkillItem {
  name: string;
  level: number; // percentage
  category: string;
}
