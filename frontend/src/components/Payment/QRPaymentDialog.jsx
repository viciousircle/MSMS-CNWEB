import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import VietQR from '@/components/Payment/VietQR';

const QRPaymentDialog = ({
    isOpen,
    onOpenChange,
    total,
    bankInfo,
    error,
    orderError,
    isLoading,
    onCheckout,
}) => (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Scan QR Code to Pay</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
                <VietQR
                    amount={total}
                    orderId={`ORD-${Date.now()}`}
                    bankInfo={bankInfo}
                />
            </div>
            {(error || orderError) && (
                <div className="text-red-500 p-3 bg-red-50 rounded-md mt-4">
                    {error || orderError}
                </div>
            )}
            <DialogFooter className="mt-6">
                <button
                    className="bg-black text-white px-16 py-2 shadow-inner hover:text-black hover:bg-gray-950/5 transition duration-300 cursor-pointer tracking-widest font-medium font-serif uppercase w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onCheckout}
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : 'Check out'}
                </button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

export default QRPaymentDialog;
