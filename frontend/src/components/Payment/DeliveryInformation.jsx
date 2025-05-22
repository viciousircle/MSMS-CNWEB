import React from 'react';

const DeliveryInformation = ({ receiverInformation }) => (
    <div className="border-b pb-3">
        <h3 className="font-semibold text-gray-900">Delivery Information</h3>
        <p>
            <strong>Receiver:</strong> {receiverInformation.receiverName}
        </p>
        <p>
            <strong>Phone:</strong> {receiverInformation.receiverPhone}
        </p>
        <p>
            <strong>Address:</strong> {receiverInformation.receiverAddress}
        </p>
    </div>
);

export default DeliveryInformation;
