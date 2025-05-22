import OrderItem from './OrderItem';
import OrderSummaryItem from './OrderSummaryItem';
import { ORDER_CONSTANTS } from '@/constants/order.constants';

const OrderItemsSection = ({ items }) => {
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const shippingCost = ORDER_CONSTANTS.DEFAULT_SHIPPING_COST;
    const total = subtotal + shippingCost;

    return (
        <div className="flex-1/2 flex flex-col gap-4">
            <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-base font-medium text-black mb-4">
                    Order Items
                </h3>
                <div className="flex flex-col gap-4">
                    {items.map((item) => (
                        <OrderItem key={item._id} {...item} />
                    ))}
                </div>
            </div>

            <div className="border border-gray-200 p-4 rounded-lg">
                <h3 className="text-base font-medium text-black mb-2">
                    Order Summary
                </h3>
                <div className="flex flex-col px-2">
                    <OrderSummaryItem
                        label="Subtotal"
                        value={`${
                            ORDER_CONSTANTS.DEFAULT_CURRENCY_SYMBOL
                        }${subtotal.toFixed(2)}`}
                        additionalInfo={`${totalQuantity} items`}
                    />
                    <OrderSummaryItem
                        label="Shipping"
                        value={`${
                            ORDER_CONSTANTS.DEFAULT_CURRENCY_SYMBOL
                        }${shippingCost.toFixed(2)}`}
                        additionalInfo="Standard Shipping"
                    />
                    <OrderSummaryItem
                        label="Total"
                        value={`${
                            ORDER_CONSTANTS.DEFAULT_CURRENCY_SYMBOL
                        }${total.toFixed(2)}`}
                        additionalInfo=" "
                        isBold
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderItemsSection;
