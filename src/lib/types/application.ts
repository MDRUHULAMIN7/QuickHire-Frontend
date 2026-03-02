import type { PaginationMeta } from "./api";
import type { JobSummary } from "./job";

export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "shortlisted"
  | "rejected";

export type ApplicationPayload = {
  job: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
};

export type ApplicationResponse = {
  _id: string;
  job: string | JobSummary;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  status: ApplicationStatus;
  createdAt?: string;
};

export type ApplicationDetail = ApplicationResponse;

export type ApplicationListResponse = {
  meta: PaginationMeta;
  data: ApplicationDetail[];
};

export type ApplicationQueryParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  fields?: string;
  status?: ApplicationStatus | "all";
};
