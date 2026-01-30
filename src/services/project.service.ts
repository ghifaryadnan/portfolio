import { api } from "@/lib/axios";

export async function listProjects() {
  const res = await api.get("/projects");
  return res.data;
}

export async function createProject(payload: unknown) {
  const res = await api.post("/projects", payload);
  return res.data;
}

export async function updateProject(id: string, payload: unknown) {
  const res = await api.put(`/projects/${id}`, payload);
  return res.data;
}
