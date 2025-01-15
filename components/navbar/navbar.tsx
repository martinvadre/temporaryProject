import React from "react";
import Burger from "./burger";
import { SidebarTrigger } from "../ui/sidebar";

const Navbar: React.FC = () => {
    return (
        <nav className="w-[100vw] fixed bg-[#ffffff] border-b-[.5px] border-[#cecece] z-80">
            <div className="flex m-auto pt-[.25rem] px-[.5rem] pb-[.5rem] items-center">
                 <ul className="menu">
                     <SidebarTrigger/>
                 </ul>
             </div>
        </nav>
        // <header role="banner">
        //     <nav className="navbar w-[100vw] fixed bg-[#ffffff] border-b-[.5px] border-[#cecece] z-80 left-[50%] translate-x-[-50%]">
        //         <div className="nav-wrap flex m-auto pt-[.25rem] px-[.5rem] pb-[.5rem] items-center">
        //             <ul className="menu">
        //                 <SidebarTrigger/>
        //             </ul>
        //         </div>
        //     </nav>
        // </header>
    );
};

export default Navbar;
