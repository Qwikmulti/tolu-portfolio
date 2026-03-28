import { NextResponse } from "next/server";
import { subscribeSchema } from "@/lib/validations";
import { sendEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const result = subscribeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { firstName, email } = result.data;

    await sendEmail({
      to: email,
      subject: "Welcome to Practical BA with Tolu! 🎉",
      html: `
        <h2>Hi ${firstName}, welcome!</h2>
        <p>You're now subscribed to Practical BA updates. Expect weekly tips, resources, and career insights.</p>
        <p>Best,<br>Tolu</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
