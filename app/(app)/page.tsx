"use client";

import { Roboto, Inter, Arimo } from "next/font/google";
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
        <div>
            <div className="max-w-[1200px] text-left align-middle m-auto pt-[8rem]">
                <Breadcrumb className="breadcrum">
                    <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div>
                    <div className="font-inter font-[600] text-[24px] text-[#323232] my-[1rem]" id="userInfo">
                        <h2>{greeting}, <span id="username">{session?.user?.name?.split(" ")[0]}</span></h2>
                    </div>
                </div>
            </div>
            {/* Section */}
            <section className="max-w-[1200px] align-center grid gap-[1.2rem] m-auto pt-[2rem]">
                <div className="card-wrap row-start-1 row-span-1">
                    <h1 className="font-inter font-[450] text-[12px] text-[#777777] text-left py-[.25rem] px-[.5rem]">Sche</h1>
                    <div className="border-[.5px] border-solid border-[#cecece] rounded-[8px] pt-[1rem] pb-[10rem] px-[2rem]"></div>
                </div>
                <div className="card-wrap row-start-1 row-span-1">
                    <h1 className="font-inter font-[450] text-[12px] text-[#777777] text-left py-[.25rem] px-[.5rem]">Todo</h1>
                    <div className="border-[.5px] border-solid border-[#cecece] rounded-[8px] pt-[1rem] pb-[10rem] px-[2rem]"></div>
                </div>
                <div className="card-wrap col-start-1 col-span-2">
                    <h1 className="font-inter font-[450] text-[12px] text-[#777777] text-left py-[.25rem] px-[.5rem]">Note</h1>
                    <div className="border-[.5px] border-solid border-[#cecece] rounded-[8px] pt-[1rem] pb-[10rem] px-[2rem]"></div>
                </div>
            </section>
        </div>
    );
}
