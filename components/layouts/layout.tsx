"use client";

import React from "react";
import { useLockedBody } from "../hooks/useBodyLock";
import Navbar from "../navbar/navbar";
// import { SidebarWrapper } from "../sidebar/sidebar";
import SidebarNew from "../sidebar/newSidebar";

interface Props {
   children: React.ReactNode;
 }
export const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
//   const [_, setLocked] = useLockedBody(false);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    // setLocked(!sidebarOpen);
  };

  return (
    <section className="flex">
      <Navbar
        collapsed={sidebarOpen as unknown as boolean}
        setCollapsed={handleToggleSidebar}
      >
        {children}
      </Navbar>
    </section>
  );
};
