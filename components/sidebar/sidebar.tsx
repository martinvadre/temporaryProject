"use client"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar"
import { sidebarList, home } from "@/lib/sidebarList"
import Link from "next/link"

export default function AppSidebar() {
    const {toggleSidebar} = useSidebar()

    return (
        // <section className="flex flex-col h-screen">
            <Sidebar variant="sidebar">
                <div>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarHeader>
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
                            </SidebarHeader>
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
        // </section>
    )
}
