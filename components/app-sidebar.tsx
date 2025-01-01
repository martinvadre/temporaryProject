import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar"
import Navbar from "./navbar/navbar"
import { home, sidebarList } from "@/lib/sidebarList"
import Link from "next/link"

export default function AppSidebar() {
    return (
        <section className="flex flex-col h-screen">
            <Navbar/>
            <Sidebar variant="sidebar">
                <div className="lg:mt-[4rem] md:mt-[4rem]">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarHeader>
                                {
                                    home.map(({name, path, icon: Icon}, index: number) => (
                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuButton asChild>
                                                <Link replace prefetch={true} href={path}>
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
                                                    <Link replace prefetch={true} href={path}>
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
        </section>
    )
}
