"use client"
import { signOut } from "next-auth/react"

export function SignOutBtn() {
   return (
      <button
         onClick={() => {
            signOut({ callbackUrl: "/dev/test" })
         }}
         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
      >
         Sign Out
      </button>
   )
}
