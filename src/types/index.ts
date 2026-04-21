export interface Version {
  version: string;
  changelog: string;
  date: number;
}

export interface Mod {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  shortDesc: string;
  longDesc: string;
  author: string;
  tags: string[];
  type: 'mcaddon' | 'mcworld' | 'mcpack' | 'mctemplate';
  createdAt: number;
  versions: Version[];
  screenshots: string[];
  gumroadUrl: string;
  downloadCount: number;
}

export interface FilterState {
  types: string[];
  tags: string[];
  sortBy: 'newest' | 'popular';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
  order: number;
}
