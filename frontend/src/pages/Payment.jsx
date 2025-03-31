import React from "react";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import Body from "@/components/Body";
import { HeaderWithIcon } from "@/components/Header";
import { BillCard, InformationCard } from "@/components/Card";
import { PaymentCard, LinearCard } from "@/components/Card";

const Payment = () => {
    return (
        <Body>
            <HeaderWithIcon icon={BanknotesIcon} title="Payment" />
            <InformationCard />
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <hr className="border-gray-950/5 absolute left-[-100%] right-[-100%] top-0" />
                    <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest uppercase flex gap-4">
                        <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2 w-fit">
                            <div className="">Products</div>
                        </div>
                        <div className="flex border-gray-950/5 border-x gap-2 bg-gray-950/2.5 items-center px-4 py-2">
                            <div className="">2 ITEMS</div>
                        </div>
                    </div>

                    <hr className="border-gray-950/5 absolute bottom-0 left-[-100%] right-[-100%]" />
                </div>
                <LinearCard>
                    {[...Array(2)].map(() => (
                        <PaymentCard />
                    ))}
                </LinearCard>
            </div>
            <BillCard />
        </Body>
    );
};

export default Payment;
