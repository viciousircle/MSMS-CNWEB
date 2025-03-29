import React from "react";
import { CardProduct } from "../components/Card";

const Home = () => {
    return (
        <main className="flex justify-between w-full overflow-hidden relative  ">
            <div className="decoration-col"></div>
            <div className="flex flex-col w-full gap-16 pt-16 px-4 pb-96">
                <TitleSection />

                <div className="flex flex-col gap-4">
                    <div className="text-center relative">
                        <hr className="hr-top" />
                        <div className="grid grid-cols-1 w-full lg:grid-cols-4 sm:grid-cols-2">
                            {[...Array(8)].map((_, index) => (
                                <div key={index}>
                                    <CardProduct />
                                </div>
                            ))}
                        </div>
                        <hr className="hr-bot" />
                    </div>
                </div>
            </div>
            <div className="decoration-col"></div>
        </main>
    );
};

export default Home;

function TitleSection() {
    return (
        <div className="text-center relative">
            <hr className="hr-top" />
            <h1 className="text-5xl text-pretty gap-x-2 inline-flex max-w-none px-8 py-8 tracking-tight whitespace-nowrap">
                Vicious Store.
                <span className="text-gray-500">
                    Cách tốt nhất để mua sản phẩm bạn thích
                </span>
            </h1>
            <hr className="hr-bot" />
        </div>
    );
}
