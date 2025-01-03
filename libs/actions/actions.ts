'use server'

import { signIn } from "@/libs/auth"
import { createUser } from "../userHandler";
import { generateVerificationToken } from "@/libs/utils/verification-token";
import { sendVerificationEmail } from "@/libs/utils/mail";
import { AuthError } from 'next-auth';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function googleSignInAction() {
   await signIn("google", { redirect: true, redirectTo: "/" })
}

interface emailSignUpActionProps {
    email: string
    password: string
    confirm_password: string
    name: string
}

interface emailSignInActionProps {
    email: string
    password: string
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

export async function emailSignInAction(prevState: Record<string, string | number>, formData: emailSignInActionProps): Promise<Record<string, string | number>> {
    const email = formData.email
    const password = formData.password

    if (!email || !password) {
        return {"status": 400, "message": "Please fill out all fields"}
    }

    try {
        await signIn("credentials", { email, password, redirect: false })

        revalidatePath("/")

        return {"status": 200, "message": "Success"}
    }
    catch (error) {
        if (error instanceof AuthError) {

            if (error.cause?.type === 'Verification') {
                return { "status": 400, "message": "User not found"};;
            }

            switch (error.type) {
                case 'CredentialsSignin':
                    return { "status": 400, "message": 'Invalid email or password.'};

                default:
                    return { "status": 400, "message": error.message };
            }
        }

        throw error;
    }
}
