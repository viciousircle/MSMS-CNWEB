import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { StageBadge } from '@/components/Others/StatusBadge';
import AccordionDetails from './AccordionDetails';
import { formatDisplayId } from '/utils/idConverter';

const OrderItemAccordion = ({ order, refetchOrders }) => {
    const [isOpen, setIsOpen] = useState(false);
    const displayId = formatDisplayId(order._id, 'ORD-');

    return (
        <div className="w-full border border-gray-200 rounded-lg bg-white overflow-hidden">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                initial={false}
            >
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
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                        </motion.div>
                    </div>
                </div>
            </motion.button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4">
                            <AccordionDetails
                                order={order}
                                refetchOrders={refetchOrders}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrderItemAccordion;
