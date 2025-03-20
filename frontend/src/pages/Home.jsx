import React from "react";
// import Example from "../components/Example";
import img2 from "../assets/img2.jpeg";
const Home = () => {
    return (
        <main className="relative flex justify-between">
            {/* Left Decoration */}
            <div className="px-6 border-x text-gray-950/5 bg-[size:10px_10px] bg-fixed bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]"></div>

            {/* Center Content */}
            <div className="w-full pt-16 flex flex-col gap-16 ">
                {/* Horizontal Line Overflow */}
                <div className="relative ">
                    <hr className="absolute left-[-100%] right-[-100%] top-0 border-gray-950/5" />
                    <h1 className="px-8 py-8 max-w-none text-5xl tracking-tight text-pretty whitespace-nowrap inline-flex gap-x-2">
                        Vicious Store.
                        <span className="text-gray-500">
                            Cách tốt nhất để mua sản phẩm bạn thích
                        </span>
                    </h1>

                    <hr className="absolute left-[-100%] right-[-100%] border-gray-950/5 bottom-0" />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="relative ">
                        <hr className="absolute left-[-100%] right-[-100%] top-0 border-gray-950/5" />

                        <div className=" px-6 py-1 font-mono  font-medium tracking-widest text-pretty uppercase text-gray-700 ">
                            Macbook
                        </div>

                        <hr className="absolute left-[-100%] right-[-100%] border-gray-950/5 bottom-0" />
                    </div>

                    <div className="relative text-center">
                        {/* Top Decorative Line */}
                        <hr className="absolute left-[-100%] right-[-100%] top-0 border-gray-950/5" />

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                            {[...Array(8)].map((_, index) => (
                                <div className="flex flex-col gap-0 w-full">
                                    <div className="flex gap-0 w-full">
                                        <div
                                            className="p-2
                                    "
                                        ></div>
                                        <div className="p-2 border-x border-gray-950/5 w-full"></div>
                                        <div
                                            className="p-2
                                    "
                                        ></div>
                                    </div>
                                    <div className="flex gap-0 w-full">
                                        <div className="p-2 border-y border-gray-950/5 "></div>
                                        <div
                                            key={index}
                                            className="border border-gray-950/5  min-w-max  hover:bg-gray-950/2.5 flex flex-col gap-4 p-2 w-full"
                                        >
                                            <div className="outline outline-gray-950/5 flex bg-white justify-center items-center w-full h-64 rounded-lg">
                                                <img
                                                    src={img2}
                                                    alt="img2"
                                                    className="w-64 object-contain"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 items-start pb-2">
                                                <div className="font-medium">
                                                    MacBook Pro
                                                </div>
                                                <div className="font-mono text-xs text-gray-400">
                                                    39.000.000
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2 border-y border-gray-950/5 "></div>
                                    </div>
                                    <div className="flex gap-0 w-full">
                                        <div
                                            className="p-2
                                    "
                                        ></div>
                                        <div className="p-2 border-x border-gray-950/5 w-full"></div>
                                        <div
                                            className="p-2
                                    "
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Decorative Line */}
                        <hr className="absolute left-[-100%] right-[-100%] bottom-0 border-gray-950/5" />
                    </div>
                </div>

                <div className="relative text-center ">
                    <hr className="absolute left-[-100%] right-[-100%] top-0 border-gray-950/5" />
                    <div className="py-2 font-medium text-lg w-1/2">
                        Hi
                        {/* <img
                            src={img1}
                            alt="img1"
                            className=" h-56 object-contain w-full"
                        /> */}
                    </div>
                    <hr className="absolute left-[-100%] right-[-100%] border-gray-950/5 bottom-0" />
                </div>
            </div>

            {/* Right Decoration */}
            <div className="px-6 border-x text-gray-950/5 bg-[size:10px_10px] bg-fixed bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]"></div>
        </main>
    );
};

export default Home;
