import React from "react";
import Burger from "@/components/navbar/burger";

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({collapsed, setCollapsed}: SidebarProps) => {

    // const overlay = document.getElementById('overlay');

    // if (collapsed) {
    //     overlay?.classList.add('active');
    // }
    // else {
    //     overlay?.classList.remove('active');
    // }

    // console.log(collapsed);

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
                            <li><a href="">Calendar</a></li>
                            <li><a href="">Todo List</a></li>
                            <li><a href="">Setting</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
