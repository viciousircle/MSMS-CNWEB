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

export const ViewDetailsSheet = ({
    orderId,
    dateOrder,
    stageOrder,
    paymentMethod,
    paymentStatus,
}) => {
    const { orderDetails, loading, error } = useOrderDetails(orderId);

    if (loading) return <div>Loading order details...</div>;
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
                                    value={orderDetails.address}
                                />
                            </InfoSection>

                            <InfoSection title="Order Summary">
                                <InfoRow label="Order ID" value={orderId} />
                                <InfoRow label="Date" value={dateOrder} />
                                <InfoRow
                                    label="Stage"
                                    value={<StageBadge status={stageOrder} />}
                                />
                                <InfoRow
                                    label="Payment Method"
                                    value={paymentMethod}
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
                                    items={orderDetails.items}
                                    shippingSubtotal={
                                        orderDetails.shippingSubtotal
                                    }
                                />
                            </InfoSection>

                            <div className="flex gap-3">
                                <Button className="flex-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                                    Prepare
                                </Button>
                                <Button className="flex-1 bg-red-100 text-red-700 hover:bg-red-200">
                                    Reject
                                </Button>
                            </div>
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};
