import api from "./client";
import type { ApiResponse } from "../types/api";
import type {
  ApplicationPayload,
  ApplicationQueryParams,
  ApplicationResponse,
  ApplicationStatus,
  ApplicationListResponse,
} from "../types/application";

export async function createApplication(payload: ApplicationPayload) {
  const res = await api.post<ApiResponse<ApplicationResponse>>(
    "/applications",
    payload,
  );
  return res.data;
}

export async function getApplications(params?: ApplicationQueryParams) {
  const res = await api.get<ApiResponse<ApplicationListResponse["data"]>>(
    "/applications",
    { params },
  );
  return res.data;
}

export async function getApplication(id: string) {
  const res = await api.get<ApiResponse<ApplicationResponse>>(
    `/applications/${id}`,
  );
  return res.data;
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
) {
  const res = await api.patch<ApiResponse<ApplicationResponse>>(
    `/applications/${id}/status`,
    { status },
  );
  return res.data;
}
