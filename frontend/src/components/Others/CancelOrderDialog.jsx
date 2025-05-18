import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { useCancelOrder } from '@/hooks/order/useCancelOrder.hook';

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
            console.log('Order cancelled successfully:', cancelledOrder);

            setOpen(false);
        }
        if (error) {
            console.error('Error cancelling order:', error);
        }
    }, [isSuccess, error, orderId]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-fit">
                    Cancel Order
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cancel Order #{orderId}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to cancel this order? This action
                        cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isLoading}>
                            Keep Order
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Cancelling...' : 'Cancel Order'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CancelOrderDialog;
