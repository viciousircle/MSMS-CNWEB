import React from 'react';
import { formatPrice } from '/utils/formatPrice';

const VietQR = ({ amount, orderId, bankInfo }) => {
    // Generate VietQR URL using VietQR.io's Quicklink API
    const generateVietQRUrl = () => {
        // Format: https://img.vietqr.io/image/{bankCode}-{accountNumber}-{template}.jpg?amount={amount}
        // amount should be in VND without any formatting
        const formattedAmount = amount.toString().replace(/\./g, '');
        return `https://img.vietqr.io/image/${bankInfo.bankCode}-${bankInfo.accountNumber}-compact.jpg?amount=${formattedAmount}`;
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">VietQR Payment</h3>

            <div className="p-4 bg-white rounded-lg border">
                <img
                    src={generateVietQRUrl()}
                    alt="VietQR Payment Code"
                    className="w-[200px] h-[200px]"
                />
            </div>

            <div className="text-center space-y-2">
                <p className="font-medium">Amount: {formatPrice(amount)} VND</p>
                <p className="text-sm text-gray-600">Order ID: {orderId}</p>
                <p className="text-sm text-gray-600">
                    Bank: {bankInfo.bankName}
                </p>
                <p className="text-sm text-gray-600">
                    Account: {bankInfo.accountNumber}
                </p>
                <p className="text-sm text-gray-600">
                    Account Name: {bankInfo.accountName}
                </p>
            </div>

            <div className="text-sm text-gray-500 mt-4">
                <p>
                    Please scan the QR code with your banking app to complete
                    the payment.
                </p>
                <p>Your order will be processed after payment confirmation.</p>
            </div>
        </div>
    );
};

export default VietQR;
