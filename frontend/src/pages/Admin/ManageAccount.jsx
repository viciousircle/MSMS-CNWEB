import React, { useState } from 'react';
import { UsersIcon } from '@heroicons/react/24/outline';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { HeaderWithIcon } from '@/components/Structure/Header';
import Body from '@/components/Structure/Body';
import { AccountTable } from '@/components/Tables/AccountTable/AccountTable';
import { PaginationControls } from '@/components/Others/PaginationControls';
import { AccountFilterControls } from '@/components/Others/AccountFilterControls';
import { useAccountsLogic } from '@/hooks/admin/useAccountsLogic.hook';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

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

    const validateForm = () => {
        const errors = {};
        if (!newAccount.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!newAccount.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(newAccount.email)) {
            errors.email = 'Invalid email format';
        }
        if (!newAccount.password) {
            errors.password = 'Password is required';
        } else if (newAccount.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        if (newAccount.password !== newAccount.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
    };

    const handleAddClick = () => {
        setIsAddDialogOpen(true);
    };

    const handleAddAccount = async () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newAccount.name,
                    email: newAccount.email,
                    password: newAccount.password,
                    role: newAccount.role,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add account');
            }

            // Close dialog and reset form
            setIsAddDialogOpen(false);
            setNewAccount({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: 'seller',
            });
            setFormErrors({});

            // Refresh the accounts list
            // You might want to add a refresh function to your useAccountsLogic hook
            window.location.reload(); // Temporary solution - replace with proper refresh logic
        } catch (error) {
            setFormErrors({
                submit: error.message || 'Failed to add account',
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

    console.log('paginatedAccounts', paginatedAccounts);

    if (loading) {
        return (
            <Body>
                <HeaderWithIcon icon={UsersIcon} title="Account Management" />
                <div className="flex justify-center items-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </Body>
        );
    }

    if (error) {
        return (
            <Body>
                <HeaderWithIcon icon={UsersIcon} title="Account Management" />
                <div className="p-4 text-center">
                    <p className="text-red-500 mb-2 bg-red-100 flex items-center justify-center px-4 py-2 rounded-lg w-fit text-center">
                        Error: {error}
                    </p>
                    <button
                        className="text-blue-500 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </Body>
        );
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
                        onAddClick={handleAddClick}
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

                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-semibold">
                                Add New Account
                            </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="name"
                                    className="text-sm font-medium"
                                >
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newAccount.name}
                                    onChange={(e) => {
                                        setNewAccount({
                                            ...newAccount,
                                            name: e.target.value,
                                        });
                                        if (formErrors.name) {
                                            setFormErrors({
                                                ...formErrors,
                                                name: '',
                                            });
                                        }
                                    }}
                                    className={
                                        formErrors.name ? 'border-red-500' : ''
                                    }
                                    placeholder="Enter full name"
                                />
                                {formErrors.name && (
                                    <p className="text-sm text-red-500">
                                        {formErrors.name}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium"
                                >
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={newAccount.email}
                                    onChange={(e) => {
                                        setNewAccount({
                                            ...newAccount,
                                            email: e.target.value,
                                        });
                                        if (formErrors.email) {
                                            setFormErrors({
                                                ...formErrors,
                                                email: '',
                                            });
                                        }
                                    }}
                                    className={
                                        formErrors.email ? 'border-red-500' : ''
                                    }
                                    placeholder="Enter email address"
                                />
                                {formErrors.email && (
                                    <p className="text-sm text-red-500">
                                        {formErrors.email}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium"
                                >
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={newAccount.password}
                                    onChange={(e) => {
                                        setNewAccount({
                                            ...newAccount,
                                            password: e.target.value,
                                        });
                                        if (formErrors.password) {
                                            setFormErrors({
                                                ...formErrors,
                                                password: '',
                                            });
                                        }
                                    }}
                                    className={
                                        formErrors.password
                                            ? 'border-red-500'
                                            : ''
                                    }
                                    placeholder="Enter password"
                                />
                                {formErrors.password && (
                                    <p className="text-sm text-red-500">
                                        {formErrors.password}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="confirmPassword"
                                    className="text-sm font-medium"
                                >
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={newAccount.confirmPassword}
                                    onChange={(e) => {
                                        setNewAccount({
                                            ...newAccount,
                                            confirmPassword: e.target.value,
                                        });
                                        if (formErrors.confirmPassword) {
                                            setFormErrors({
                                                ...formErrors,
                                                confirmPassword: '',
                                            });
                                        }
                                    }}
                                    className={
                                        formErrors.confirmPassword
                                            ? 'border-red-500'
                                            : ''
                                    }
                                    placeholder="Confirm password"
                                />
                                {formErrors.confirmPassword && (
                                    <p className="text-sm text-red-500">
                                        {formErrors.confirmPassword}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="role"
                                    className="text-sm font-medium"
                                >
                                    Role
                                </Label>
                                <Tabs
                                    value={newAccount.role}
                                    onValueChange={(value) =>
                                        setNewAccount({
                                            ...newAccount,
                                            role: value,
                                        })
                                    }
                                    className="w-full"
                                >
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="seller">
                                            Seller
                                        </TabsTrigger>
                                        <TabsTrigger value="admin">
                                            Admin
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </div>
                        <DialogFooter className="gap-2">
                            <Button
                                variant="outline"
                                onClick={handleCloseDialog}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleAddAccount}
                                className="bg-primary hover:bg-primary/90"
                            >
                                Add Account
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </Body>
    );
};

export default ManageAccount;
