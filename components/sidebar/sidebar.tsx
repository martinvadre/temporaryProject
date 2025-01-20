"use client"

import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar, } from "@/components/ui/sidebar"
import { sidebarList, home } from "@/lib/sidebarList"
import Link from "next/link"
import { useSession } from "next-auth/react";
import UserProfile from "./userProfile";
import { Users } from "@/libs/interfaces";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
    const [user, setUser] = useState<Users | undefined>(undefined)
    const {toggleSidebar, isMobile} = useSidebar()
    const {data: session} = useSession()
    const pathname = usePathname()

    useEffect(() => {
        if (session) {
            setTimeout(() => {
                setUser(session.user as Users)
            }, 1000);
        }
    }, [session])

    return (
        <Sidebar variant="sidebar">
            <div>
                <SidebarHeader>
                    <UserProfile user={user}/>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {
                                    home.map(({name, path, icon: Icon}, index: number) => (
                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuButton isActive={pathname == path} asChild>
                                                <Link onClick={() => isMobile && toggleSidebar()} replace prefetch={true} href={path}>
                                                    <span>
                                                        <Icon size={18} />
                                                    </span>
                                                    {name}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))
                                }
                            </SidebarMenu>
                        </SidebarGroupContent>
                            <SidebarGroupLabel>Account</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {
                                    sidebarList.map(({name, path, icon: Icon}, index: number) => (
                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuButton isActive={pathname == path} asChild>
                                                <Link onClick={() => isMobile && toggleSidebar()} replace prefetch={true} href={path}>
                                                    <span>
                                                        <Icon size={18} />
                                                    </span>
                                                    {name}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))
                                }
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </div>
        </Sidebar>
    )
}
