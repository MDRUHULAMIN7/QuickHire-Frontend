export type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  employment_type: string;
  tags?: string[];
  company_logo_url?: string;
  createdAt?: string;
};
