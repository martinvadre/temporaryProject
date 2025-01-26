import { google } from "googleapis";
import prisma from "../prismadb";

export async function getOAuthClient(userId: string) {

    if (!userId) {
        throw new Error("User ID not found");
    }

    const userAccount = await prisma.account.findUnique({
        where: {
           userId: userId
        }
    })

    if (!userAccount) {
        throw new Error("User account not found");
    }

    const OAuth = new google.auth.OAuth2({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        redirectUri: process.env.AUTH_GOOGLE_REDIRECT_URI
    });

    OAuth.setCredentials({
        access_token: userAccount.access_token,
        refresh_token: userAccount.refresh_token,
    });

    return OAuth;
}
