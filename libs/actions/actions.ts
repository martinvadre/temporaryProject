'use server'

import { signIn } from "@/libs/auth"
import { createUser } from "../userHandler";
import { User } from "next-auth";

interface CustomUser extends User {
   role?: string
   password?: string
}

export async function googleSignInAction() {
   await signIn("google", { redirect: true, callbackUrl: "/dev/test/loggedIn" })
}

export async function emailSignUpAction(prevState: Record<string, string | number | CustomUser>, formData: FormData) {
   const email = formData.get("email") as string;
   const password = formData.get("password") as string;
   const passwordConfirm = formData.get("confirm-password") as string;
   const name = formData.get("name") as string;

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

   return {"status": 200, "message": res.message}

}

export async function emailSignInAction(formData: FormData) {
   const email = formData.get("email")
   const password = formData.get("password")

   if (!email || !password) {
      throw new Error("Please fill out all fields")
   }

   try {
      const res = await signIn("credentials", { redirect: true, email, password, callbackUrl: "/dev/test/loggedIn" })

      console.log(res)
   }
   catch (error) {
      console.log(error)
   }
}
