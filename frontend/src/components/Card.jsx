import React from "react";
import img2 from "../assets/img2.jpeg";
import { Button } from "@/components/ui/button";
import { CircleCheck, Minus, Plus } from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

const CardProduct = () => {
    return (
        <div className="flex flex-col w-full gap-0">
            <div className="flex w-full gap-0">
                <div className="p-2"></div>
                <div className="border-gray-950/5 border-x p-2 w-full"></div>
                <div className="p-2"></div>
            </div>
            <div className="flex w-full gap-0">
                <div className="border-gray-950/5 border-y p-2"></div>
                <div className="flex flex-col border border-gray-950/5 p-2 w-full gap-4 hover:bg-gray-950/2.5 min-w-max">
                    <div className="flex bg-white h-64 justify-center rounded-lg w-full items-center outline outline-gray-950/5">
                        <img
                            src={img2}
                            alt="MacBook"
                            className="w-64 object-contain"
                        />
                    </div>
                    <div className=" pb-2 flex justify-between items-center">
                        <div className="flex flex-col gap-2 items-start">
                            <div className="font-medium">MacBook Pro</div>
                            <div className="text-gray-400 text-xs font-mono">
                                39.000.000
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <DrawerDemo />
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
};

export { CardProduct };

export function DrawerDemo() {
    const [goal, setGoal] = React.useState(1);

    function onClick(adjustment) {
        setGoal((prev) => Math.max(1, Math.min(10, prev + adjustment)));
    }

    function handleInputChange(event) {
        let value = event.target.value;
        if (value === "") {
            setGoal("");
            return;
        }
        let num = parseInt(value, 10);
        if (!isNaN(num)) {
            setGoal(Math.max(1, Math.min(10, num))); // Keep within bounds
        }
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">View detail</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Product Options</DrawerTitle>
                    </DrawerHeader>

                    {/* Color Selection */}
                    <div className="p-4 flex gap-4 items-center">
                        <div className="block text-sm font-medium text-gray-700">
                            Select Color:
                        </div>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Colors" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="black">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-black rounded-full"></div>
                                        <span>Black</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="rose">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-rose-600 rounded-full"></div>
                                        <span>Rose</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="amber">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-amber-500 rounded-full"></div>
                                        <span>Amber</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="p-4 text-sm text-gray-500">
                        Available: 10
                    </div>

                    {/* Quantity Selection */}
                    <div className="p-4 pb-2">
                        <div className="flex items-center justify-center space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                                onClick={() => onClick(-1)}
                                disabled={goal <= 1}
                            >
                                <Minus />
                                <span className="sr-only">Decrease</span>
                            </Button>

                            <input
                                type="number"
                                className="w-16 text-center text-4xl font-bold bg-transparent border-none focus:outline-none no-spinner"
                                value={goal}
                                onChange={handleInputChange}
                                min="1"
                                max="10"
                            />

                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full"
                                onClick={() => onClick(1)}
                                disabled={goal >= 10}
                            >
                                <Plus />
                                <span className="sr-only">Increase</span>
                            </Button>
                        </div>
                    </div>

                    {/* Footer */}
                    <DrawerFooter>
                        <div className="flex w-full gap-2">
                            <Button
                                className="flex-1 hover:bg-emerald-600 hover:text-white bg-white border-emerald-600 border text-emerald-600"
                                onClick={() =>
                                    toast(
                                        <div className="flex items-center gap-2 text-green-600">
                                            <CircleCheck />
                                            <div>
                                                Item added to cart successfully!
                                            </div>
                                        </div>
                                    )
                                }
                            >
                                Add to Cart
                            </Button>
                            <Button className="flex-1">Order now</Button>
                        </div>
                        <DrawerClose asChild>
                            <Button
                                variant="outline"
                                className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
                            >
                                Cancel
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
