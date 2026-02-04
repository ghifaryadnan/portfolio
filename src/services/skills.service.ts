// src/services/skill.service.ts
import { getSupabaseClient } from "@/lib/supabase/client";
import { api } from "@/lib/axios";

export interface Skill {
  id: string;
  name: string;
  category: string;
  created_at?: string;
}

export const getSkills = async (): Promise<Skill[]> => {
  const supabase = await getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from("skills").select("*").order("created_at");

  if (error) throw error;
  return (data ?? []) as Skill[];
};

export async function adminListSkills(): Promise<Skill[]> {
  const res = await api.get("/skills");
  const data = res.data as Skill[];
  return [...data].sort((a, b) => {
    const ac = a?.category ?? "";
    const bc = b?.category ?? "";
    return ac.localeCompare(bc);
  });
}

export async function adminCreateSkill(payload: { name: string; category: string }): Promise<Skill> {
  const res = await api.post("/skills", payload);
  return res.data as Skill;
}

export async function adminUpdateSkill(
  id: string,
  payload: { name?: string; category?: string }
): Promise<Skill> {
  const res = await api.put(`/skills/${id}`, payload);
  return res.data as Skill;
}

export async function adminDeleteSkill(id: string): Promise<{ success: boolean }> {
  const res = await api.delete(`/skills/${id}`);
  return res.data as { success: boolean };
}
