import React, { useState } from 'react';
import { PrinterIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { api } from '/utils/api';
import { formatPrice } from '/utils/formatPrice';

function formatDisplayId(id, prefix = 'ORD-') {
    if (!id) return '';
    return `${prefix}${id.slice(-6).toUpperCase()}`;
}

function generateShippingLabelHTML(order) {
    const customer = order.customerInfo || {};
    const receiver = order.receiverInfo || {};
    const items = order.orderItems || [];
    const summary = order.orderSummary || {};
    const SHIPPING_COST = 30000; // Fixed shipping cost
    const itemsTotal = items.reduce(
        (sum, item) => sum + (item.itemPrice || 0) * (item.itemQuantity || 0),
        0
    );
    const total = itemsTotal + SHIPPING_COST;
    const paymentStatus = summary.isPaid ? 'Paid' : 'Unpaid';
    const stage = summary.currentStage || '';
    return `
        <div style="padding: 2rem; max-width: 800px; margin: auto; font-family: Arial, sans-serif;">
            <div style="border: 2px solid #000; padding: 1.5rem;">
                <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 1.5rem;">VICIOUS STORE</h2>
                <div style="margin-bottom: 1.2rem;">
                    <strong>Order ID:</strong> ${formatDisplayId(
                        order.orderId
                    )}<br/>
                    <strong>Date:</strong> ${summary.orderDate || ''}
                </div>
                <div style="margin-bottom: 1.2rem;">
                    <strong>Customer Name:</strong> ${customer.name || ''}<br/>
                    <strong>Customer Email:</strong> ${customer.email || ''}
                </div>
                <div style="margin-bottom: 1.2rem;">
                    <strong>Receiver Name:</strong> ${receiver.name || ''}<br/>
                    <strong>Phone:</strong> ${receiver.phone || ''}<br/>
                    <strong>Address:</strong> ${receiver.address || ''}
                </div>
                ${
                    items.length > 0
                        ? `
                <div style="margin-bottom: 1.2rem;">
                    <strong>Order Items:</strong>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 0.5rem;">
                        <thead>
                            <tr>
                                <th style="border-bottom: 1px solid #ccc; text-align: left;">Product</th>
                                <th style="border-bottom: 1px solid #ccc; text-align: left;">Color</th>
                                <th style="border-bottom: 1px solid #ccc; text-align: right;">Qty</th>
                                <th style="border-bottom: 1px solid #ccc; text-align: right;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items
                                .map(
                                    (item) => `
                                <tr>
                                    <td>${item.itemName || ''}</td>
                                    <td>${item.itemColor || ''}</td>
                                    <td style="text-align: right;">${
                                        item.itemQuantity || 0
                                    }</td>
                                    <td style="text-align: right;">${formatPrice(
                                        item.itemPrice || 0
                                    )} VND</td>
                                </tr>
                            `
                                )
                                .join('')}
                        </tbody>
                    </table>
                </div>
                `
                        : ''
                }
                <div style="margin-bottom: 1.2rem;">
                    <strong>Payment Method:</strong> ${
                        summary.paymentMethod || ''
                    }<br/>
                    <strong>Payment Status:</strong> ${paymentStatus}<br/>
                    <strong>Items Total:</strong> ${formatPrice(
                        itemsTotal
                    )} VND<br/>
                    <strong>Shipping Cost:</strong> ${formatPrice(
                        SHIPPING_COST
                    )} VND<br/>
                </div>
                <div style="margin-bottom: 0.5rem; text-align: right; font-weight: bold; font-size: 1.2rem;">
                    Total: ${formatPrice(total)} VND
                </div>
            </div>
        </div>
    `;
}

const PrintButton = ({ selectedOrders = [] }) => {
    const [loading, setLoading] = useState(false);

    const handlePrint = async () => {
        const validOrders = selectedOrders.filter(Boolean);
        if (validOrders.length === 0) {
            toast.error('Please select at least one order to print labels');
            return;
        }
        setLoading(true);
        try {
            // Fetch full details for each order using the seller endpoint
            const details = await Promise.all(
                validOrders.map(async (order) => {
                    try {
                        const detail = await api(`/seller/orders/${order._id}`);
                        console.log('Fetched order detail:', detail);
                        return detail || order;
                    } catch (e) {
                        console.log('Failed to fetch detail for', order._id, e);
                        return order;
                    }
                })
            );
            console.log('All details for printing:', details);
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Shipping Labels</title>
                        <style>
                            @media print {
                                body { margin: 0; }
                                .page-break { page-break-after: always; }
                            }
                            body { font-family: Arial, sans-serif; }
                            th, td { padding: 0.3rem 0.5rem; }
                        </style>
                    </head>
                    <body>
                        ${details
                            .map(
                                (order, index) => `
                                <div class="${
                                    index < details.length - 1
                                        ? 'page-break'
                                        : ''
                                }">
                                    ${generateShippingLabelHTML(order)}
                                </div>
                            `
                            )
                            .join('')}
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.onload = () => {
                printWindow.print();
                printWindow.close();
            };
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="destructive"
            onClick={handlePrint}
            disabled={selectedOrders.length === 0 || loading}
        >
            <PrinterIcon className="w-4 h-4" />
            {loading
                ? 'Preparing...'
                : `Print Label${selectedOrders.length > 1 ? 's' : ''}`}
        </Button>
    );
};

export default PrintButton;
