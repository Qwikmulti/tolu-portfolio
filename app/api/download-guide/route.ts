import { NextResponse } from "next/server";
import { downloadGuideSchema } from "@/lib/validations";
import { sendDownloadEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rateLimit";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const result = downloadGuideSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email } = result.data;
    const supabase = await createSupabaseServerClient();

    // Get the first active guide from Supabase
    const { data: guide } = await supabase
      .from("guides")
      .select("id")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const downloadUrl = guide ? `/api/guide/${guide.id}` : null;

    // Send download email
    await sendDownloadEmail({ name, email, downloadUrl });

    return NextResponse.json({ success: true, downloadUrl });
  } catch (error) {
    console.error("Download guide error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
