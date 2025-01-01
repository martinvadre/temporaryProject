"use server";

import prisma from "@/libs/prismadb";
import { getUser } from "@/libs/userHandler";
import { getVerificationTokenByToken } from "@/libs/utils/verification-token";
import { User } from "@auth/core/types";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: "Token does not exist!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUser(existingToken.email);

    if (!existingUser || existingUser.status === "error") {
        return { error: "Email does not exist!" };
    }

    await prisma.user.update({
        where: { id: (existingUser.user as User).id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        }
    });

    await prisma.verificationToken.delete({
        where: { id: existingToken.id }
    });

    return { success: "Email verified!" };
};
