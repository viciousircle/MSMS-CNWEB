import React from 'react';
import { formatPrice } from '/utils/formatPrice';
import BillHeader from './BillHeader';
import BillRow from './BillRow';
import { PaymentMethodSelector } from '@/components/Selectors/PaymentMethodSelector';
import OrderDialog from '@/components/Others/OrderDialog';
import { useLocation } from 'react-router-dom';

const BillCard = ({ merchandiseSubtotal, shippingSubtotal }) => {
    const location = useLocation();
    const products = location.state?.products || [];
    const [receiverInfo, setReceiverInfo] = React.useState(null);

    React.useEffect(() => {
        const storedInfo = localStorage.getItem('receiverInfo');
        if (storedInfo) {
            setReceiverInfo(JSON.parse(storedInfo));
        }
    }, []);

    const paymentMethods = [
        { value: 'cod', label: 'Cash on Delivery' },
        { value: 'qr', label: 'QR' },
    ];

    const format = (value) => `${formatPrice(value)} VND`;
    const total = merchandiseSubtotal + shippingSubtotal;

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
                                    />
                                }
                                customValueClass="bg-gray-950/2.5 "
                                containerClass="border-b"
                            />
                            <BillRow
                                label="Total Payment"
                                value={format(total)}
                                labelClass="font-bold py-4 text-amber-900"
                                customValueClass="font-semibold text-amber-900"
                                containerClass="text-amber-900 items-center"
                            />
                        </div>
                    </div>
                    <SectionDivider position="bottom" />
                </div>
            </div>

            <div className="text-center relative">
                <SectionDivider position="top" />
                <div className="text-lg font-medium flex justify-center w-full">
                    <OrderDialog
                        products={products}
                        receiverInfo={receiverInfo}
                        total={total}
                    />
                </div>
                <SectionDivider position="bottom" />
            </div>
        </div>
    );
};

const SectionDivider = ({ position = 'top' }) => (
    <hr
        className={`border-gray-950/5 absolute left-[-100%] right-[-100%] ${position}-0`}
    />
);

export default BillCard;
