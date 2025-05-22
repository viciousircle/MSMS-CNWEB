import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import OrderSummary from './OrderSummary';

const OrderSuccessDialog = ({
    isOpen,
    onOpenChange,
    orderData,
    onPrint,
    onTrackOrder,
}) => (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent id="print-area">
            <AlertDialogHeader>
                <AlertDialogTitle className="text-center text-lg font-medium text-green-600">
                    Order Placed Successfully!
                </AlertDialogTitle>
                <AlertDialogDescription className="space-y-4">
                    {orderData && <OrderSummary order={orderData} />}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Back to Store</AlertDialogCancel>
                <button
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-md"
                    onClick={onPrint}
                >
                    Print Invoice
                </button>
                <AlertDialogAction onClick={onTrackOrder}>
                    Track Order
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);

export default OrderSuccessDialog;
