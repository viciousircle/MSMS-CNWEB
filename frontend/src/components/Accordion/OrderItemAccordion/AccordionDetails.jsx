import React from 'react';
import OrderItemsSection from './OrderItemsSection';
import CancelOrderSection from './CancelOrderSection';
import OrderInfoSection from './OrderInfoSection';

const AccordionDetails = ({ order }) => {
    const orderItems = [
        {
            id: 1,
            name: 'MacBook Pro 16-inch',
            color: 'Black',
            price: 1999.0,
            quantity: 3,
            imageUrl:
                'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MA6A4?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=Q2JSbkJNNWJiRjhtL1FhVllrV3M0QWtuVHYzMERCZURia3c5SzJFOTlPaTVLSXNiT0ZNb0pFK0FUWXliMlZBQlVSa0JnSnh1SVRYa2JBRDEreGVySHc',
        },
    ];

    const handleCancelOrder = () => {
        console.log(`Canceling order #${order.id}`);
    };

    return (
        <div className="px-4 py-2 flex flex-col gap-4">
            <div className="flex gap-4">
                <OrderItemsSection items={orderItems} />
                <OrderInfoSection order={order} />
            </div>
            <CancelOrderSection
                orderId={order.id}
                onCancel={handleCancelOrder}
            />
        </div>
    );
};

export default AccordionDetails;
