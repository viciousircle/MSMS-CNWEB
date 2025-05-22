import React from 'react';
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
    const { orderDetails, loading, error, refetch } = useOrderDetails(orderId);
    const { updateOrderStage, isUpdating } = useUpdateOrderStage();
    const { updatePaymentStatus, isUpdating: isPaymentUpdating } =
        useUpdatePaymentStatus();

    const handleStageUpdate = async (newStage) => {
        try {
            onStageUpdated?.(newStage);
            await updateOrderStage(orderId, newStage);
            toast.success(`Order status updated to ${newStage}`);
            await refetch();
        } catch (error) {
            toast.error(`Failed to update status: ${error.message}`);
        }
    };

    const handlePaymentUpdate = async (isPaid) => {
        try {
            onPaymentStatusUpdated?.(
                isPaid
                    ? ORDER_CONSTANTS.PAYMENT_STATUS.PAID
                    : ORDER_CONSTANTS.PAYMENT_STATUS.UNPAID
            );
            await updatePaymentStatus(orderId, isPaid);
            toast.success(
                `Payment status updated to ${
                    isPaid
                        ? ORDER_CONSTANTS.PAYMENT_STATUS.PAID
                        : ORDER_CONSTANTS.PAYMENT_STATUS.UNPAID
                }`
            );
            await refetch();
        } catch (error) {
            toast.error(`Failed to update payment status: ${error.message}`);
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!orderDetails) return <div>Order not found</div>;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <ViewDetailsTrigger loading={loading} />
            </SheetTrigger>

            <SheetContent className="sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-center">
                        Order {formatDisplayId(orderId, 'ORD-')} Details
                    </SheetTitle>
                    <SheetDescription>
                        <ViewDetailsInfo
                            orderDetails={orderDetails}
                            dateOrder={dateOrder}
                            paymentMethod={paymentMethod}
                            orderStage={orderStage}
                            paymentStatus={paymentStatus}
                        />
                        <div className="mt-6">
                            <OrderItemsTable items={orderDetails.items} />
                        </div>
                        <div className="mt-6">
                            <ViewDetailsActions
                                orderStage={orderStage}
                                isUpdating={isUpdating}
                                handleStageUpdate={handleStageUpdate}
                                paymentStatus={paymentStatus}
                                isPaymentUpdating={isPaymentUpdating}
                                handlePaymentUpdate={handlePaymentUpdate}
                            />
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default ViewDetailsSheet;
