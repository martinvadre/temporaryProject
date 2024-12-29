import React from "react";
import Burger from "@/components/navbar/burger";
import Link from "next/link";
import { sidebarList } from "@/lib/sidebarList";

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({collapsed, setCollapsed}: SidebarProps) => {

    const toggleSidebar = () => {
        setCollapsed();
    };

    return (
        <div onClick={toggleSidebar} className={`overlay-wrap ${collapsed ? "flex" : "hidden"}`} id="overlay">
            <div className="overlay" id="sidebar">
                <div className="sidebar-wrap">
                    <div className="head">
                        <ul onClick={toggleSidebar} className="menu">
                           <Burger collapsed={collapsed} setCollapsed={toggleSidebar}/>
                        </ul>
                    </div>
                    <div className="body">
                        <h2 className="account">Account</h2>
                        <ul>
                            {
                                sidebarList.map((item, index) => (
                                    <li key={index}>
                                        <Link prefetch={true} href={item.path}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
