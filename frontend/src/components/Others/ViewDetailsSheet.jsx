import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { PaidStatusBadge, StageBadge } from './StatusBadge';
import { OrderItemsTable } from '../Tables/OrderItemsTable/OrderItemsTable';
import { useOrderDetails } from '@/hooks/seller/useOrderDetails.hook';
import { useUpdateOrderStage } from '@/hooks/seller/useUpdateOrderStage';
import { toast } from 'sonner';

const InfoRow = ({ label, value }) => (
    <div className="flex justify-between">
        <span className="font-medium text-gray-700">{label}:</span>
        <span className="text-right">{value}</span>
    </div>
);

const InfoSection = ({ title, children }) => (
    <div className="border border-gray-200 rounded-lg p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-800 text-center">
            {title}
        </h3>
        {children}
    </div>
);

const ActionButtons = ({ orderStage, isUpdating, handleStageUpdate }) => {
    switch (orderStage) {
        case 'New':
            return (
                <div className="flex gap-3">
                    <Button
                        className="flex-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        onClick={() => handleStageUpdate('Prepare')}
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Processing...' : 'Prepare'}
                    </Button>
                    <Button
                        className="flex-1 bg-red-100 text-red-700 hover:bg-red-200"
                        onClick={() => handleStageUpdate('Reject')}
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Processing...' : 'Reject'}
                    </Button>
                </div>
            );
        case 'Prepare':
            return (
                <div className="flex gap-3">
                    <Button
                        className="flex-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
                        onClick={() => handleStageUpdate('New')}
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Processing...' : 'Revert to New'}
                    </Button>
                    <Button
                        className="flex-1 bg-green-100 text-green-800 hover:bg-green-200"
                        onClick={() => handleStageUpdate('Shipping')}
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Processing...' : 'Mark as Shipping'}
                    </Button>
                </div>
            );
        case 'Shipping':
            return (
                <div className="flex gap-3">
                    <Button
                        className="flex-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        onClick={() => handleStageUpdate('Prepare')}
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Processing...' : 'Revert to Prepare'}
                    </Button>
                    <Button
                        className="flex-1 bg-purple-100 text-purple-800 hover:bg-purple-200"
                        onClick={() => handleStageUpdate('Shipped')}
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Processing...' : 'Mark as Shipped'}
                    </Button>
                </div>
            );
        default:
            return null;
    }
};

export const ViewDetailsSheet = ({
    orderId,
    dateOrder,
    orderStage,
    paymentMethod,
    paymentStatus,
    onStageUpdated,
}) => {
    const { orderDetails, loading, error, refetch } = useOrderDetails(orderId);
    const { updateOrderStage, isUpdating } = useUpdateOrderStage();

    const handleStageUpdate = async (newStage) => {
        try {
            // Optimistically update parent state first
            onStageUpdated?.(newStage);

            // Then make the API call
            await updateOrderStage(orderId, newStage);

            toast.success(`Order status updated to ${newStage}`);

            // Optional: Refetch to ensure complete sync with server
            await refetch();
        } catch (error) {
            toast.error(`Failed to update status: ${error.message}`);
            // You might want to revert the optimistic update here
        }
    };

    if (loading) {
        return (
            <div>
                <Button variant="link" className="px-0 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                        View <ArrowUpRight className="h-4 w-4" />
                    </span>
                </Button>
            </div>
        );
    }

    if (error) return <div>Error: {error}</div>;
    if (!orderDetails) return <div>Order not found</div>;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link" className="px-0 text-sm">
                    <span className="flex items-center gap-1">
                        View <ArrowUpRight className="h-4 w-4" />
                    </span>
                </Button>
            </SheetTrigger>

            <SheetContent className="sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-center">
                        Order {orderId} Details
                    </SheetTitle>
                    <SheetDescription>
                        <div className="flex flex-col gap-6 mt-6">
                            <InfoSection title="Receiver Information">
                                <InfoRow
                                    label="Full Name"
                                    value={orderDetails.receiverName}
                                />
                                <InfoRow
                                    label="Phone"
                                    value={orderDetails.receiverPhone}
                                />
                                <InfoRow
                                    label="Address"
                                    value={orderDetails.receiverAddress}
                                />
                            </InfoSection>

                            <InfoSection title="Order Summary">
                                <InfoRow label="Order ID" value={orderId} />
                                <InfoRow label="Date" value={dateOrder} />
                                <InfoRow
                                    label="Payment Method"
                                    value={paymentMethod}
                                />
                                <InfoRow
                                    label="Stage"
                                    value={<StageBadge status={orderStage} />}
                                />
                                <InfoRow
                                    label="Payment Status"
                                    value={
                                        <PaidStatusBadge
                                            status={paymentStatus}
                                        />
                                    }
                                />
                            </InfoSection>

                            <InfoSection title="Items Ordered">
                                <OrderItemsTable
                                    items={orderDetails.orderItems}
                                    shippingSubtotal={
                                        orderDetails.shippingSubtotal
                                    }
                                />
                            </InfoSection>

                            <ActionButtons
                                orderStage={orderStage}
                                isUpdating={isUpdating}
                                handleStageUpdate={handleStageUpdate}
                            />
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};
