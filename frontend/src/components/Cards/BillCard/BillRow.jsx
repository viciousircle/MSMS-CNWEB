import React from 'react';

const BillRow = ({
    label,
    value,
    customValueClass = '',
    labelClass = 'py-1',
    containerClass = '',
}) => (
    <div className={`flex   border-gray-950/5 justify-end ${containerClass}`}>
        <div className={`border-r border-gray-950/5 px-8 w-full ${labelClass}`}>
            {label}
        </div>
        <div
            className={`border-gray-950/5 px-8 w-1/2 font-mono ${customValueClass} flex`}
        >
            {value}
        </div>
    </div>
);

export default BillRow;
