import { Resend } from "resend";
import React from "react";
import EmailVerificationEmail from "@/components/auth/verifyEmailSend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string, username: string) => {
    const confirmLink = `${domain}/auth/verify?token=${token}`;

    await resend.emails.send({
        from: process.env.AUTH_EMAIL as string,
        to: email,
        subject: "Confirm your email address",
        react: EmailVerificationEmail({username, url: confirmLink}),
    });
};
