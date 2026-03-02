import api from './client';

export async function apply(payload: unknown) {
  const res = await api.post('/applications', payload);
  return res.data;
}

export async function getApplications(params?: Record<string, unknown>) {
  const res = await api.get('/applications', { params });
  return res.data;
}

export async function getApplication(id: string) {
  const res = await api.get(`/applications/${id}`);
  return res.data;
}

export async function updateApplicationStatus(id: string, status: string) {
  const res = await api.patch(`/applications/${id}/status`, { status });
  return res.data;
}
