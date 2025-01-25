"use client"
import * as React from "react"
import { Check, ChevronsUpDown, GalleryVerticalEnd, User2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu,SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Users } from "@/libs/interfaces"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { signOut } from "next-auth/react"
import { Skeleton } from "../ui/skeleton"
import CLink from "../customUI/link"

export default function UserProfile({user}: {user: Users | undefined}) {

    if (!user) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" className="rounded-[8px] py-[.6rem] px-[.7rem] h-auto data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback><Skeleton className="h-12 w-12 rounded-[8px]" /></AvatarFallback>
                        </Avatar>
                        <div className="ml-[.4rem]">
                            <Skeleton className="h-4 w-[100px]" />
                            {/* <Skeleton className="h-4 mt-2 w-[160px]" /> */}
                        </div>
                        </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        )
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" className="rounded-[8px] py-[.6rem] px-[.7rem] h-auto data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <Avatar>
                                <AvatarImage src={user.image as string} />
                                <AvatarFallback><Skeleton className="h-12 w-12 rounded-[8px]" /></AvatarFallback>
                            </Avatar>
                            <div className="ml-[.4rem]">
                                <p className="text-[16px] font-medium">{user.name?.split(" ")[0]}</p>
                                {/* <p className={`${(user.email as string).length as number > 20 ? "text-[11px]" : "text-[14px]"} font-light text-[#777777]`}>{user.email}</p> */}
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
                        <DropdownMenuItem asChild><CLink href="/">Profile</CLink></DropdownMenuItem>
                        <DropdownMenuItem asChild><CLink href="/setting">Settings</CLink></DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => signOut()}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
