const StatusBadge = ({ status, colorMap }) => {
    const defaultClasses = 'bg-gray-100 text-gray-600';

    return (
        <div className="flex items-center justify-center">
            <div
                className={`rounded-sm px-4 py-1 text-sm font-medium w-fit ${
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
            Paid: 'bg-green-100 text-green-600',
            Unpaid: 'bg-red-100 text-red-600',
        }}
    />
);

const StageBadge = ({ status }) => (
    <StatusBadge
        status={status}
        colorMap={{
            New: 'bg-blue-100 text-blue-600',
            Prepare: 'bg-yellow-100 text-yellow-600',
            Reject: 'bg-red-100 text-red-600',
            Shipping: 'bg-green-100 text-green-600',
            Shipped: 'bg-purple-100 text-purple-600',
        }}
    />
);

export { StatusBadge, PaidStatusBadge, StageBadge };
