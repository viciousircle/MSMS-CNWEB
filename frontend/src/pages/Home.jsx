import React from "react";
import img2 from "../assets/img2.jpeg";
import Decoration from "../components/Decoration";
import { HrBot, HrTop } from "../components/HorizontalLine";

const Home = () => {
    return (
        <main className="flex justify-between w-full overflow-hidden relative  ">
            <Decoration />
            <div className="flex flex-col w-full gap-16 pt-16 px-4 pb-96">
                <TitleSection />

                <div className="flex flex-col gap-4">
                    <div className="text-center relative">
                        <HrTop />
                        <div className="grid grid-cols-1 w-full lg:grid-cols-4 sm:grid-cols-2">
                            {[...Array(8)].map((_, index) => (
                                <div key={index}>
                                    <CardProduct />
                                </div>
                            ))}
                        </div>
                        <HrBot />
                    </div>
                </div>
            </div>
            <Decoration />
        </main>
    );
};

export default Home;

function TitleSection() {
    return (
        <div className="text-center relative">
            <HrTop />
            <h1 className="text-5xl text-pretty gap-x-2 inline-flex max-w-none px-8 py-8 tracking-tight whitespace-nowrap">
                Vicious Store.
                <span className="text-gray-500">
                    Cách tốt nhất để mua sản phẩm bạn thích
                </span>
            </h1>
            <HrBot />
        </div>
    );
}

function CardProduct() {
    return (
        <div className="flex flex-col w-full gap-0">
            <div className="flex w-full gap-0">
                <div className="p-2"></div>
                <div className="border-gray-950/5 border-x p-2 w-full"></div>
                <div className="p-2"></div>
            </div>
            <div className="flex w-full gap-0">
                <div className="border-gray-950/5 border-y p-2"></div>
                <div className="flex flex-col border border-gray-950/5 p-2 w-full gap-4 hover:bg-gray-950/5 min-w-max">
                    <div className="flex bg-white h-64 justify-center rounded-lg w-full items-center outline outline-gray-950/5">
                        <img
                            src={img2}
                            alt="MacBook"
                            className="w-64 object-contain"
                        />
                    </div>
                    <div className="flex flex-col gap-2 items-start pb-2">
                        <div className="font-medium">MacBook Pro</div>
                        <div className="text-gray-400 text-xs font-mono">
                            39.000.000
                        </div>
                    </div>
                </div>
                <div className="border-gray-950/5 border-y p-2"></div>
            </div>
            <div className="flex w-full gap-0">
                <div className="p-2"></div>
                <div className="border-gray-950/5 border-x p-2 w-full"></div>
                <div className="p-2"></div>
            </div>
        </div>
    );
}
