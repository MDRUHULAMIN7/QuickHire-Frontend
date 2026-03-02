import api from './client';

export async function getJobs(params?: Record<string, unknown>) {
  const res = await api.get('/jobs', { params });
  return res.data;
}

export async function getJob(id: string) {
  const res = await api.get(`/jobs/${id}`);
  return res.data;
}

export async function createJob(payload: unknown) {
  const res = await api.post('/jobs', payload);
  return res.data;
}

export async function deleteJob(id: string) {
  const res = await api.delete(`/jobs/${id}`);
  return res.data;
}
