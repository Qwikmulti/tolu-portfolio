import { NextResponse } from "next/server";
import { downloadGuideSchema } from "@/lib/validations";
import { sendDownloadEmail } from "@/lib/email";

export async function POST(request: Request) {
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

    // In production: add to Mailchimp/mailing list here
    await sendDownloadEmail({ name, email });

    return NextResponse.json({
      success: true,
      downloadUrl: "/guide.pdf",
    });
  } catch (error) {
    console.error("Download guide error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
