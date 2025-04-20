import React from 'react';
import DatePicker from '@/components/Others/DatePicker';
import { OrderTabsMenu } from '@/components/Others/OrderTabsMenu';
import { ItemsPerPageSelector } from '@/components/Selectors/ItemsPerPageSelector';

export const FilterControls = React.memo(
    ({ ordersPerPage, onItemsPerPageChange, selectedDate, onDateChange }) => (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Show</span>
                <ItemsPerPageSelector
                    value={ordersPerPage}
                    onChange={onItemsPerPageChange}
                />
            </div>
            <DatePicker
                selectedDate={selectedDate}
                onDateChange={onDateChange}
            />
            <OrderTabsMenu />
        </div>
    )
);
