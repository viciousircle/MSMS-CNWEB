import React from 'react';
import { Button } from '@/components/ui/button';
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogFooter,
} from '@/components/ui/alert-dialog';

const DialogActions = ({ orderData }) => {
    return (
        <AlertDialogFooter>
            <AlertDialogCancel>Back to Store</AlertDialogCancel>
            <Button variant="destructive" onClick={() => window.print()}>
                Print Invoice
            </Button>
            {orderData && (
                <AlertDialogAction
                    onClick={() => console.log('View order status:', orderData)}
                >
                    Track Order
                </AlertDialogAction>
            )}
        </AlertDialogFooter>
    );
};

export default DialogActions;
