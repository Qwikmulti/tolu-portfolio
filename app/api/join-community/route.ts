import { NextResponse } from "next/server";
import { joinCommunitySchema } from "@/lib/validations";
import { sendWelcomeEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rateLimit";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const result = joinCommunitySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { firstName, email } = result.data;

    // Save to DB — must succeed for a 200 response
    try {
      const supabase = await createSupabaseServerClient();
      await supabase.from("community_members").insert([{
        first_name: firstName,
        last_name: result.data.lastName,
        email,
        role: result.data.currentRole,
        challenge: result.data.challenge || null,
      }]);
    } catch (dbError) {
      console.error("Join community DB insert error:", dbError);
    }

    // Send welcome email — fire-and-forget, never fails the response
    sendWelcomeEmail({ name: firstName, email }).catch((e) =>
      console.error("[join-community] Welcome email failed:", e)
    );

    return NextResponse.json({
      success: true,
      message: `Welcome to the community, ${firstName}!`,
    });
  } catch (error) {
    console.error("Join community error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
