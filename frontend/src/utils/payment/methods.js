import { ORDER_CONSTANTS } from '@/constants/order.constants';

export const handlePaymentMethod = (method, setQRDialogOpen) => {
    if (method === ORDER_CONSTANTS.PAYMENT_METHODS.QR) {
        setQRDialogOpen(true);
    } else {
        setQRDialogOpen(false);
    }
};

export const handlePrintInvoice = () => {
    window.print();
};

export const handleTrackOrder = (orderData) => {
    console.log('View order status:', orderData);
    // TODO: Implement order tracking logic
};
