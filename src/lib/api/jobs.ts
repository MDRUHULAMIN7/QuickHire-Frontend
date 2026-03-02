import api from "./client";
import type { ApiResponse } from "../types/api";
import type {
  JobDetail,
  JobListResponse,
  JobPayload,
  JobQueryParams,
} from "../types/job";

export async function getJobs(params?: JobQueryParams) {
  const res = await api.get<ApiResponse<JobListResponse["data"]>>("/jobs", {
    params,
  });
  return res.data;
}

export async function getJob(id: string) {
  const res = await api.get<ApiResponse<JobDetail>>(`/jobs/${id}`);
  return res.data;
}

export async function createJob(payload: JobPayload) {
  const res = await api.post<ApiResponse<JobDetail>>("/jobs", payload);
  return res.data;
}

export async function updateJob(id: string, payload: JobPayload) {
  const res = await api.patch<ApiResponse<JobDetail>>(`/jobs/${id}`, payload);
  return res.data;
}

export async function deleteJob(id: string) {
  const res = await api.delete<ApiResponse<JobDetail>>(`/jobs/${id}`);
  return res.data;
}
