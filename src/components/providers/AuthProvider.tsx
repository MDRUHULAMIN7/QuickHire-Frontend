"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getMe } from "@/lib/api/user";

export type AuthUser = {
  id: string;
  email: string;
  role?: string;
  name?: string;
  avatarUrl?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isReady: boolean;
  refreshUser: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const USER_STORAGE_KEY = "qh_user";
const TOKEN_STORAGE_KEY = "qh_access_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hasToken, setHasToken] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const persistUser = (nextUser: AuthUser | null) => {
    setUser(nextUser);
    if (typeof window === "undefined") return;
    if (nextUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  };

  const refreshUser = async () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    setHasToken(Boolean(token));
    if (!token) {
      persistUser(null);
      return;
    }
    try {
      const res = await getMe();
      const apiUser = res.data;
      persistUser({
        id: apiUser.id,
        email: apiUser.email,
        role: apiUser.role,
        name: apiUser.name,
        avatarUrl: apiUser.avatarUrl,
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setHasToken(false);
        persistUser(null);
      }
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
    setHasToken(false);
    persistUser(null);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const init = async () => {
      setHasToken(Boolean(localStorage.getItem(TOKEN_STORAGE_KEY)));
      const cached = localStorage.getItem(USER_STORAGE_KEY);
      if (cached) {
        try {
          setUser(JSON.parse(cached));
        } catch {
          localStorage.removeItem(USER_STORAGE_KEY);
        }
      }
      await refreshUser();
      setIsReady(true);
    };
    init();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoggedIn: Boolean(user) || hasToken,
      isReady,
      refreshUser,
      setUser: persistUser,
      logout,
    }),
    [user, hasToken, isReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
