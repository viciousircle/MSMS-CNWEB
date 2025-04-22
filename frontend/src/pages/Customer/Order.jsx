import React from 'react';
import { InboxArrowDownIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import {
    Label,
    OrderCard,
    OrderSorter,
    OrderStatusGroup,
} from '@/components/Others/Label';

const Order = () => {
    return (
        <Body>
            <HeaderWithIcon icon={InboxArrowDownIcon} title="Order" />
            <Label titles={['Order Status']} />
            <OrderStatusGroup />
            <OrderSorter />

            <OrderCard />
        </Body>
    );
};

export default Order;
