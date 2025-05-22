import React from 'react';
import Label from '@/components/Others/Label';
import CardLayout from '@/components/Layouts/CardLayout';
import PaymentCard from '@/components/Cards/PaymentProductCard';

const PaymentDetails = ({ products }) => (
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

export default PaymentDetails;
