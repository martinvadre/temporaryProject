"use server";

import { google } from "googleapis";
import { NextResponse } from "next/server";
import { getOAuthClient } from "@/libs/utils/auth";
import { ToDo } from "@/libs/interfaces";
import prisma from "@/libs/prismadb";
import { revalidatePath } from "next/cache";

const calendar = google.calendar("v3");
const tasks = google.tasks("v1");

export async function POST(req: Request, res: Response): Promise<Response> {
    const session = await req.json();

    if (!session) {
        return NextResponse.json({ message: "User not logged in" }, { status: 401 });
    }

    const OAuth = await getOAuthClient(session.user?.id as string);

    const test = await tasks.tasks.list({
        tasklist: "@default",
        auth: OAuth,
        showCompleted: true,
        showHidden: true,
    });

    if (!test || !test.data.items) {
        return NextResponse.json({ message: "Todos not found" }, { status: 403 });
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

    revalidatePath("/todo");

    return NextResponse.json({ data: d }, { status: 200 });
}

export async function GET(req: Request) {
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
