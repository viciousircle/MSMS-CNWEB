import React from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
    ChevronDownIcon,
    PhoneIcon,
    PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Decoration from "../components/Decoration";
import { HrBot, HrTop } from "../components/HorizontalLine";
import Body from "@/components/Body";
import { HeaderWithIcon } from "@/components/Header";
import CheckBox from "@/components/Checkbox";
import { LinearCard } from "@/components/Card";
import { CardCartItem } from "@/components/Card";
import { CartTotal } from "@/components/Footer";
import { InformationSection } from "@/components/Card";
const Cart = () => {
    return (
        <>
            <Body>
                <HeaderWithIcon icon={ShoppingCartIcon} title="Cart" />

                <CheckBox title="Products" />

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <InformationSection />
                        <LinearCard>
                            {[...Array(2)].map((_, index) => (
                                <div key={index} className="">
                                    <CardCartItem />
                                </div>
                            ))}
                        </LinearCard>
                    </div>
                </div>
            </Body>
            <CartTotal />
        </>
    );
};

export default Cart;
