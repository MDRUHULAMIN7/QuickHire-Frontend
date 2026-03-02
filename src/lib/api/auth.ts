import api from './client';

export async function login(payload: { id: string; password: string }) {
  const res = await api.post('/auth/login', payload);
  return res.data as {
    success: boolean;
    message: string;
    data: { accessToken: string; needsPasswordChange?: boolean };
  };
}

export async function refreshAccessToken() {
  const res = await api.post('/auth/refresh-token');
  return res.data as {
    success: boolean;
    message: string;
    data: { accessToken: string };
  };
}
