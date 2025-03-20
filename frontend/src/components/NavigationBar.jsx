import React from "react";
import FlyoutMenus from "./FlyoutMenus";
import { Routes, Route, Link } from "react-router-dom";

const NavigationBar = () => {
    return (
        <nav>
            <div className="flex justify-center p-3 gap-4 items-center">
                <FlyoutMenus />
                <FlyoutMenus />
                <FlyoutMenus />

                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/notfound">Not Found</Link>
                <Link to="/cart">Cart</Link>
            </div>
        </nav>
    );
};

export default NavigationBar;
