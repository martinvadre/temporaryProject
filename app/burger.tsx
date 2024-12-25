import React from "react";

const Burger: React.FC = () => {
    return (
        <div className="burger-box">
            <div className="burger" id="burger">
                <span></span>
                <span></span>
                <span className="burger-top"></span>
                <span></span>
                <span className="burger-btm"></span>
                <span></span>
            </div>
        </div>
    );
};

export default Burger;