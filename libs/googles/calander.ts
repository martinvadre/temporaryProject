"use server";

import { google } from 'googleapis';
import prisma from '@/libs/prismadb';
import { auth } from '../auth';

const calendar = google.calendar("v3");

async function getOAuthClient(userId: string) {

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

    console.log(userAccount.access_token);

    OAuth.setCredentials({
        access_token: userAccount.access_token,
        refresh_token: userAccount.refresh_token,
    });

    return OAuth;


}

export const getCalander = async () => {
    const session = await auth();

    if (!session) {
        throw new Error("User not logged in");
    }

    console.log(session.user);

    const userId = session.user?.id;

    const OAuth = await getOAuthClient(userId as string);

    const res = await calendar.events.list({
        calendarId: "primary",
        auth: OAuth,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
    });

    console.log(res.data.items);

    return res.data.items;
}

export const createEvent = async (event?: any | undefined) => {
    const session = await auth();

    if (!session) {
        throw new Error("User not logged in");
    }

    const userId = session.user?.id;

    const OAuth = await getOAuthClient(userId as string);

    const evt = {
        attendees: [
            {
                email: "sukruangkul.aongsa@gmail.com",
                displayName: "Guess User",
            },
            {
                email: "oangsaytv@gmail.com",
                displayName: "Test User",
                responseStatus: "accepted"
            }
        ],
        description: "This is a test event",
        start: {
            dateTime: new Date().toISOString(),
        },
        end: {
            dateTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        },
        summary: "Test Event",
    }

    const res = await calendar.events.insert({
        calendarId: "primary",
        auth: OAuth,
        sendUpdates: "all",
        requestBody: evt
    })

    console.log(res.data);

    return res.data;
}
