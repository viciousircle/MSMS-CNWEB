import React from "react";
import img2 from "../assets/img2.jpeg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { PencilIcon } from "@heroicons/react/24/outline";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { BorderRow } from "./Decoration";

const InformationCard = () => {
    return (
        <div className="flex flex-col gap-0">
            <div className="relative">
                <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4">
                    <div className="flex border-gray-950/5 border-x  bg-gray-950/2.5 items-center px-4 py-2 justify-between w-full">
                        <div className="">Infomation</div>
                    </div>

                    <Dialog>
                        <DialogTrigger className="focus:outline-none">
                            <div className="flex border-gray-950/5 border-x gap-2 hover:bg-gray-950/2.5 items-center px-4 py-2 focus:outline-none cursor-pointer">
                                <PencilIcon className="size-6" />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[720px] px-8">
                            <DialogHeader>
                                <DialogTitle>Edit information</DialogTitle>
                                <div className="flex flex-col gap-2 mt-4">
                                    <div className="flex gap-2 items-center">
                                        <div className=" min-w-[120px]">
                                            Receiver
                                        </div>
                                        <Input />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className=" min-w-[120px]">
                                            Phone
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <InputOTP maxLength={10}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                    <InputOTPSlot index={6} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={7} />
                                                    <InputOTPSlot index={8} />
                                                    <InputOTPSlot index={9} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className=" min-w-[120px]">
                                            Address
                                        </div>
                                        <Input placeholder="Number" />
                                        <Input placeholder="Street" />
                                        <Input placeholder="District" />
                                        <Input placeholder="City" />
                                    </div>
                                </div>
                                <DialogDescription>
                                    Make changes to your profile here. Click
                                    save when you're done.
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="relative">
                <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest  flex gap-4">
                    <div className="flex border-gray-950/5 border-x   w-full flex-col text-gray-500 font-serif">
                        <div className="flex items-center border-b border-gray-950/5 ">
                            <div className="border-r border-gray-950/5 py-1 px-8 ">
                                Vu Minh Quy
                            </div>
                            <div className="border-r border-gray-950/5 py-1 px-8 ">
                                0327589638
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="border-r border-gray-950/5 py-1 px-8 ">
                                903
                            </div>
                            <div className="border-r border-gray-950/5 py-1 px-8 ">
                                Street Minh Khai
                            </div>
                            <div className="border-r border-gray-950/5 py-1 px-8 ">
                                District Hai Ba Trung
                            </div>
                            <div className="border-r border-gray-950/5 py-1 px-8 ">
                                City Ha Noi
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
            </div>
        </div>
    );
};

function CartInformation({ date, items }) {
    return (
        <div className="relative">
            <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
            <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4">
                <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2 w-fit">
                    <div className="">{date}</div>
                </div>
                <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2">
                    <div className="">{items} ITEMS</div>
                </div>
            </div>

            <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
        </div>
    );
}

function Horizon() {
    return (
        <div className="flex w-full gap-0">
            <div className="p-2"></div>
            <div className="border-gray-950/5 border-x p-2 w-full"></div>
            <div className="p-2"></div>
        </div>
    );
}

function Vertical() {
    return <div className="border-gray-950/5 border-y p-2"></div>;
}

function CardCartItem() {
    return (
        <div className="flex flex-col w-full gap-0">
            <Horizon />
            <div className="flex w-full gap-0">
                <Vertical />
                <div className="flex border border-gray-950/5 p-2 w-full gap-4 hover:bg-gray-950/2.5 min-w-max">
                    <div className="flex items-center pl-2">
                        <div className="border border-gray-300 p-2"></div>
                    </div>
                    <div className="flex bg-white h-64 justify-center rounded-lg w-1/5 items-center outline outline-gray-950/5">
                        <img
                            src={img2}
                            alt="MacBook"
                            className="w-64 object-contain"
                        />
                    </div>
                    <div className="flex flex-col justify-center w-full gap-2 items-center px-4">
                        <div className="flex justify-between w-full items-center">
                            <div className="text-2xl font-medium hover:underline">
                                MacBook Pro
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="tracking-wider">Quantity</div>
                                <div className="bg-gray-950/2.5 border p-2 rounded-sm">
                                    10
                                </div>
                            </div>
                            <div className="font-mono">39.000.000 VND</div>
                        </div>

                        <div className="flex border-gray-300 border-t justify-between w-full gap-2 items-center pt-2">
                            <div className="text-gray-500 tracking-widest">
                                Available
                            </div>
                            <div className="text-red-500 hover:underline">
                                Delete
                            </div>
                        </div>
                    </div>
                </div>
                <Vertical />
            </div>
            <Horizon />
        </div>
    );
}

const SideBorder = () => <div className="border-gray-950/5 border-y p-2"></div>;

function PaymentCard() {
    return (
        <div className="flex flex-col w-full gap-0">
            <Horizon />
            <div className="flex w-full gap-0">
                <Vertical />
                <div className="flex border border-gray-950/5 p-2 w-full gap-4 bg-gray-950/2.5 min-w-max">
                    <div className="flex bg-white h-56 justify-center rounded-lg w-1/5 items-center outline outline-gray-950/5">
                        <img
                            src={img2}
                            alt="MacBook"
                            className="w-64 object-contain"
                        />
                    </div>
                    <div className="flex flex-col justify-center w-full gap-2 items-center px-4">
                        <div className="flex justify-between w-full items-center">
                            <div className="text-2xl font-medium hover:underline">
                                MacBook Pro
                            </div>
                            <div className=" flex flex-col gap-2">
                                <div className="flex gap-2 items-center">
                                    <div className="tracking-wider">Color</div>
                                    <div className="bg-black p-2 rounded-full"></div>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <div className="tracking-wider">
                                        Quantity
                                    </div>
                                    <div className="">10</div>
                                </div>
                            </div>
                            <div className="font-mono">39.000.000 VND</div>
                        </div>
                    </div>
                </div>
                <Vertical />
            </div>
            <Horizon />
        </div>
    );
}

const BillCard = () => {
    return (
        <>
            <div className="flex flex-col gap-0">
                <div className="relative">
                    <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                    <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4">
                        <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2 w-full">
                            <div className="">Bill</div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                    <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest  flex gap-4">
                        <div className="flex border-gray-950/5 border-x   w-full flex-col text-gray-500 font-serif ">
                            <div className="flex items-center border-b border-gray-950/5 justify-end">
                                <div className="border-r border-gray-950/5 py-1 px-8 w-full">
                                    Merchandise Subtotal
                                </div>
                                <div className=" border-gray-950/5 py-1 px-8 w-1/2">
                                    50.000.000 VND
                                </div>
                            </div>
                            <div className="flex items-center border-b border-gray-950/5 justify-end">
                                <div className="border-r border-gray-950/5 py-1 px-8 w-full">
                                    Shipping Subtotal
                                </div>
                                <div className=" border-gray-950/5 py-1 px-8 w-1/2">
                                    100.000 VND
                                </div>
                            </div>
                            <div className="flex  border-b border-gray-950/5 justify-end">
                                <div className=" border-gray-950/5 flex    items-center px-8 border-r py-2 w-full ">
                                    Payment Method
                                </div>

                                <div className=" border-gray-950/5 flex justify-between  bg-gray-950/2.5 items-center w-1/2 px-8">
                                    <Select>
                                        <SelectTrigger className="w-full text-left ">
                                            {/* <SelectValue placeholder="Cash on Delivery" /> */}
                                            <div className=" border w-full ">
                                                Cash on Delivery
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cod">
                                                Cash on Delivery
                                            </SelectItem>
                                            <SelectItem value="momo">
                                                Momo
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex items-center justify-end text-amber-900 ">
                                <div className="border-r border-gray-950/5  px-8 w-full font-bold py-4">
                                    Total Payment
                                </div>
                                <div className=" border-gray-950/5 py-1 px-8 w-1/2 font-semibold">
                                    50.100.000 VND
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
                </div>
            </div>

            <div className="text-center relative ">
                <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                <div className="text-lg font-medium  flex justify-center w-full">
                    <div className="bg-black text-white px-16 py-2 shadow-inner  hover:text-black hover:bg-gray-950/5 transition duration-300 cursor-pointer tracking-widest font-medium font-serif">
                        Order Now
                    </div>
                </div>
                <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
            </div>
        </>
    );
};

export {
    CardCartItem,
    CartInformation,
    InformationCard,
    PaymentCard,
    BillCard,
};
