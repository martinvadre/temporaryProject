import { z } from "zod";

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
