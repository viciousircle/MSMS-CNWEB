import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

export const OrderTabsMenu = () => {
    return (
        <TabsList>
            <TabsTrigger value="all" className="flex gap-2">
                All
            </TabsTrigger>
            <TabsTrigger value="new" className="flex gap-2">
                New
            </TabsTrigger>
            <TabsTrigger value="preparing">Prepare</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="Rated">Rated</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
        </TabsList>
    );
};
