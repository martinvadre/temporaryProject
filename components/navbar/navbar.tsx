import React from "react";
import Burger from "./burger";

const Navbar: React.FC = () => {
    return (
        <header role="banner">
            <nav className="navbar">
                <div className="nav-wrap">
                    <ul className="menu">
                        <Burger/>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
