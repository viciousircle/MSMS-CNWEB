import React from "react";
import img2 from "@/assets/img2.jpeg";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Body from "@/components/Body";
import { HeaderWithIcon } from "@/components/Header";
import CheckBox from "@/components/Checkbox";
import { LinearCard } from "@/components/Decoration";
import { CartTotal } from "@/components/Footer";
import { CartInformation } from "@/components/Card";
import CartProductCard from "@/components/Cards/CartProductCard";

const Cart = () => {
    const product = {
        name: "MacBook Pro",
        image: img2,
        quantity: 10,
        price: "39.000.000 VND",
        inStock: 0,
    };

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
                                    <CartProductCard product={product} />
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
