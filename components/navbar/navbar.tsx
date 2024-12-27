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
            <div role="banner">
                <nav className="navbar">
                    <div className="nav-wrap">
                        <div className="menu xl:p-[0.8rem]">
                            <Burger collapsed={collapsed} setCollapsed={setCollapsed}/>
                        </div>
                    </div>
                </nav>
            </div>
            {children}
        </div>
    );
};

export default Navbar;
