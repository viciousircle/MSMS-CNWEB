import React from 'react';

const ORDER_STATUSES = [
    'All Orders',
    'New',
    'Prepare',
    'Shipping',
    'Shipped',
    'Canceled',
    'Rejected',
];

const StatusSelector = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex gap-2 border border-gray-200 rounded-xl bg-gray-50 p-1 w-fit">
            {ORDER_STATUSES.map((tab) => (
                <button
                    key={tab}
                    className={`px-4 py-2 font-medium rounded-lg transition-colors duration-300 text-sm ${
                        activeTab === tab
                            ? 'bg-white text-gray-900 border border-gray-200'
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default StatusSelector;
