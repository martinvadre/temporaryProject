import React from "react";
import Burger from "./burger";

const Sidebar: React.FC = () => {
    return (
        <div className="overlay-wrap" id="overlay">
            <div className="overlay" id="sidebar">
                <div className="sidebar-wrap">
                    <div className="head">
                        <ul className="menu">
                           <Burger/>
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