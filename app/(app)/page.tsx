"use client";

import { JSX ,useEffect, useState } from "react";
import { navHandler } from "@/libs/utils/navbarHandler";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import { useSession } from "next-auth/react";
import { ContentLayout } from "@/components/panel/content-layout";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function Home(): JSX.Element {
    const { data: session } = useSession()
    const [greeting, setGreeting] = useState<string>("");
    // const [sidebarOpen, setSidebarOpen] = useState(false);

    // const handleToggleSidebar = () => {
    //     setSidebarOpen((prev) => !prev);
    // };


    //  useEffect(() => {
   //     navHandler();
   //  }, []);

    useEffect(() => {
       const date = new Date();
       const hour = date.getHours();

       if (hour < 12) {
          setGreeting("Good Morning");
       }
       else if (hour < 18) {
          setGreeting("Good Afternoon");
       }
       else {
          setGreeting("Good Evening");
       }
    }, []);

    return (
        <ContentLayout title="Home">
            <Breadcrumb className="mb-4 pl-[1.2rem]">
                <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        <main className="content">
            <section className="intro-box">
                <div className="welcome-box">
                    <div className="head" id="userInfo">
                        <h2>{greeting}, <span id="username">{session?.user?.name?.split(" ")[0]}</span></h2>
                    </div>
                </div>
            </section>

            {/* Section */}
            <section className="h-full card-container">
                <div className="card-wrap sche-card">
                    <h1 className="head">Sche</h1>
                    <div className="body"></div>
                </div>
                <div className="card-wrap todo-card">
                    <h1 className="head">Todo</h1>
                    <div className="body"></div>
                </div>
                <div className="card-wrap note-card">
                    <h1 className="head">Note</h1>
                    <div className="body"></div>
                </div>
            </section>
        </main>

        {/* <footer>
            <div className="fixed-footer">
                <p className="current">Home <span className="lower early">{">"}</span></p>
            </div>
        </footer> */}
        </ContentLayout>
    );
}
