import React from "react";
// import Example from "../components/Example";

const Home = () => {
    return (
        <main className="relative flex justify-between">
            {/* Left Decoration */}
            <div className="px-6 border-x text-gray-950/5 bg-[size:10px_10px] bg-fixed bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]"></div>

            {/* Center Content */}
            <div className="w-full pt-16 flex flex-col gap-8">
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

                <div className="relative text-center py-8">
                    {/* Top Decorative Line */}
                    <hr className="absolute left-[-100%] right-[-100%] top-0 border-gray-950/5" />

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6">
                        {[...Array(5)].map((_, index) => (
                            <div className="flex flex-col gap-0 w-full">
                                <div className="flex gap-0 w-full">
                                    <div
                                        key={index}
                                        className="border border-gray-950/5 px-20 py-16 bg-white text-lg font-semibold min-w-max w-full"
                                    >
                                        Card {index + 1}
                                    </div>
                                    <div className="p-5 border-y border-gray-950/5 "></div>
                                </div>

                                <div className="p-5 border-x border-gray-950/5"></div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Decorative Line */}
                    <hr className="absolute left-[-100%] right-[-100%] bottom-0 border-gray-950/5" />
                </div>

                <div className="relative text-center">
                    <hr className="absolute left-[-100%] right-[-100%] top-0 border-gray-950/5" />
                    <div className="py-2 font-medium text-lg">Hi</div>
                    <hr className="absolute left-[-100%] right-[-100%] border-gray-950/5 bottom-0" />
                </div>
            </div>

            {/* Right Decoration */}
            <div className="px-6 border-x text-gray-950/5 bg-[size:10px_10px] bg-fixed bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]"></div>
        </main>
    );
};

export default Home;

// col-start-4 row-span-full row-start-1 max-sm:hidden text-gray-950/5 border-x border-x-current bg-[size:10px_10px] bg-fixed bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)]
