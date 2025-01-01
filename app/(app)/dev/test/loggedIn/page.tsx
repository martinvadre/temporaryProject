"use client"

import { useSession } from "next-auth/react"
import { DefaultSession, User } from "next-auth"
import { SignOutBtn } from "@/dev/components/logoutBtn"
import { useState, useEffect } from "react"

export default function Dashboard() {
    const { data: session } = useSession()
    const [username, setUsername] = useState<string>("")

    useEffect(() => {
        if (session) {
            setUsername(((session.user as User).name as string).split(" ")[0])
        }
    }, [session])


    return (
        <div className="mt-20 mx-[3.7rem]">
            <h1>Dashboard</h1>
            <p>Welcome {username} to the dashboard!</p>
            <SignOutBtn></SignOutBtn>
        </div>
    )
}
