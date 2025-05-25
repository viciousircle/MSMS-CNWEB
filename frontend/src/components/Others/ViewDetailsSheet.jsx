import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
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
import { XMarkIcon } from '@heroicons/react/24/outline';

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
            <div onClick={() => setOpen(true)}>
                <ViewDetailsTrigger loading={loading} />
            </div>

            <Transition appear show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => setOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Order{' '}
                                            {formatDisplayId(orderId, 'ORD-')}{' '}
                                            Details
                                        </Dialog.Title>
                                        <button
                                            onClick={() => setOpen(false)}
                                            className="rounded-md p-1 hover:bg-gray-100"
                                        >
                                            <XMarkIcon className="h-5 w-5" />
                                        </button>
                                    </div>

                                    {loading ? (
                                        <div className="flex justify-center items-center min-h-[50vh]">
                                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                                        </div>
                                    ) : error ? (
                                        <div className="text-red-500">
                                            Error: {error}
                                        </div>
                                    ) : !orderDetails ? (
                                        <div className="text-gray-500">
                                            Order not found
                                        </div>
                                    ) : (
                                        <div className="mt-2">
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
                                                    paymentStatus={
                                                        paymentStatus
                                                    }
                                                    isPaymentUpdating={
                                                        isPaymentUpdating
                                                    }
                                                    handlePaymentUpdate={
                                                        handlePaymentUpdate
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ViewDetailsSheet;
