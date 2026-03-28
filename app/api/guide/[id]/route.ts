import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: guide } = await supabase
    .from("guides")
    .select("storage_path, file_name")
    .eq("id", id)
    .single();

  if (!guide) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const storageClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await storageClient.storage
    .from("guides")
    .download(guide.storage_path);

  if (error || !data) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return new NextResponse(data, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${guide.file_name}"`,
    },
  });
}
