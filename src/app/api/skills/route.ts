import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") ?? ""
    const authed = cookie.split(";").map((c) => c.trim()).includes("admin_auth=true")
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const supabase = await getSupabaseServer()
    if (!supabase) {
      return NextResponse.json({ error: "Supabase server belum dikonfigurasi" }, { status: 500 })
    }
    const { data, error } = await supabase.from("skills").select("*").order("created_at")
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json(data ?? [])
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get("cookie") ?? ""
    const authed = cookie.split(";").map((c) => c.trim()).includes("admin_auth=true")
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const supabase = await getSupabaseServer()
    if (!supabase) {
      return NextResponse.json({ error: "Supabase server belum dikonfigurasi" }, { status: 500 })
    }
    const body = await req.json().catch(() => ({}))
    const name = body?.name as string | undefined
    const category = body?.category as string | undefined
    if (!name || !category) {
      return NextResponse.json({ error: "Nama dan kategori wajib diisi" }, { status: 400 })
    }
    const { data, error } = await supabase
      .from("skills")
      .insert({ name, category })
      .select("*")
      .single()
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
  }
}
