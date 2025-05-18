import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { StageBadge } from '@/components/Others/StatusBadge';
import AccordionDetails from './AccordionDetails';

const OrderItemAccordion = ({ order }) => {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full border border-gray-200 rounded-lg bg-white"
        >
            <AccordionItem value={order.id}>
                <AccordionTrigger className="hover:no-underline px-4 py-3">
                    <div className="flex w-full justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-[100px] flex ">
                                <StageBadge status={order.stage} />
                            </div>
                            <div className="flex gap-4">
                                <span className="font-bold text-gray-900">
                                    #{order.id}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                                {order.date}
                            </span>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <AccordionDetails order={order} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default OrderItemAccordion;
