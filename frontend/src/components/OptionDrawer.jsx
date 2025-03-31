import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, CircleCheck, Minus, Plus } from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
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
import { ActionButtons, CancelButton } from "@/components/Button";

const OptionDrawer = () => {
    const [goal, setGoal] = useState(1);

    const adjustGoal = (adjustment) =>
        setGoal((prev) => Math.max(1, Math.min(10, prev + adjustment)));

    const handleInputChange = (event) => {
        const value = event.target.value;
        setGoal(
            value === ""
                ? ""
                : Math.max(1, Math.min(10, parseInt(value, 10) || 1))
        );
    };

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
                    <ColorSelection />
                    <StockInfo />
                    <QuantitySelector
                        goal={goal}
                        adjustGoal={adjustGoal}
                        handleInputChange={handleInputChange}
                    />
                    <DrawerFooter>
                        <ActionButtons />
                        <CancelButton />
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

const QuantitySelector = ({ goal, adjustGoal, handleInputChange }) => (
    <div className="p-4 pb-2 flex items-center justify-center space-x-2">
        <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => adjustGoal(-1)}
            disabled={goal <= 1}
        >
            <Minus />
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
            className="h-8 w-8 rounded-full"
            onClick={() => adjustGoal(1)}
            disabled={goal >= 10}
        >
            <Plus />
        </Button>
    </div>
);

const StockInfo = () => (
    <div className="p-4 text-sm text-gray-500">Available: 10</div>
);

const ColorSelection = () => (
    <div className="p-4 flex gap-4 items-center">
        <span className="block text-sm font-medium text-gray-700">
            Select Color:
        </span>
        <Select>
            <SelectTrigger className="w-[180px]">
                {/* <SelectValue placeholder="Colors" /> */}
                <Button>
                    Black
                    <ChevronDown className="ml-auto h-4 w-4" />
                </Button>
            </SelectTrigger>
            <SelectContent>
                {[
                    { value: "black", color: "bg-black" },
                    { value: "rose", color: "bg-rose-600" },
                    { value: "amber", color: "bg-amber-500" },
                ].map(({ value, color }) => (
                    <SelectItem key={value} value={value}>
                        <div className="flex items-center gap-2">
                            <div className={`p-2 ${color} rounded-full`}></div>
                            <span>
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                            </span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);

export default OptionDrawer;
