import React from 'react';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Popover } from '@headlessui/react';
import { toast } from 'sonner';

const STAGE_FLOW = ['New', 'Prepare', 'Shipping', 'Shipped'];
const REVERSE_STAGE_FLOW = [...STAGE_FLOW].reverse();

const ChangeStageMenu = ({ selectedOrders, orders, onStageUpdated }) => {
    const getNextStage = (currentStage) => {
        const currentIndex = STAGE_FLOW.indexOf(currentStage);
        return currentIndex < STAGE_FLOW.length - 1
            ? STAGE_FLOW[currentIndex + 1]
            : currentStage;
    };

    const getPreviousStage = (currentStage) => {
        const currentIndex = REVERSE_STAGE_FLOW.indexOf(currentStage);
        return currentIndex < REVERSE_STAGE_FLOW.length - 1
            ? REVERSE_STAGE_FLOW[currentIndex + 1]
            : currentStage;
    };

    const getCurrentStage = (order) => {
        if (!order) return null;
        return Array.isArray(order.orderStage)
            ? order.orderStage.slice(-1)[0]?.stage
            : order.orderStage;
    };

    const handleStageChange = async (newStage) => {
        if (selectedOrders.size === 0) {
            toast.error('Please select at least one order');
            return;
        }

        // Check if any selected order is cancelled or rejected
        const hasCancelledOrRejected = Array.from(selectedOrders).some(
            (orderId) => {
                const order = orders.find((o) => o._id === orderId);
                const currentStage = getCurrentStage(order);
                return (
                    currentStage === 'Cancelled' || currentStage === 'Reject'
                );
            }
        );

        if (hasCancelledOrRejected) {
            toast.error('Cannot change stage for cancelled or rejected orders');
            return;
        }

        try {
            const updatePromises = Array.from(selectedOrders).map((orderId) =>
                onStageUpdated(orderId, newStage)
            );

            await Promise.all(updatePromises);
            toast.success(
                `Updated ${selectedOrders.size} order(s) to ${newStage}`
            );
        } catch (error) {
            toast.error('Failed to update order stages');
            console.error('Error updating stages:', error);
        }
    };

    const handleNextStage = async () => {
        if (selectedOrders.size === 0) {
            toast.error('Please select at least one order');
            return;
        }

        // Check if any selected order is cancelled or rejected
        const hasCancelledOrRejected = Array.from(selectedOrders).some(
            (orderId) => {
                const order = orders.find((o) => o._id === orderId);
                const currentStage = getCurrentStage(order);
                return (
                    currentStage === 'Cancelled' || currentStage === 'Reject'
                );
            }
        );

        if (hasCancelledOrRejected) {
            toast.error('Cannot change stage for cancelled or rejected orders');
            return;
        }

        try {
            const updatePromises = Array.from(selectedOrders).map(
                async (orderId) => {
                    const order = orders.find((o) => o._id === orderId);
                    if (!order) return;

                    const currentStage = getCurrentStage(order);
                    if (!currentStage) return;

                    const nextStage = getNextStage(currentStage);

                    if (nextStage !== currentStage) {
                        return onStageUpdated(orderId, nextStage);
                    }
                }
            );

            await Promise.all(updatePromises.filter(Boolean));
            toast.success(
                `Moved ${selectedOrders.size} order(s) to next stage`
            );
        } catch (error) {
            toast.error('Failed to update order stages');
            console.error('Error updating stages:', error);
        }
    };

    const handlePreviousStage = async () => {
        if (selectedOrders.size === 0) {
            toast.error('Please select at least one order');
            return;
        }

        // Check if any selected order is cancelled or rejected
        const hasCancelledOrRejected = Array.from(selectedOrders).some(
            (orderId) => {
                const order = orders.find((o) => o._id === orderId);
                const currentStage = getCurrentStage(order);
                return (
                    currentStage === 'Cancelled' || currentStage === 'Reject'
                );
            }
        );

        if (hasCancelledOrRejected) {
            toast.error('Cannot change stage for cancelled or rejected orders');
            return;
        }

        try {
            const updatePromises = Array.from(selectedOrders).map(
                async (orderId) => {
                    const order = orders.find((o) => o._id === orderId);
                    if (!order) return;

                    const currentStage = getCurrentStage(order);
                    if (!currentStage) return;

                    const prevStage = getPreviousStage(currentStage);

                    if (prevStage !== currentStage) {
                        return onStageUpdated(orderId, prevStage);
                    }
                }
            );

            await Promise.all(updatePromises.filter(Boolean));
            toast.success(
                `Moved ${selectedOrders.size} order(s) to previous stage`
            );
        } catch (error) {
            toast.error('Failed to update order stages');
            console.error('Error updating stages:', error);
        }
    };

    // Check if any selected order is cancelled or rejected
    const hasCancelledOrRejected = Array.from(selectedOrders).some(
        (orderId) => {
            const order = orders.find((o) => o._id === orderId);
            const currentStage = getCurrentStage(order);
            return currentStage === 'Cancelled' || currentStage === 'Reject';
        }
    );

    return (
        <Popover className="relative">
            <Popover.Button asChild>
                <Button
                    disabled={
                        selectedOrders.size === 0 || hasCancelledOrRejected
                    }
                >
                    <ArrowPathRoundedSquareIcon className="w-4 h-4 mr-1" />
                    Change Stage
                </Button>
            </Popover.Button>
            <Popover.Panel className="absolute z-10 mt-2 bg-white shadow-lg rounded-md border border-gray-200 w-48">
                <div className="p-1">
                    <button
                        onClick={handleNextStage}
                        className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-sm"
                    >
                        Next Stage
                    </button>
                    <div className="h-px bg-gray-200 my-1" />
                    {STAGE_FLOW.map((stage) => (
                        <button
                            key={stage}
                            onClick={() => handleStageChange(stage)}
                            className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-sm"
                        >
                            {stage}
                        </button>
                    ))}
                    <div className="h-px bg-gray-200 my-1" />
                    <button
                        onClick={handlePreviousStage}
                        className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 rounded-sm"
                    >
                        Previous Stage
                    </button>
                </div>
            </Popover.Panel>
        </Popover>
    );
};

export default ChangeStageMenu;
