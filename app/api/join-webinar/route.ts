import { NextResponse } from "next/server";
import { joinWebinarSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rateLimit";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const result = joinWebinarSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email } = result.data;

    // Split name into first and last name
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || name;
    const lastName = nameParts.slice(1).join(" ") || "";

    const supabase = await createSupabaseServerClient();

    // Check if already registered
    const { data: existing } = await supabase
      .from("community_members")
      .select("id, email")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You're already registered for this webinar!",
      });
    }

    // Save to community_members with webinar-specific role — visible in /admin/community
    const { error: dbError } = await supabase.from("community_members").insert([{
      first_name: firstName,
      last_name: lastName,
      email,
      role: "Webinar Attendee",
      is_approved: false,
    }]);

    if (dbError) {
      console.error("Join webinar DB insert error:", dbError);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "You're registered! We'll send you the webinar link soon.",
    });
  } catch (error) {
    console.error("Join webinar error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
