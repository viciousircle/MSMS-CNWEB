import React from 'react';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Popover } from '@headlessui/react';
import { toast } from 'sonner';

const STAGE_FLOW = [
    'New',
    'Prepare',
    'Shipping',
    'Shipped',
    'Cancelled',
    'Reject',
];
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

        console.log('Starting stage change to:', newStage);
        console.log('Selected orders:', Array.from(selectedOrders));

        // Check if any selected order is cancelled or rejected
        const hasCancelledOrRejected = Array.from(selectedOrders).some(
            (orderId) => {
                const order = orders.find((o) => o._id === orderId);
                const currentStage = getCurrentStage(order);
                console.log('Checking order:', { orderId, currentStage });
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
            console.log(
                'Preparing stage updates for orders:',
                Array.from(selectedOrders)
            );
            const updatePromises = Array.from(selectedOrders).map((orderId) => {
                const updateData = { stage: newStage };
                console.log('Sending update for order:', {
                    orderId,
                    updateData,
                });
                return onStageUpdated(orderId, updateData);
            });

            console.log('Executing all update promises');
            const results = await Promise.all(updatePromises);
            console.log('Update results:', results);
        } catch (error) {
            console.error('Detailed error in handleStageChange:', {
                error,
                message: error.message,
                stack: error.stack,
                newStage,
                selectedOrders: Array.from(selectedOrders),
            });
            toast.error(`Failed to update order stages: ${error.message}`);
        }
    };

    const handleNextStage = async () => {
        if (selectedOrders.size === 0) {
            toast.error('Please select at least one order');
            return;
        }

        console.log('Starting next stage update');
        console.log('Selected orders:', Array.from(selectedOrders));

        // Check if any selected order is cancelled or rejected
        const hasCancelledOrRejected = Array.from(selectedOrders).some(
            (orderId) => {
                const order = orders.find((o) => o._id === orderId);
                const currentStage = getCurrentStage(order);
                console.log('Checking order:', { orderId, currentStage });
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
            console.log('Preparing next stage updates');
            const updatePromises = Array.from(selectedOrders).map(
                async (orderId) => {
                    const order = orders.find((o) => o._id === orderId);
                    if (!order) {
                        console.log('Order not found:', orderId);
                        return;
                    }

                    const currentStage = getCurrentStage(order);
                    if (!currentStage) {
                        console.log('No current stage for order:', orderId);
                        return;
                    }

                    const nextStage = getNextStage(currentStage);
                    console.log('Stage transition:', {
                        orderId,
                        currentStage,
                        nextStage,
                    });

                    if (nextStage !== currentStage) {
                        const updateData = { stage: nextStage };
                        console.log('Sending update for order:', {
                            orderId,
                            updateData,
                        });
                        return onStageUpdated(orderId, updateData);
                    }
                }
            );

            console.log('Executing all next stage updates');
            const results = await Promise.all(updatePromises.filter(Boolean));
            console.log('Next stage update results:', results);
        } catch (error) {
            console.error('Detailed error in handleNextStage:', {
                error,
                message: error.message,
                stack: error.stack,
                selectedOrders: Array.from(selectedOrders),
            });
            toast.error(`Failed to update order stages: ${error.message}`);
        }
    };

    const handlePreviousStage = async () => {
        if (selectedOrders.size === 0) {
            toast.error('Please select at least one order');
            return;
        }

        console.log('Starting previous stage update');
        console.log('Selected orders:', Array.from(selectedOrders));

        // Check if any selected order is cancelled or rejected
        const hasCancelledOrRejected = Array.from(selectedOrders).some(
            (orderId) => {
                const order = orders.find((o) => o._id === orderId);
                const currentStage = getCurrentStage(order);
                console.log('Checking order:', { orderId, currentStage });
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
            console.log('Preparing previous stage updates');
            const updatePromises = Array.from(selectedOrders).map(
                async (orderId) => {
                    const order = orders.find((o) => o._id === orderId);
                    if (!order) {
                        console.log('Order not found:', orderId);
                        return;
                    }

                    const currentStage = getCurrentStage(order);
                    if (!currentStage) {
                        console.log('No current stage for order:', orderId);
                        return;
                    }

                    const prevStage = getPreviousStage(currentStage);
                    console.log('Stage transition:', {
                        orderId,
                        currentStage,
                        prevStage,
                    });

                    if (prevStage !== currentStage) {
                        const updateData = { stage: prevStage };
                        console.log('Sending update for order:', {
                            orderId,
                            updateData,
                        });
                        return onStageUpdated(orderId, updateData);
                    }
                }
            );

            console.log('Executing all previous stage updates');
            const results = await Promise.all(updatePromises.filter(Boolean));
            console.log('Previous stage update results:', results);
        } catch (error) {
            console.error('Detailed error in handlePreviousStage:', {
                error,
                message: error.message,
                stack: error.stack,
                selectedOrders: Array.from(selectedOrders),
            });
            toast.error(`Failed to update order stages: ${error.message}`);
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
