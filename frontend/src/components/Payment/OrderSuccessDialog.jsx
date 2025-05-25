import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const OrderSuccessDialog = ({ isOpen, onOpenChange, orderData, error }) => {
    const navigate = useNavigate();

    const handleBackToStore = () => {
        onOpenChange(false);
        navigate('/');
    };

    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && isOpen) {
                event.preventDefault();
                event.stopPropagation();
                console.log('Esc key pressed');
                handleBackToStore();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey, true);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey, true);
        };
    }, [isOpen, onOpenChange, navigate]);

    const handleTrackOrder = () => {
        onOpenChange(false);
        navigate('/order');
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
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
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleBackToStore}>
                        Back to Store
                    </AlertDialogCancel>

                    {orderData && (
                        <AlertDialogAction onClick={handleTrackOrder}>
                            Track Order
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default OrderSuccessDialog;
