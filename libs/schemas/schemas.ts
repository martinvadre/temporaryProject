import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirm_password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
});
