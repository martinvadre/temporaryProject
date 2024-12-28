"use client";

import { JSX ,useEffect, useState } from "react";
import { navHandler } from "@/libs/utils/navbarHandler";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import { useSession } from "next-auth/react";

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
        <div className="content">
            <div>
                <div className="intro-box">
                    <Breadcrumb className="breadcrum">
                        <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="welcome-box">
                        <div className="head" id="userInfo">
                            <h2>{greeting}, <span id="username">{session?.user?.name?.split(" ")[0]}</span></h2>
                        </div>
                    </div>
                </div>

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
            </div>

            {/* <footer>
                <div className="fixed-footer">
                    <p className="current">Home <span className="lower early">{">"}</span></p>
                </div>
            </footer> */}
        </div>
    );
}
