import React from "react";
import { InboxArrowDownIcon } from "@heroicons/react/24/outline";
import Body from "@/components/Body";
import { HeaderWithIcon } from "@/components/Header";
import {
    Label,
    OrderCard,
    OrderSorter,
    OrderStatusGroup,
} from "@/components/Label";

const Order = () => {
    return (
        <Body>
            <HeaderWithIcon icon={InboxArrowDownIcon} title="Order" />
            <Label title={"Order Status"} />
            <OrderStatusGroup />
            <OrderSorter />

            <OrderCard />
        </Body>
    );
};

export default Order;
