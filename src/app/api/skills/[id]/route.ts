import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
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
    const { id } = await params
    const body = await req.json().catch(() => ({}))
    const name = body?.name as string | undefined
    const category = body?.category as string | undefined
    if (!id) {
      return NextResponse.json({ error: "ID wajib ada" }, { status: 400 })
    }
    const payload: Record<string, unknown> = {}
    if (typeof name === "string") payload.name = name
    if (typeof category === "string") payload.category = category
    const { data, error } = await supabase
      .from("skills")
      .update(payload)
      .eq("id", id)
      .select("*")
      .single()
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
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
    const { id } = await params
    if (!id) {
      return NextResponse.json({ error: "ID wajib ada" }, { status: 400 })
    }
    const { error } = await supabase.from("skills").delete().eq("id", id)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 })
  }
}
