import React from 'react';
import { useLocation } from 'react-router-dom';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import Body from '@/components/Structure/Body';
import { HeaderWithIcon } from '@/components/Structure/Header';
import PaymentCard from '@/components/Cards/PaymentProductCard';
import CardLayout from '@/components/Layouts/CardLayout';
import Label from '@/components/Others/Label';
import PaymentReceiverCard from '@/components/Cards/PaymentReceiverCard';
import PaymentBillCard from '@/components/Cards/PaymentBillCard';

const Payment = () => {
    const location = useLocation();
    const products = location.state?.products || [];

    const parsePrice = (price) =>
        typeof price === 'string' ? Number(price.replace(/\./g, '')) : price;

    const merchandiseSubtotal = products.reduce((acc, product) => {
        const price = parsePrice(product.price);
        return acc + price * product.quantity;
    }, 0);

    const shippingSubtotal = 30000;

    return (
        <Body>
            <HeaderWithIcon icon={BanknotesIcon} title="Payment" />
            <PaymentReceiverCard />
            <PaymentDetails products={products} />
            <PaymentBillCard
                merchandiseSubtotal={merchandiseSubtotal}
                shippingSubtotal={shippingSubtotal}
            />
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
