import React from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const CancelOrderDialog = ({ orderId, onCancel }) => {
    return (
        <Dialog>
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
                    <Button variant="outline">Keep Order</Button>
                    <Button variant="destructive" onClick={onCancel}>
                        Cancel Order
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CancelOrderDialog;
