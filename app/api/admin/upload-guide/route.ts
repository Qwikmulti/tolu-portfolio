import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { uploadGuide } from "@/lib/supabase/storage";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!file || !title) {
      return NextResponse.json({ error: "File and title required" }, { status: 400 });
    }

    const storagePath = await uploadGuide(file);

    const { error } = await supabase.from("guides").insert([{
      title,
      description,
      storage_path: storagePath,
      file_name: file.name,
      file_size: file.size,
    }]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Upload guide error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
