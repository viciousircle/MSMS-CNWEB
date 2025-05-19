import React from 'react';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUpdateOrderStage } from '@/hooks/seller/useUpdateOrderStage';
import { toast } from 'sonner';

const STAGE_FLOW = ['New', 'Prepare', 'Shipping', 'Shipped'];
const REVERSE_STAGE_FLOW = [...STAGE_FLOW].reverse();

const ChangeStageMenu = ({ selectedOrders, orders, onStageUpdated }) => {
    const { updateOrderStage, isUpdating } = useUpdateOrderStage();

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

    const handleStageChange = async (newStage) => {
        if (selectedOrders.size === 0) {
            toast.error('Please select at least one order');
            return;
        }

        try {
            const updatePromises = Array.from(selectedOrders).map((orderId) =>
                updateOrderStage(orderId, newStage)
            );

            await Promise.all(updatePromises);
            onStageUpdated?.();
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

        try {
            const updatePromises = Array.from(selectedOrders).map(
                async (orderId) => {
                    const order = orders.find((o) => o._id === orderId);
                    if (!order) return;

                    const currentStage = Array.isArray(order.orderStage)
                        ? order.orderStage.slice(-1)[0]?.stage
                        : order.orderStage;
                    const nextStage = getNextStage(currentStage);

                    if (nextStage !== currentStage) {
                        return updateOrderStage(orderId, nextStage);
                    }
                }
            );

            await Promise.all(updatePromises.filter(Boolean));
            onStageUpdated?.();
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

        try {
            const updatePromises = Array.from(selectedOrders).map(
                async (orderId) => {
                    const order = orders.find((o) => o._id === orderId);
                    if (!order) return;

                    const currentStage = Array.isArray(order.orderStage)
                        ? order.orderStage.slice(-1)[0]?.stage
                        : order.orderStage;
                    const prevStage = getPreviousStage(currentStage);

                    if (prevStage !== currentStage) {
                        return updateOrderStage(orderId, prevStage);
                    }
                }
            );

            await Promise.all(updatePromises.filter(Boolean));
            onStageUpdated?.();
            toast.success(
                `Moved ${selectedOrders.size} order(s) to previous stage`
            );
        } catch (error) {
            toast.error('Failed to update order stages');
            console.error('Error updating stages:', error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button disabled={isUpdating || selectedOrders.size === 0}>
                    <ArrowPathRoundedSquareIcon className="w-4 h-4 mr-1" />
                    Change Stage
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleNextStage}>
                    Next Stage
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {STAGE_FLOW.map((stage) => (
                    <DropdownMenuItem
                        key={stage}
                        onClick={() => handleStageChange(stage)}
                    >
                        {stage}
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handlePreviousStage}>
                    Previous Stage
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ChangeStageMenu;
