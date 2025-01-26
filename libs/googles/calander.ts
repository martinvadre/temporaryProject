"use server";

import { google, calendar_v3, tasks_v1 } from 'googleapis';
import prisma from '@/libs/prismadb';
import { auth } from '../auth';
import { EventAdd, ToDo } from '../interfaces';
import { revalidatePath } from 'next/cache';
import { getOAuthClient } from '../utils/auth';
import { cache } from 'react';

const calendar = google.calendar("v3");
const tasks = google.tasks("v1");

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

    const b = await tasks.tasks.list({
        tasklist: "@default",
        auth: OAuth,
        showCompleted: false,
    });

    if (!res) {
        throw new Error("Events not found");
    }

    if (!b) {
        throw new Error("Todos not found");
    }

    b.data.items?.forEach(async (todo) => {
        res.data.items?.push({
            id: todo.id,
            summary: todo.title,
            start: {
                dateTime: todo.due as string,
            },
            end: {
                dateTime: todo.due as string,
            },
        } as calendar_v3.Schema$Event);
    });

    return res.data.items;
}

export const createToDo = async (todo: ToDo) => {
    const session = await auth();

    if (!session) {
        throw new Error("User not logged in");
    }

    const userId = session.user?.id;

    const OAuth = await getOAuthClient(userId as string);

    const res = await tasks.tasks.insert({
        tasklist: "@default",
        auth: OAuth,
        requestBody: {
            title: todo.title,
            due: todo.dueAt.toISOString(),
            notes: todo.description,
        }
    });

    if (!res) {
        return false;
    }

    await prisma.toDo.create({
        data: {
            title: todo.title,
            dueAt: todo.dueAt,
            userId: userId as string,
            description: todo.description,
            calendarId: res.data.id as string,
        }
    });
    revalidatePath("/todo");
    return true;
}



export const getTodos = async(): Promise<ToDo[] | undefined> => {
    const session = await auth();

    if (!session) {
        throw new Error("User not logged in");
    }

    const OAuth = await getOAuthClient(session.user?.id as string);

    const test = await tasks.tasks.list({
        tasklist: "@default",
        auth: OAuth,
        showCompleted: true,
        showHidden: true,
    });

    if (!test || !test.data.items) {
        throw new Error("Todos not found");
    }

    const d = (await Promise.all(test.data.items.map(async (todo) => {

        if (todo.title != "") {
            const dbTodo = await prisma.toDo.findFirst({
                where: {
                    calendarId: todo.id as string,
                }
            });

            if (dbTodo === null) return {
                id: todo.id,
                title: todo.title,
                description: todo.notes,
                dueAt: new Date(todo.due as string),
                completed: todo.status === "completed",
                calendarId: todo.id,
                doneAt: todo.updated,
            }

            if (todo.status === "completed" && todo != undefined) {
                const r = await prisma.toDo.update({
                    where: {
                        calendarId: todo.id as string,
                    },
                    data: {
                        completed: true,
                        doneAt: new Date(todo.updated as string),
                    }
                });

                return {
                    id: r.id,
                    title: r.title,
                    description: r.description,
                    dueAt: new Date(r.dueAt),
                    completed: r.completed,
                    calendarId: r.calendarId,
                    doneAt: r.doneAt,
                }
            }

            return {
                id: todo.id,
                title: todo.title,
                description: todo.notes,
                dueAt: new Date(todo.due as string),
                completed: todo.status === "completed",
                calendarId: todo.id,
                doneAt: todo.updated,
            }
        }

    }))).filter((todo) => todo !== undefined && todo !== null) as ToDo[];

    return d;
}

export const deleteToDo = async (id: string) => {
    const session = await auth();

    if (!session) {
        throw new Error("User not logged in");
    }

    const userId = session.user?.id;

    const OAuth = await getOAuthClient(userId as string);

    const res = await tasks.tasks.delete({
        tasklist: "@default",
        auth: OAuth,
        task: id,
    });

    const check = await prisma.toDo.findFirst({
        where: {
            calendarId: id,
        }
    });

    if (!res) {
        return false;
    }

    if (check) await prisma.toDo.delete({
        where: {
            calendarId: id,
        }
    });

    revalidatePath("/todo");
    return true;
}

export const updateToDo = async (todo: ToDo) => {}

export const markAsDone = async (todo: ToDo) => {
    const session = await auth();

    if (!session) {
        throw new Error("User not logged in");
    }

    const userId = session.user?.id;

    const OAuth = await getOAuthClient(userId as string);

    const res = await tasks.tasks.patch({
        tasklist: "@default",
        auth: OAuth,
        task: todo.calendarId,
        requestBody: {
            status: "completed",
        }
    });

    if (!res) {
        return false;
    }

    const t = await prisma.toDo.update({
        where: {
            calendarId: res.data.id as string,
        },
        data: {
            doneAt: new Date(),
            completed: true
        }
    });

    if (!t) {
        return false;
    }

    revalidatePath("/todo");
    return true;
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
