import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deleteGuide } from "@/lib/supabase/storage";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, storagePath } = await request.json();
    await deleteGuide(storagePath);
    await supabase.from("guides").delete().eq("id", id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete guide error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
