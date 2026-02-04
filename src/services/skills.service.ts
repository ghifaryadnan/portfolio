// src/services/skill.service.ts
import { getSupabaseClient } from "@/lib/supabase/client";

export const getSkills = async () => {
  const supabase = await getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from("skills").select("*").order("created_at");

  if (error) throw error;
  return data ?? [];
};
