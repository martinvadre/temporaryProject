"use client";

import React, { useEffect } from "react";
import { navHandler } from "./globals";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function Home(): React.JSX.Element {
    useEffect(() => {
        navHandler();
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
                            <h2>Good Afternoon, Martin<span id="username"></span></h2>
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