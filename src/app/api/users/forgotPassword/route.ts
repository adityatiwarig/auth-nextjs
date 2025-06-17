import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helper/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // Check if user exists with this email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "No such user exists" },
        { status: 404 }
      );
    }

    // Send password reset email
    await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({
      message: "Forgot password email sent successfully.",
      success: true,
    });
  } catch (error: any) {
    console.error("Forgot Password Error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
