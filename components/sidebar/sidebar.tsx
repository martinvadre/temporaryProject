"use client"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar, } from "@/components/ui/sidebar"
import { sidebarList, home } from "@/lib/sidebarList"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User2, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function AppSidebar() {
    const {toggleSidebar} = useSidebar()

    return (
        <Sidebar variant="sidebar">
            <div>
                <SidebarHeader>
                    <div className="p-[.5rem]">
                        <div className="flex items-center">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="ml-[.7rem]">
                                <p className="text-[16px] font-medium">shadcn</p>
                                <p className="text-[14px] font-light text-[#777777]">m@example.com</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="translate-x-[2rem] p-[.25rem]">
                                    <ChevronDown/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-48">
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                   </div>
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
