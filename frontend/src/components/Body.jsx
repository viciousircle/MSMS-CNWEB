import React from "react";

const Body = ({ children }) => {
    return (
        <>
            <main className="flex justify-between w-full overflow-hidden relative  ">
                <div className="decoration-col"></div>
                <div className="flex flex-col w-full gap-16 pt-16 px-4 pb-96">
                    {children}
                </div>
                <div className="decoration-col"></div>
            </main>
        </>
    );
};

export default Body;
