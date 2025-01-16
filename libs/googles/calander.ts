"use server";

import { google, calendar_v3 } from 'googleapis';
import prisma from '@/libs/prismadb';
import { auth } from '../auth';
import { EventAdd } from '../interfaces';

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

    const userId = session.user?.id;

    const OAuth = await getOAuthClient(userId as string);

    const res = await calendar.events.list({
        calendarId: "primary",
        auth: OAuth,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
        maxResults: 10,
    });

    if (!res) {
        throw new Error("Events not found");
    }

    return res.data.items;
}

export const createEvent = async (event: EventAdd) => {
    const session = await auth();

    if (!session) {
        throw new Error("User not logged in");
    }

    const userId = session.user?.id;

    const OAuth = await getOAuthClient(userId as string);

    const addEvent = event.event;

    const res = await calendar.events.insert({
        calendarId: "primary",
        auth: OAuth,
        sendUpdates: "all",
        requestBody: addEvent as calendar_v3.Schema$Event,
    });


    if (!res) {
        throw new Error("Event not created");
    }

    await prisma.event.create({
        data: {
            title: res.data.summary as string,
            start: res.data.start?.dateTime as string,
            end: res.data.end?.dateTime as string,
            allDay: res.data.start?.date ? true : false,
            userId: userId as string,
            calendarId: res.data.id as string,
        }
    });

    return res.data;
}
