import React, { useEffect } from "react";
import Burger from "@/components/navbar/burger";
import { JSX } from "react";


interface SidebarProps {
    collapsed: boolean;
    setCollapsed: () => void;
}

export default function SidebarNew ({collapsed, setCollapsed}: SidebarProps): JSX.Element {

    // const overlay = document.getElementById('overlay');

    // if (collapsed) {
    //     overlay?.classList.add('active');
    // }
    // else {
    //     overlay?.classList.remove('active');
    // }

    // useEffect(() => {
    //     const overlay = document.getElementById('overlay');

    //     console.log(collapsed);

    //     if (collapsed) {
    //         overlay?.classList.add('active');
    //     }
    //     else {
    //         overlay?.classList.remove('active');
    //     }
    // }, [collapsed]);

    return (
        <aside className="h-screen z-[20] sticky top-0">
            {
                collapsed ? <div onClick={setCollapsed} className={`${collapsed ? "translate-x-0 ml-0 pt-20 [display:inherit]" : ""} bg-[rgb(15_23_42/0.3)] fixed inset-0 z-[201] opacity-80 transition-opacity md:hidden md:z-auto md:opacity-100`}></div> : null
            }
            <div className={`bg-background transition-transform h-full fixed -translate-x-full w-64 shrink-0 z-[202] overflow-y-auto border-r border-divider flex-col py-6 px-3 md:ml-0 md:flex md:static md:h-screen md:translate-x-0 ${collapsed ? "translate-x-0 ml-0 pt-20 [display:inherit]" : ""}`} >
                <div className={`flex gap-8 items-center px-6 ${collapsed ? "translate-x-0 ml-0 pt-20 [display:inherit]" : ""}`} id="sidebar-header">
                    {/* <ul className="menu">
                        <Burger collapsed={collapsed} setCollapsed={setCollapsed}/>
                    </ul> */}
                </div>
                <div className="flex flex-col justify-between h-full">
                    <div className={`body flex flex-col gap-6 mt-9 px-2 ${collapsed ? "translate-x-0 ml-0 pt-20 [display:inherit]" : ""}`}>
                        <h2 className="">
                            Account
                        </h2>
                        <ul>
                            <li><a href="">Calendar</a></li>
                            <li><a href="">Todo List</a></li>
                            <li><a href="">Setting</a></li>
                        </ul>
                    </div>
                </div>

                {/* <div className="overlay" id="sidebar">
                    <div className="sidebar-wrap">
                        <div className="head">
                            <ul className="menu">
                                <Burger collapsed={collapsed} setCollapsed={setCollapsed}/>
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
                </div> */}
            </div>
        </aside>
    );
};
