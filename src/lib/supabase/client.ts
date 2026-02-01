export async function getSupabaseClient() {
  const mod = await import("@supabase/supabase-js").catch(() => null);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!mod || !url || !key) return undefined;
  return mod.createClient(url, key);
}
