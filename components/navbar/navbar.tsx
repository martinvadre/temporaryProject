import React from "react";
import Burger from "./burger";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

interface NavbarProps {
    children: React.ReactNode;
}

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
