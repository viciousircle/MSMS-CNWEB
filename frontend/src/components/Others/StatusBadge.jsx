/**
 * Reusable badge component with customizable styles.
 * @param {Object} props
 * @param {'Paid'|'Unpaid'|'New'|'Prepare'|'Reject'|'Shipping'|'Shipped'} props.status
 * @param {Object} props.colorMap - Mapping of status to color classes
 */
const StatusBadge = ({ status, colorMap }) => {
    const defaultClasses = 'bg-gray-100 text-gray-800';

    return (
        <div className="flex items-center justify-center">
            <div
                className={`rounded-lg px-4 py-1 text-sm font-medium w-fit ${
                    colorMap[status] || defaultClasses
                }`}
            >
                {status}
            </div>
        </div>
    );
};

const PaidStatusBadge = ({ status }) => (
    <StatusBadge
        status={status}
        colorMap={{
            Paid: 'bg-green-100 text-green-800',
            Unpaid: 'bg-red-100 text-red-800',
        }}
    />
);

const StageBadge = ({ status }) => (
    <StatusBadge
        status={status}
        colorMap={{
            New: 'bg-blue-100 text-blue-800',
            Prepare: 'bg-yellow-100 text-yellow-800',
            Reject: 'bg-red-100 text-red-800',
            Shipping: 'bg-green-100 text-green-800',
            Shipped: 'bg-purple-100 text-purple-800',
        }}
    />
);

export { StatusBadge, PaidStatusBadge, StageBadge };
