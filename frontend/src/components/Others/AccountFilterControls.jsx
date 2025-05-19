import React from 'react';
import DatePicker from '@/components/Others/DatePicker';
import { ItemsPerPageSelector } from '@/components/Selectors/ItemsPerPageSelector';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const AccountFilterControls = React.memo(
    ({
        accountsPerPage,
        onItemsPerPageChange,
        selectedDate,
        onDateChange,
        activeTab,
        onTabChange,
    }) => (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Show</span>
                <ItemsPerPageSelector
                    value={accountsPerPage}
                    onChange={onItemsPerPageChange}
                />
            </div>
            <DatePicker
                selectedDate={selectedDate}
                onDateChange={onDateChange}
            />
            <Tabs
                value={activeTab}
                onValueChange={onTabChange}
                className="w-[400px]"
            >
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="customer">Customer</TabsTrigger>
                    <TabsTrigger value="seller">Seller</TabsTrigger>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    )
);
