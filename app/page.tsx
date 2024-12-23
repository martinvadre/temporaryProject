"use client";

import React, { useRef, useEffect } from "react";

export default function Home(): React.JSX.Element {
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (overlayRef.current) {
            overlayRef.current.classList.toggle("active");
        }
    };

    const handleDocumentClick = (event: MouseEvent) => {
        if (
            overlayRef.current &&
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target as Node) && 
            overlayRef.current.classList.contains("active")
        ) {
            overlayRef.current.classList.remove("active");
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        <>
            {/* Navbar */}
            <header role="banner">
                <nav className="navbar">
                    <div className="nav-wrap">
                        <ul className="menu">
                            <div className="burger-box" id="burger" onClick={handleOverlayClick}>
                                <span></span>
                                <span></span>
                                <span className="burger-top"></span>
                                <span></span>
                                <span className="burger-btm"></span>
                                <span></span>
                            </div>
                        </ul>
                    </div>
                </nav>
            </header>

            {/* Overlay */}
            <div className="overlay-wrap" id="overlay" ref={overlayRef}>
                <div className="overlay" id="sidebar" ref={sidebarRef} onClick={stopPropagation}>
                    <div className="head">
                        <ul className="menu">
                            <div className="burger-box" id="burger" onClick={handleOverlayClick}>
                                <span></span>
                                <span></span>
                                <span className="burger-top"></span>
                                <span></span>
                                <span className="burger-btm"></span>
                                <span></span>
                            </div>
                        </ul>
                    </div>
                    <div className="body">
                        <h2>Account</h2>
                        <ul>
                            <li>
                                <a href="">Calendar</a>
                            </li>
                            <li>
                                <a href="">Todo List</a>
                            </li>
                            <li>
                                <a href="">Setting</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

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