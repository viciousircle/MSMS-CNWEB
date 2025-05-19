import React from 'react';
import DatePicker from '@/components/Others/DatePicker';
import { ItemsPerPageSelector } from '@/components/Selectors/ItemsPerPageSelector';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export const AccountFilterControls = React.memo(
    ({
        accountsPerPage,
        onItemsPerPageChange,
        selectedDate,
        onDateChange,
        activeTab,
        onTabChange,
        onAddClick,
    }) => (
        <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex-1">
                <Button
                    onClick={onAddClick}
                    variant="default"
                    className={'text-sm'}
                >
                    Add Account
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Show</span>
                <ItemsPerPageSelector
                    value={accountsPerPage}
                    onChange={onItemsPerPageChange}
                />
            </div>

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
