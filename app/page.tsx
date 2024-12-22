"use client";
import React, { useRef, useEffect } from "react";

export default function Home(): React.JSX.Element {

    return (
        <>
            {/* Navbar */}
            <header role="banner">
                <nav className="navbar">
                    <div className="nav-wrap">
                        <ul className="menu">
                            <div className="burger-box" id="overlay">
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
            <div className="overlay-wrap" id="overlay">
                <div className="overlay">
                    <div className="overlay-head">
                        <ul className="menu">
                            <div className="burger-box" id="overlay-burger">
                                <span></span>
                                <span></span>
                                <span className="burger-top"></span>
                                <span></span>
                                <span className="burger-btm"></span>
                                <span></span>
                            </div>
                        </ul>
                    </div>
                    <div className="overlay-body">
                        <h2>Account</h2>
                        <button className="btn-google" id="logoutButton">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="content">
                <section className="intro-box">
                    <div className="welcome-box">
                        <div className="head" id="userInfo">
                            <h2>
                                Good Afternoon, Martin<span id="username"></span>
                            </h2>
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
                    <p className="current">
                        Home <span className="lower early">{">"}</span>
                    </p>
                </div>
            </footer>
        </>
    );
}