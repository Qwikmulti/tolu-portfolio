import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { sendContactEmail, sendEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rateLimit";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fullName, email, subject, message } = result.data;

    // Save to DB — must succeed for a 200 response
    try {
      const supabase = await createSupabaseServerClient();
      await supabase.from("messages").insert([{
        name: fullName,
        email,
        message,
      }]);
    } catch (dbError) {
      console.error("Contact DB insert error:", dbError);
      // Continue — email confirmation is still worth sending
    }

    // Send emails — fire-and-forget, never fails the response
    sendContactEmail({ fullName, email, subject, message }).catch((e) =>
      console.error("[contact] Email send failed:", e)
    );
    sendEmail({
      to: email,
      subject: "Message Received — Practical BA with Tolu",
      html: `
        <h2>Hi ${fullName},</h2>
        <p>Thank you for reaching out! I've received your message and will get back to you within 48 hours.</p>
        <p>Best,<br>Tolu</p>
      `,
    }).catch((e) => console.error("[contact] Confirmation email failed:", e));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
