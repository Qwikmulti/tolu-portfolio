import { NextResponse } from "next/server";
import { joinCommunitySchema } from "@/lib/validations";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: Request) {
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

    await sendWelcomeEmail({ name: firstName, email });

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
