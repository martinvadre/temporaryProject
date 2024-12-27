import React from "react";

interface BurgerButtonProps {
   collapsed: boolean;
   setCollapsed: () => void;
 }

const Burger: React.FC<BurgerButtonProps> = ({ collapsed, setCollapsed }) => {
    return (
        <div className="md:hidden burger-box" onClick={setCollapsed}>
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
