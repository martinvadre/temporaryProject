import AdminPanelLayout from "@/components/panel/panel-layout";
import React from "react";
import { NavLayout } from "@/components/layouts/layout";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <NavLayout>{children}</NavLayout>;
}
