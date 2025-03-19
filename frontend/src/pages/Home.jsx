import React from "react";
import Example from "../components/Example";
import Banner from "../components/Banner";
import FlyoutMenus from "../components/FlyoutMenus";

const Home = () => {
    return (
        <div>
            Home
            <Banner />
            <FlyoutMenus />
            <Example />
        </div>
    );
};

export default Home;
