import { api } from "@/lib/axios";

export async function getSession() {
  const res = await api.get("/auth/session");
  return res.data;
}

export async function signInOAuth(provider: string) {
  const res = await api.post("/auth/signin", { provider });
  return res.data;
}
