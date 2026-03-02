import type { ApplicationQueryParams } from "../types/application";

export const APPLICATION_STATUSES = [
  "pending",
  "reviewed",
  "shortlisted",
  "rejected",
] as const;

export function buildApplicationQuery(params: ApplicationQueryParams) {
  return {
    ...params,
    searchTerm: params.searchTerm?.trim() || undefined,
    status: params.status === "all" ? undefined : params.status,
    sort: params.sort || "-createdAt",
  };
}
