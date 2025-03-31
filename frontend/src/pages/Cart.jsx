import React from "react";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Body from "@/components/Body";
import { HeaderWithIcon } from "@/components/Header";
import CheckBox from "@/components/Checkbox";
import { LinearCard } from "@/components/Decoration";
import { CardCartItem } from "@/components/Card";
import { CartTotal } from "@/components/Footer";
import { CartInformation } from "@/components/Card";

const Cart = () => {
    return (
        <>
            <Body>
                <HeaderWithIcon icon={ShoppingCartIcon} title="Cart" />

                <CheckBox title="Products" />

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <CartInformation date={"12/12/2025"} items={"4"} />
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
