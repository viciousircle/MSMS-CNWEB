import React from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useOrderSubmission } from '@/hooks/seller/useOrderSubmission.hook';
import OrderSummary from './OrderSummary';
import DialogActions from './DialogActions';

const OrderDialog = ({ products, receiverInfo, onOrderSuccess }) => {
    const { orderData, isLoading, error, submitOrder } = useOrderSubmission({
        onOrderSuccess,
    });

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    className="bg-black text-white px-16 py-2 shadow-inner hover:text-black hover:bg-gray-950/5 transition duration-300 cursor-pointer tracking-widest font-medium font-serif uppercase"
                    onClick={() => submitOrder(products, receiverInfo)}
                    disabled={isLoading}
                >
                    {isLoading ? 'Placing Order...' : 'Check out'}
                </button>
            </AlertDialogTrigger>

            <AlertDialogContent id="print-area">
                <AlertDialogHeader>
                    <AlertDialogTitle
                        className={`text-center text-lg font-medium ${
                            error ? 'text-red-600' : 'text-green-600'
                        }`}
                    >
                        {error ? 'Order Failed' : 'Order Placed Successfully!'}
                    </AlertDialogTitle>

                    <AlertDialogDescription className="space-y-4">
                        {error && (
                            <div className="text-red-500 p-3 bg-red-50 rounded-md">
                                {error}
                            </div>
                        )}
                        {orderData && <OrderSummary order={orderData} />}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <DialogActions orderData={orderData} />
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default OrderDialog;
