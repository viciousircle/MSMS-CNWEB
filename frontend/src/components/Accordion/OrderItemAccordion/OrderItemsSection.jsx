const OrderItemsSection = ({ items }) => {
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0); // Calculate total quantity
    const shippingCost = 30.0; // Example shipping cost
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
                        value={`$${subtotal.toFixed(2)}`}
                        additionalInfo={`${totalQuantity} items`} // Use totalQuantity instead of items.length
                    />
                    <OrderSummaryItem
                        label="Shipping"
                        value={`$${shippingCost.toFixed(2)}`}
                        additionalInfo="Standard Shipping"
                    />
                    <OrderSummaryItem
                        label="Total"
                        value={`$${total.toFixed(2)}`}
                        additionalInfo=" "
                        isBold
                    />
                </div>
            </div>
        </div>
    );
};
const OrderSummaryItem = ({
    label,
    value,
    additionalInfo = null,
    isBold = false,
}) => (
    <div className="flex justify-between items-center">
        <div
            className={`text-base ${
                isBold ? 'font-medium' : 'font-thin'
            } tracking-wider flex-1`}
        >
            {label}
        </div>
        <div className="flex items-center justify-between gap-4 flex-1">
            {additionalInfo && (
                <div
                    className={`text-base ${
                        isBold ? 'font-medium' : 'font-thin'
                    } tracking-wider`}
                >
                    {additionalInfo}
                </div>
            )}
            <div
                className={`text-base ${
                    isBold ? 'font-medium' : 'font-thin'
                } tracking-wider`}
            >
                {value}
            </div>
        </div>
    </div>
);

const OrderItem = ({ name, color, price, quantity, image }) => (
    <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
            <div className="rounded-md border">
                <img
                    src={image}
                    alt={name}
                    className="w-24 h-24 p-2 object-contain"
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className="font-medium text-base">{name}</div>
                <div className="flex items-center gap-2">
                    <div>{color}</div>
                    <span
                        className={`bg-${color.toLowerCase()}-500 w-3 h-3 rounded-full inline-block`}
                    />
                </div>
            </div>
        </div>
        <div className="flex gap-4 items-center">
            <div className="border rounded-sm p-2 text-gray-500">
                {quantity} × ${price.toFixed(2)}
            </div>
            <div className="font-medium">
                {(quantity * price).toFixed(2)} VND
            </div>
        </div>
    </div>
);

export default OrderItemsSection;
