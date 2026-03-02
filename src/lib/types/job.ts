import type { PaginationMeta } from "./api";

export type JobSummary = {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  employment_type: string;
  createdAt?: string;
};

export type JobDetail = JobSummary & {
  description: string;
  tags?: string[];
  company_logo_url?: string;
};

export type JobFormValues = {
  title: string;
  company: string;
  location: string;
  category: string;
  employment_type: string;
  description: string;
  tags?: string;
  company_logo_url?: string;
};

export type JobPayload = {
  title: string;
  company: string;
  location: string;
  category: string;
  employment_type: string;
  description: string;
  tags?: string[];
  company_logo_url?: string;
};

export type JobQueryParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  fields?: string;
  category?: string;
  employment_type?: string;
};

export type JobListResponse = {
  meta: PaginationMeta;
  data: JobSummary[];
};
