"use client";

import { JSX ,useEffect, useState } from "react";
import { navHandler } from "@/libs/utils/navbarHandler";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import { useSession } from "next-auth/react";


export default function Home(): JSX.Element {
    const { data: session } = useSession()
    const [greeting, setGreeting] = useState<string>("");

    useEffect(() => {
       navHandler();
    }, []);

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
        <>
            <Navbar/>
            <Sidebar/>

            {/* Content */}
            <main className="content">
                <section className="intro-box">
                    <div className="welcome-box">
                        <div className="head" id="userInfo">
                            <h2>{greeting}, <span id="username">{session?.user?.name?.split(" ")[0]}</span></h2>
                        </div>
                    </div>
                </section>

                {/* Section */}
                <section className="card-container">
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

            <footer>
                <div className="fixed-footer">
                    <p className="current">Home <span className="lower early">{">"}</span></p>
                </div>
            </footer>
        </>
    );
}
