export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
  meta?: PaginationMeta;
};

export type AuthUser = {
  id: string;
  email: string;
  role?: string;
  name?: string;
  avatarUrl?: string;
};

export type AuthContextValue = {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isReady: boolean;
  refreshUser: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
};