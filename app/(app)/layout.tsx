import React from "react";
import Layout from "@/components/layouts/sidebarLayout";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <Layout><div className="items-center justify-center px-[1.2rem]">{children}</div></Layout>;
}
