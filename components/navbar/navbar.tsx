import React from "react";
import Burger from "./burger";
import { SidebarTrigger } from "../ui/sidebar";

const Navbar: React.FC = () => {
    return (
        <header role="banner">
            <nav className="navbar">
                <div className="nav-wrap">
                    <ul className="menu">
                        <SidebarTrigger/>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
