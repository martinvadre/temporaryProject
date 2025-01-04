import { z } from "zod";
import { dayOfWeeks, timeToInt } from "../utils/timeUtils";

export const signUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Email is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }).nonempty({ message: "Password is required" }),
    confirm_password: z.string().min(8, { message: "Password must be at least 8 characters" }).nonempty({ message: "Password is required" }),
    name: z.string().min(2, { message: "Name must be at least 2 characters" }).nonempty({ message: "Name is required" }),
});

export const signInSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

// create an event schema >> Use this as a base for creating an Todo form
export const eventFormSchema = z.object({
    title: z.string().nonempty({ message: "Title is required" }),
    description: z.string().nonempty({ message: "Description is required" }),
    isDone: z.boolean(),
    durationInMinutes: z.number().int().positive({ message: "Duration must be a positive number" }).max(60 * 12, { message: `Duration must be less than 12 hours (${60 * 12} mins)` }),
});

// create a schedule schema
export const scheduleFormSchema = z.object({
    timezone: z.string().nonempty({ message: "Timezone is required" }),
    available: z.array(
        z.object({
            dayOfWeeks: z.enum(dayOfWeeks),
            startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format" }),
            endTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format" }),
        })
    ).superRefine((availables, ctx) => {
        availables.forEach((available, index) => {
            const overlap = availables.some((avble, idx) => {
                return idx !== index && avble.dayOfWeeks === available.dayOfWeeks && timeToInt(avble.startTime) < timeToInt(avble.endTime) && timeToInt(available.startTime) < timeToInt(avble.endTime)
            });

            if (overlap) {
                ctx.addIssue({ code: "custom", message: "Time overlap is not allowed", path: [index] });
            }

            if (timeToInt(available.startTime) >= timeToInt(available.endTime)) {
                ctx.addIssue({ code: "custom", message: "Start time must be before end time", path: [index] });
            }
        })
    })
});
