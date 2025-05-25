import React, { useState } from 'react';
import { UsersIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderWithIcon } from '@/components/Structure/Header';
import Body from '@/components/Structure/Body';
import { AccountTable } from '@/components/Tables/AccountTable/AccountTable';
import { PaginationControls } from '@/components/Others/PaginationControls';
import { AccountFilterControls } from '@/components/Others/AccountFilterControls';
import { useAccountsLogic } from '@/hooks/admin/useAccountsLogic.hook';
import LoadingState from '@/components/States/LoadingState';
import ErrorState from '@/components/States/ErrorState';
import Footer from '@/components/Structure/Footer';
import { AddAccountDialog } from '@/components/Dialogs/AddAccountDialog';
import { containerVariants, itemVariants } from '@/utils/animationVariants';
import { api } from '/utils/api';

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

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newAccount, setNewAccount] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'seller',
    });
    const [formErrors, setFormErrors] = useState({});

    const handleAddClick = () => {
        setIsAddDialogOpen(true);
    };

    const handleAddAccount = async () => {
        try {
            await api('/users', {
                method: 'POST',
                body: JSON.stringify({
                    name: newAccount.name,
                    email: newAccount.email,
                    password: newAccount.password,
                    role: newAccount.role,
                }),
            });

            setIsAddDialogOpen(false);
            setNewAccount({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: 'seller',
            });
            setFormErrors({});

            window.location.reload();
        } catch (error) {
            console.error('Error adding account:', error);
            setFormErrors({
                submit:
                    error.message || 'Failed to add account. Please try again.',
            });
        }
    };

    const handleCloseDialog = () => {
        setIsAddDialogOpen(false);
        setNewAccount({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'seller',
        });
        setFormErrors({});
    };

    if (loading) {
        return <LoadingState icon={UsersIcon} title="Account Management" />;
    }

    if (error) {
        return (
            <div className="flex flex-col min-h-screen">
                <ErrorState
                    icon={UsersIcon}
                    title="Account Management"
                    error={error}
                />
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Body>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <HeaderWithIcon
                        icon={UsersIcon}
                        title="Account Management"
                    />
                </motion.div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-4 px-4 w-full"
                >
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-between items-center"
                    >
                        <div className="flex items-center gap-2"></div>
                        <AccountFilterControls
                            accountsPerPage={accountsPerPage}
                            onItemsPerPageChange={handleItemsPerPageChange}
                            selectedDate={selectedDate}
                            onDateChange={setSelectedDate}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            onAddClick={handleAddClick}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <AccountTable
                            accounts={paginatedAccounts}
                            onUpdate={updateAccount}
                            onDelete={deleteAccount}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <PaginationControls
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    </motion.div>

                    <AnimatePresence>
                        {isAddDialogOpen && (
                            <AddAccountDialog
                                isOpen={isAddDialogOpen}
                                onClose={handleCloseDialog}
                                onSubmit={handleAddAccount}
                                newAccount={newAccount}
                                setNewAccount={setNewAccount}
                                formErrors={formErrors}
                                setFormErrors={setFormErrors}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            </Body>
            <Footer />
        </div>
    );
};

export default ManageAccount;
