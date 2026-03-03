import api from "./client";

export async function getMe() {
  const res = await api.get("/users/me");
  
  return res.data as {
    success: boolean;
    message: string;
    data: {
      id: string;
      email: string;
      role?: string;
      name?: string;
      avatarUrl?: string;
    };
  };
}

export async function updateMe(payload: {
  name?: string;
  avatarUrl?: string;
}) {
  const res = await api.patch("/users/me", payload);
  return res.data as {
    success: boolean;
    message: string;
    data: {
      id: string;
      email: string;
      role?: string;
      name?: string;
      avatarUrl?: string;
    };
  };
}
