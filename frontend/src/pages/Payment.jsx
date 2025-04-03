import React from "react";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import Body from "@/components/Body";
import { HeaderWithIcon } from "@/components/Header";
import PaymentCard from "@/components/Cards/PaymentProductCard";
import { LinearCard } from "@/components/Decoration";
import Label from "@/components/Label";
import PaymentReceiverCard from "@/components/Cards/PaymentReceiverCard";
import PaymentBillCard from "@/components/Cards/PaymentBillCard";

const Payment = () => {
    const products = [
        {
            id: 1,
            name: "MacBook Pro",
            img: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mac-card-40-mac-pro-display-202108?wid=680&hei=528&fmt=jpeg&qlt=90&.v=1731974949523",
            color: "Black",
            quantity: 10,
            price: 39000000,
        },
        {
            id: 2,
            name: "MacBook Air",
            img: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mac-card-40-mac-pro-display-202108?wid=680&hei=528&fmt=jpeg&qlt=90&.v=1731974949523",
            color: "Silver",
            quantity: 5,
            price: 29000000,
        },
    ];

    const merchandiseSubtotal = products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
    );

    const shippingSubtotal = 30000;

    return (
        <Body>
            <HeaderWithIcon icon={BanknotesIcon} title="Payment" />
            <PaymentReceiverCard />
            <PaymentDetails products={products} />
            <PaymentBillCard
                merchandiseSubtotal={merchandiseSubtotal}
                shippingSubtotal={shippingSubtotal}
            />
        </Body>
    );
};

const PaymentDetails = ({ products }) => {
    return (
        <div className="flex flex-col gap-4">
            <Label titles={["Products", "2 ITEMS"]} />
            <LinearCard>
                {products.map((product) => (
                    <PaymentCard product={product} />
                ))}
            </LinearCard>
        </div>
    );
};

export default Payment;
