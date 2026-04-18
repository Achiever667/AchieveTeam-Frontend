export interface IUser{
    id: string | number
    name: string
}

export interface IJob {
  id: string | number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary?: string;
  postedAt: string;
  logoUrl?: string;
  tags: string[];
}