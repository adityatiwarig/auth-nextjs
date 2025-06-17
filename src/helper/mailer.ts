import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Generate random token
    const hashedToken = crypto.randomBytes(32).toString("hex");

    // Update user model with token and expiry
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    }

    // Set up email transporter
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "845094924400e9",
        pass: "2fd491f06b12e7",
      },
    });

    // Determine subject and URL path
    const subject =
      emailType === "VERIFY" ? "Verify your email" : "Reset your password";

    const routePath =
      emailType === "VERIFY" ? "verifyEmail" : "resetPassword";

    const fullUrl = `${process.env.DOMAIN}/${routePath}?token=${hashedToken}`;

    const mailOptions = {
      from: "aditya@gmail.com",
      to: email,
      subject: subject,
      html: `<p>Click <a href="${fullUrl}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
        <br>Or copy and paste this link in your browser:<br> ${fullUrl}</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
