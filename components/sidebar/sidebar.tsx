"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar, } from "@/components/ui/sidebar"
import { sidebarList, home } from "@/lib/sidebarList"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User2, ChevronDown, GalleryVerticalEnd, ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useSession } from "next-auth/react";
import UserProfile from "./userProfile";
import { Users } from "@/libs/interfaces";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function AppSidebar() {
    const [user, setUser] = useState<Users>({name: "", email: "", image: ""})
    const {toggleSidebar} = useSidebar()
    const {data: session} = useSession()

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
                                                <SidebarMenuButton asChild>
                                                <Link onClick={() => toggleSidebar()} replace prefetch={true} href={path}>
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
                                            <SidebarMenuButton asChild>
                                                <Link onClick={() => toggleSidebar()} replace prefetch={true} href={path}>
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
