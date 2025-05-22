import React, { useState, useEffect } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { OrderItemsTable } from '../Tables/OrderItemsTable/OrderItemsTable';
import { useOrderDetails } from '@/hooks/seller/useOrderDetails.hook';
import { useUpdateOrderStage } from '@/hooks/seller/useUpdateOrderStage';
import { useUpdatePaymentStatus } from '@/hooks/seller/useUpdatePaymentStatus';
import { toast } from 'sonner';
import { formatDisplayId } from '/utils/idConverter';
import { ORDER_CONSTANTS } from '@/constants/order.constants';
import ViewDetailsTrigger from './ViewDetailsTrigger';
import ViewDetailsInfo from './ViewDetailsInfo';
import ViewDetailsActions from './ViewDetailsActions';

export const ViewDetailsSheet = ({
    orderId,
    dateOrder,
    orderStage,
    paymentMethod,
    paymentStatus,
    onStageUpdated,
    onPaymentStatusUpdated,
}) => {
    const [open, setOpen] = useState(false);
    const [currentStage, setCurrentStage] = useState(orderStage);
    const { orderDetails, loading, error, refetch } = useOrderDetails(orderId);
    const { updateOrderStage, isUpdating } = useUpdateOrderStage();
    const { updatePaymentStatus, isUpdating: isPaymentUpdating } =
        useUpdatePaymentStatus();

    useEffect(() => {
        if (open && orderId) {
            refetch();
        }
    }, [open, orderId]);

    useEffect(() => {
        setCurrentStage(orderStage);
    }, [orderStage]);

    const handleStageUpdate = async (newStage) => {
        try {
            await updateOrderStage(orderId, newStage);
            setCurrentStage(newStage);
            onStageUpdated?.(newStage);
            toast.success(`Order status updated to ${newStage}`);
            await refetch();
        } catch (error) {
            toast.error(`Failed to update status: ${error.message}`);
        }
    };

    const handlePaymentUpdate = async (isPaid) => {
        try {
            const newStatus = isPaid
                ? ORDER_CONSTANTS.PAYMENT_STATUS.PAID
                : ORDER_CONSTANTS.PAYMENT_STATUS.UNPAID;
            onPaymentStatusUpdated?.(newStatus);
            await updatePaymentStatus(orderId, isPaid);
            toast.success(`Payment status updated to ${newStatus}`);
            await refetch();
        } catch (error) {
            toast.error(`Failed to update payment status: ${error.message}`);
        }
    };

    return (
        <div className="relative">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <div>
                        <ViewDetailsTrigger loading={loading} />
                    </div>
                </SheetTrigger>

                <SheetContent className="sm:max-w-lg overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-center">
                            Order {formatDisplayId(orderId, 'ORD-')} Details
                        </SheetTitle>
                        <SheetDescription>
                            {loading ? (
                                <div>Loading...</div>
                            ) : error ? (
                                <div>Error: {error}</div>
                            ) : !orderDetails ? (
                                <div>Order not found</div>
                            ) : (
                                <>
                                    <ViewDetailsInfo
                                        orderDetails={orderDetails}
                                        dateOrder={dateOrder}
                                        paymentMethod={paymentMethod}
                                        orderStage={currentStage}
                                        paymentStatus={paymentStatus}
                                    />
                                    <div className="mt-6">
                                        <OrderItemsTable
                                            items={orderDetails.items}
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <ViewDetailsActions
                                            orderStage={currentStage}
                                            isUpdating={isUpdating}
                                            handleStageUpdate={
                                                handleStageUpdate
                                            }
                                            paymentStatus={paymentStatus}
                                            isPaymentUpdating={
                                                isPaymentUpdating
                                            }
                                            handlePaymentUpdate={
                                                handlePaymentUpdate
                                            }
                                        />
                                    </div>
                                </>
                            )}
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default ViewDetailsSheet;
