import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("qh_access_token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;
    const isAuthRequest = originalRequest?.url?.includes("/auth/refresh-token");

    if (!originalRequest || status !== 401 || isAuthRequest) {
      return Promise.reject(error);
    }

    if ((originalRequest as { _retry?: boolean })._retry) {
      return Promise.reject(error);
    }
    (originalRequest as { _retry?: boolean })._retry = true;

    if (!refreshPromise) {
      const refreshUrl = `${api.defaults.baseURL}/auth/refresh-token`;
      refreshPromise = axios
        .post(refreshUrl, null, { withCredentials: true })
        .then((res) => {
          const token = res?.data?.data?.accessToken;
          if (token && typeof window !== "undefined") {
            localStorage.setItem("qh_access_token", token);
          }
          return token ?? null;
        })
        .catch(() => null)
        .finally(() => {
          refreshPromise = null;
        });
    }

    const newToken = await refreshPromise;
    if (!newToken) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("qh_access_token");
      }
      return Promise.reject(error);
    }

    originalRequest.headers = originalRequest.headers ?? {};
    originalRequest.headers.Authorization = `Bearer ${newToken}`;
    return api(originalRequest);
  },
);

export default api;
