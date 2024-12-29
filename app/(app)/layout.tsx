// Old sidebar in case we want to revert back to it

// import React from "react";
// import { NavLayout } from "@/components/layouts/layout";

// export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
//   return <NavLayout>{children}</NavLayout>;
// }

import React from "react";
import Layout from "@/components/layouts/sidebarLayout";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <Layout>{children}</Layout>;
}
