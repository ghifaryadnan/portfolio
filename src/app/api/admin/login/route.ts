 import { NextResponse } from "next/server";
 import { getSupabaseServer } from "@/lib/supabase/server";
 
 export async function POST(req: Request) {
   try {
     const body = await req.json().catch(() => ({}));
    const token = body?.access_token as string | undefined;
    const supabase = await getSupabaseServer();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase server belum dikonfigurasi" }, { status: 500 });
    }
    if (!token) {
      return NextResponse.json({ error: "Token akses tidak ada" }, { status: 400 });
    }
    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData?.user) {
      return NextResponse.json({ error: "User tidak valid" }, { status: 401 });
    }
    const userId = userData.user.id;
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
    if (profileErr) {
      return NextResponse.json({ error: "Profil tidak ditemukan" }, { status: 404 });
    }
    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Bukan admin" }, { status: 403 });
    }
     const res = NextResponse.json({ success: true });
     res.cookies.set("admin_auth", "true", {
       httpOnly: true,
       path: "/",
       maxAge: 60 * 60 * 12,
       sameSite: "lax",
     });
     return res;
   } catch {
     return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
   }
 }
