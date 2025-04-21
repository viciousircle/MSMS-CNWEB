import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import mockOrders from '/public/mock/order.json';

const DEFAULT_ORDERS_PER_PAGE = 10;

export const useOrdersLogic = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(DEFAULT_ORDERS_PER_PAGE);
    const [orders, setOrders] = useState(mockOrders);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedDate, setSelectedDate] = useState(null);

    const updateOrder = (indexOnPage, updatedFields) => {
        const globalIndex = (currentPage - 1) * ordersPerPage + indexOnPage;
        setOrders((prev) => {
            const newOrders = [...prev];
            newOrders[globalIndex] = {
                ...newOrders[globalIndex],
                ...updatedFields,
            };
            return newOrders;
        });
    };

    const filteredOrders = useMemo(() => {
        let result = [...orders];

        if (activeTab !== 'all') {
            result = result.filter(
                (order) =>
                    order.stageOrder.toLowerCase() === activeTab.toLowerCase()
            );
        }
        if (selectedDate) {
            const selectedDateString = format(selectedDate, 'MM/dd/yyyy');
            result = result.filter((order) => {
                const orderDate = new Date(order.dateOrder);
                const orderDateString = format(orderDate, 'MM/dd/yyyy');
                return orderDateString === selectedDateString;
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
        setActiveTab,
        setSelectedDate,
        updateOrder,
        handleItemsPerPageChange,
    };
};
