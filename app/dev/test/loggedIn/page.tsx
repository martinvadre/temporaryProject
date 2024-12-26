"use client"
import { useSession } from "next-auth/react"
import { DefaultSession } from "next-auth"
import { SignOutBtn } from "@/dev/components/logoutBtn"

export default function Dashboard() {
   const { data: session } = useSession()

   if (!session) {
      return (
         <div>
            <p>You are not authorized to view this page!</p>
            <button
               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
               onClick={() => window.location.replace("/dev/test")}>
                  Go back
            </button>
         </div>
      )
   }

   return (
      <div>
         <h1>Dashboard</h1>
         <p>Welcome {session.user?.name} to the dashboard!</p>
         <SignOutBtn></SignOutBtn>
      </div>
   )
}
