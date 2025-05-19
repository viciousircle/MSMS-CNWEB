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

export default OrderSummaryItem;
