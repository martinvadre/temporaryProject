"use client";

import React from "react";
import Navbar from "../navbar/navbar";
import SidebarNew from "../sidebar/newSidebar";
import Sidebar from "../sidebar/sidebar";

interface Props {
    children: React.ReactNode;
 }
export const NavLayout = ({ children }: Props) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const handleToggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <section className="flex">
            <Sidebar collapsed={sidebarOpen as boolean} setCollapsed={handleToggleSidebar}/>
            <Navbar collapsed={sidebarOpen as boolean} setCollapsed={handleToggleSidebar}>
                {children}
            </Navbar>
        </section>
    );
};
