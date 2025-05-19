import React from 'react';
import { UsersIcon } from '@heroicons/react/24/outline';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { HeaderWithIcon } from '@/components/Structure/Header';
import Body from '@/components/Structure/Body';
import { AccountTable } from '@/components/Tables/AccountTable/AccountTable';
import { PaginationControls } from '@/components/Others/PaginationControls';
import { AccountFilterControls } from '@/components/Others/AccountFilterControls';
import { useAccountsLogic } from '@/hooks/admin/useAccountsLogic.hook';

const ManageAccount = () => {
    const {
        currentPage,
        accountsPerPage,
        activeTab,
        selectedDate,
        paginatedAccounts,
        totalPages,
        loading,
        error,
        setCurrentPage,
        setActiveTab,
        setSelectedDate,
        updateAccount,
        deleteAccount,
        handleItemsPerPageChange,
    } = useAccountsLogic();

    if (loading) {
        return <div>Loading accounts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Body>
            <HeaderWithIcon icon={UsersIcon} title="Account Management" />
            <div className="flex flex-col gap-4 px-4 w-full">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2"></div>
                    <AccountFilterControls
                        accountsPerPage={accountsPerPage}
                        onItemsPerPageChange={handleItemsPerPageChange}
                        selectedDate={selectedDate}
                        onDateChange={setSelectedDate}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                </div>

                <AccountTable
                    accounts={paginatedAccounts}
                    onUpdate={updateAccount}
                    onDelete={deleteAccount}
                />

                <PaginationControls
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </Body>
    );
};

export default ManageAccount;
