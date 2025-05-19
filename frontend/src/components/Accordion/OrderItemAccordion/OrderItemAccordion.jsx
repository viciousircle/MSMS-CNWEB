import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { StageBadge } from '@/components/Others/StatusBadge';
import AccordionDetails from './AccordionDetails';
import { formatDisplayId } from '/utils/idConverter';

const OrderItemAccordion = ({ order, refetchOrders }) => {
    const displayId = formatDisplayId(order._id, 'ORD-');

    console.log(displayId);

    return (
        <Accordion
            type="single"
            collapsible
            className="w-full border border-gray-200 rounded-lg bg-white"
        >
            <AccordionItem value={order._id}>
                <AccordionTrigger className="hover:no-underline px-4 py-3">
                    <div className="flex w-full justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-[100px] flex">
                                <StageBadge status={order.currentStage} />
                            </div>
                            <div className="flex gap-4">
                                <span className="font-bold text-gray-900">
                                    {displayId}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                                {order.createdAt}
                            </span>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <AccordionDetails
                        order={order}
                        refetchOrders={refetchOrders}
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default OrderItemAccordion;
