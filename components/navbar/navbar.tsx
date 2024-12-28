import React from "react";
import Burger from "./burger";

interface NavbarProps {
    collapsed: boolean;
    setCollapsed: () => void;
    children: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ collapsed, setCollapsed, children }: NavbarProps) => {

    return (
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <header role="banner">
                <nav className="navbar">
                    <div className="nav-wrap">
                        <ul className="menu">
                            <Burger collapsed={collapsed} setCollapsed={setCollapsed}/>
                        </ul>
                    </div>
                </nav>
            </header>
            {children}
        </div>
    );
};

export default Navbar;
