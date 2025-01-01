'use server'

import { signIn } from "@/libs/auth"
import { createUser } from "../userHandler";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import { generateVerificationToken } from "@/libs/utils/verification-token";
import { sendVerificationEmail } from "@/libs/utils/mail";
import { revalidatePath } from "next/cache";

interface CustomUser extends User {
   role?: string
   password?: string
}

export async function googleSignInAction() {
   await signIn("google", { redirect: true, callbackUrl: "/" })
}

interface emailSignUpActionProps {
    email: string
    password: string
    confirm_password: string
    name: string
}

export async function emailSignUpAction(prevState: Record<string, string | number>, formData: emailSignUpActionProps): Promise<Record<string, string | number>> {
    const email = formData.email as string;
    const password = formData.password as string;
    const passwordConfirm = formData.confirm_password as string;
    const name = formData.name as string;

    if (password !== passwordConfirm) {
        return {"status": 400, "message": "Passwords do not match"}
    }

    if (!email || !password || !name) {
        return {"status": 400, "message": "Please fill out all fields"}
    }

    const passwordValidation = (password: string): boolean => {
        const specialChars = '@$!%*?&.';
        const upper = /\p{Lu}/u
        const lower = /\p{Ll}/u
        const number = /\d/

        if (password == "") return false

        return !(upper.test(password) && lower.test(password) && specialChars.split('').some(char => password.includes(char)) && number.test(password) && password != "")
    }

    if (passwordValidation(password)) return {"status": 400, "message": "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."}

    const res = await createUser(email as string, password as string, name as string);

    if (res.status === "error") {
        return {"status": 400, "message": res.message}
    }

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
        name
    );

    return {"status": 200, "message": res.message}

}

export async function emailSignInAction(formData: FormData) {
    const email = formData.get("email")
    const password = formData.get("password")

    if (!email || !password) {
        throw new Error("Please fill out all fields")
    }

    try {
        await signIn("credentials", { redirect: false, email, password })
    }
    catch (error) {
        console.log(error)
    }
}
