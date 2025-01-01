"use client"
import { signOut } from "next-auth/react"

export function SignOutBtn() {
   return (
      <button
         onClick={() => {
            signOut({ callbackUrl: "/dev/test" })
         }}
         className="py-2 text-red-500 hover:text-red-400 transition duration-300"
      >
         Sign Out
      </button>
   )
}
