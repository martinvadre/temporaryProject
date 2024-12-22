'use server'

import { signIn } from "@/libs/auth"
import { FormEvent } from "react"

// ✅ This is correct: an async function is exported.
export async function googleSignInAction() {
   const res = await signIn("google", { redirect: true, callbackUrl: "/dev/test/loggedIn" })

   console.log(res)

   return
}

export async function emailSignInAction(formData: FormData) {
   const email = formData.get("email")
   const password = formData.get("password")

   try {
      const res = await signIn("credentials", { redirect: true, email, password, callbackUrl: "/dev/test/loggedIn" })

      console.log(res)
   }
   catch (error) {
      console.log(error)
   }
}
