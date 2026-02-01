export async function getSupabaseServer() {
  const mod = await import("@supabase/supabase-js").catch(() => null);
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!mod || !url || !key) return undefined;
  return mod.createClient(url, key);
}
