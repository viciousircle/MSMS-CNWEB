import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import OrderButton from "../Buttons/OrderButton";

const PaymentBillCard = ({ merchandiseSubtotal, shippingSubtotal }) => {
    const totalPayment = merchandiseSubtotal + shippingSubtotal;
    const paymentMethods = [
        { value: "cod", label: "Cash on Delivery" },
        { value: "momo", label: "Momo" },
    ];

    return (
        <>
            <div className="flex flex-col gap-0">
                <div className="relative">
                    <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                    <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4">
                        <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2 w-full">
                            <div>Bill</div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                    <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest flex gap-4">
                        <div className="flex border-gray-950/5 border-x w-full flex-col text-gray-500 font-serif">
                            <BillRow
                                label="Merchandise Subtotal"
                                value={`${merchandiseSubtotal} VND`}
                            />

                            <BillRow
                                label="Shipping Subtotal"
                                value={`${shippingSubtotal} VND`}
                            />

                            <div className="flex border-b border-gray-950/5 justify-end">
                                <div className="border-gray-950/5 flex items-center px-8 border-r py-2 w-full">
                                    Payment Method
                                </div>
                                <div className="border-gray-950/5 flex justify-between bg-gray-950/2.5 items-center w-1/2 px-8">
                                    <Select>
                                        <SelectTrigger className="w-full text-left">
                                            <SelectValue placeholder="Cash on Delivery" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {paymentMethods.map((method) => (
                                                <SelectItem
                                                    key={method.value}
                                                    value={method.value}
                                                >
                                                    {method.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center justify-end text-amber-900">
                                <div className="border-r border-gray-950/5 px-8 w-full font-bold py-4">
                                    Total Payment
                                </div>
                                <div className="border-gray-950/5 py-1 px-8 w-1/2 font-semibold">
                                    {totalPayment} VND
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
                </div>
            </div>

            <div className="text-center relative">
                <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                <div className="text-lg font-medium flex justify-center w-full">
                    <OrderButton />
                </div>
                <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
            </div>
        </>
    );
};

const BillRow = ({ label, value }) => (
    <div className="flex items-center border-b border-gray-950/5 justify-end">
        <div className="border-r border-gray-950/5 py-1 px-8 w-full">
            {label}
        </div>
        <div className="border-gray-950/5 py-1 px-8 w-1/2">{value}</div>
    </div>
);

export default PaymentBillCard;
