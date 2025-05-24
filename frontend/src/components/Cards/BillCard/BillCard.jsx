import React from 'react';
import { formatPrice } from '/utils/formatPrice';
import BillHeader from './BillHeader';
import BillRow from './BillRow';
import { PaymentMethodSelector } from '@/components/Selectors/PaymentMethodSelector';
import { ORDER_CONSTANTS } from '@/constants/order.constants';

const BillCard = ({
    merchandiseSubtotal,
    shippingSubtotal,
    onPaymentMethodChange,
    onCheckout,
}) => {
    const paymentMethods = [
        {
            value: ORDER_CONSTANTS.PAYMENT_METHODS.COD,
            label: 'Cash on Delivery',
        },
        {
            value: ORDER_CONSTANTS.PAYMENT_METHODS.QR,
            label: 'VietQR Payment',
        },
    ];

    const format = (value) => `${formatPrice(value)} VND`;
    const total = merchandiseSubtotal + shippingSubtotal;

    const handlePaymentMethodChange = (value) => {
        onPaymentMethodChange?.(value);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-0 relative">
                <SectionDivider position="top" />
                <BillHeader />

                <div className="relative">
                    <SectionDivider position="top" />
                    <div className="text-gray-700 text-pretty font-medium font-mono px-4 tracking-widest flex gap-4">
                        <div className="flex border-gray-950/5 border-x w-full flex-col text-gray-500 font-serif">
                            <BillRow
                                label="Merchandise Subtotal"
                                value={format(merchandiseSubtotal)}
                                containerClass="items-center border-b"
                            />
                            <BillRow
                                label="Shipping Subtotal"
                                value={format(shippingSubtotal)}
                                containerClass="items-center border-b"
                            />
                            <BillRow
                                label="Payment Method"
                                value={
                                    <PaymentMethodSelector
                                        paymentMethods={paymentMethods}
                                        onValueChange={
                                            handlePaymentMethodChange
                                        }
                                    />
                                }
                                customValueClass="bg-gray-950/2.5 "
                                containerClass="border-b"
                            />
                            <BillRow
                                label="Total"
                                value={format(total)}
                                containerClass="items-center border-b"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="bg-black text-white px-16 py-2 shadow-inner hover:text-black hover:bg-gray-950/5 transition duration-300 cursor-pointer tracking-widest font-medium font-serif uppercase w-full"
                onClick={onCheckout}
            >
                Check out
            </button>
        </div>
    );
};

const SectionDivider = ({ position = 'top' }) => (
    <hr
        className={`border-gray-950/5 absolute left-[-100%] right-[-100%] ${position}-0`}
    />
);

export default BillCard;
