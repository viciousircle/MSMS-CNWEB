import { formatPrice } from '/utils/formatPrice';

const OrderItem = ({ name, color, price, quantity, image }) => {
    const formattedPrice = formatPrice(price);
    const formattedTotal = formatPrice(price * quantity);
    return (
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
                    {quantity} × {formattedPrice} VND
                </div>
                <div className="font-medium">{formattedTotal} VND</div>
            </div>
        </div>
    );
};

export default OrderItem;
