import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import PaymentCard from '@/components/Cards/PaymentProductCard';
import CardLayout from '@/components/Layouts/CardLayout';
import Label from '@/components/Others/Label';
import PaymentReceiverCard from '@/components/Cards/PaymentReceiverCard';
import BillCard from '@/components/Cards/BillCard/BillCard';
import VietQR from '@/components/Payment/VietQR';

const Payment = () => {
    const location = useLocation();
    const products = location.state?.products || [];
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const parsePrice = (price) =>
        typeof price === 'string' ? Number(price.replace(/\./g, '')) : price;

    const merchandiseSubtotal = products.reduce((acc, product) => {
        const price = parsePrice(product.price);
        return acc + price * product.quantity;
    }, 0);

    const shippingSubtotal = 30000;
    // For testing VietQR, we'll use a fixed amount of 10,000 VND
    const total = 10000; // Fixed amount for testing

    // Mock bank info - In real app, this should come from your backend
    const bankInfo = {
        bankName: 'VietinBank',
        bankCode: 'vietinbank', // VietQR.io bank code
        accountNumber: '106873633198',
        accountName: 'MSMS CN WEB',
    };

    return (
        <Body>
            <HeaderWithIcon icon={BanknotesIcon} title="Payment" />
            <PaymentReceiverCard />
            <PaymentDetails products={products} />

            <BillCard
                merchandiseSubtotal={merchandiseSubtotal}
                shippingSubtotal={shippingSubtotal}
                onPaymentMethodChange={setPaymentMethod}
            />

            {paymentMethod === 'qr' && (
                <div className="mt-6 px-4">
                    <VietQR
                        amount={total}
                        orderId={`ORD-${Date.now()}`}
                        bankInfo={bankInfo}
                    />
                </div>
            )}
        </Body>
    );
};

const PaymentDetails = ({ products }) => {
    return (
        <div className="flex flex-col gap-4">
            <Label
                titles={[
                    'Products',
                    `${products.length} ITEM${products.length > 1 ? 'S' : ''}`,
                ]}
            />
            <CardLayout variant="linear">
                {products.map((product, index) => (
                    <PaymentCard key={index} product={product} />
                ))}
            </CardLayout>
        </div>
    );
};

export default Payment;
