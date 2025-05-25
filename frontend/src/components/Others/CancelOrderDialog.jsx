import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCancelOrder } from '@/hooks/order/useCancelOrder.hook';
import { X } from 'lucide-react';

const CancelOrderDialog = ({ orderId, onCancel }) => {
    const { cancelOrder, isLoading, error, isSuccess, cancelledOrder } =
        useCancelOrder();
    const [open, setOpen] = React.useState(false);

    const handleCancel = async () => {
        try {
            await cancelOrder(orderId);
            if (onCancel) {
                onCancel(cancelledOrder);
            }
        } catch (err) {
            console.error('Error cancelling order:', err);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            console.log(`Order #${orderId} cancelled successfully`);
            setOpen(false);
        }
        if (error) {
            console.error('Error cancelling order:', error);
        }
    }, [isSuccess, error, orderId]);

    return (
        <>
            <Button
                variant="destructive"
                className="w-fit"
                onClick={() => setOpen(true)}
            >
                Cancel Order
            </Button>

            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 bg-black/40 z-50"
                        />

                        {/* Dialog */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                            className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg"
                        >
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">
                                        Cancel Order #{orderId}
                                    </h2>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="rounded-full p-1 hover:bg-gray-100"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>

                                <p className="text-sm text-gray-500">
                                    Are you sure you want to cancel this order?
                                    This action cannot be undone.
                                </p>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setOpen(false)}
                                        disabled={isLoading}
                                    >
                                        Keep Order
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={handleCancel}
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? 'Cancelling...'
                                            : 'Cancel Order'}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default CancelOrderDialog;
