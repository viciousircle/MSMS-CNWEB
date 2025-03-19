import React from "react";
import FlyoutMenus from "./FlyoutMenus";
import { Routes, Route, Link } from "react-router-dom";

const NavigationBar = () => {
    return (
        <nav>
            <div className="p-3  flex items-center justify-center gap-4 ">
                <FlyoutMenus />
                <FlyoutMenus />
                <FlyoutMenus />

                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/notfound">Not Found</Link>
            </div>
        </nav>
    );
};

export default NavigationBar;
