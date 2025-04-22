import { useMemo, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { api } from '/utils/api';

const DEFAULT_ORDERS_PER_PAGE = 10;

export const useOrdersLogic = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(DEFAULT_ORDERS_PER_PAGE);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch orders from API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const data = await api('/seller/orders');
                setOrders(data.orders);
                setError(null);

                console.log('Fetched orders:', data.orders);
            } catch (err) {
                setError(err.message || 'Failed to fetch orders');
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const updateOrder = async (indexOnPage, updatedFields) => {
        const globalIndex = (currentPage - 1) * ordersPerPage + indexOnPage;
        const orderId = orders[globalIndex]._id;

        try {
            // Make API call to update the order
            const updatedOrder = await api(`/seller/orders/${orderId}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedFields),
            });

            // Update local state if API call succeeds
            setOrders((prev) => {
                const newOrders = [...prev];
                newOrders[globalIndex] = {
                    ...newOrders[globalIndex],
                    ...updatedOrder,
                };
                return newOrders;
            });
        } catch (err) {
            console.error('Error updating order:', err);
            throw err; // Re-throw to handle in the component if needed
        }
    };

    const filteredOrders = useMemo(() => {
        let result = [...orders];

        if (activeTab !== 'all') {
            result = result.filter(
                (order) =>
                    order.orderStage.toLowerCase() === activeTab.toLowerCase()
            );
        }
        if (selectedDate) {
            const selectedDateString = format(selectedDate, 'dd-MM-yyyy');
            result = result.filter((order) => {
                return order.dateOrder === selectedDateString;
            });
        }

        return result;
    }, [orders, activeTab, selectedDate]);

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * ordersPerPage;
        return filteredOrders.slice(start, start + ordersPerPage);
    }, [filteredOrders, currentPage, ordersPerPage]);

    const handleItemsPerPageChange = (value) => {
        setOrdersPerPage(Number(value));
        setCurrentPage(1);
    };

    return {
        currentPage,
        ordersPerPage,
        activeTab,
        selectedDate,
        paginatedOrders,
        totalPages,
        loading,
        error,
        setCurrentPage,
        setActiveTab,
        setSelectedDate,
        updateOrder,
        handleItemsPerPageChange,
    };
};
