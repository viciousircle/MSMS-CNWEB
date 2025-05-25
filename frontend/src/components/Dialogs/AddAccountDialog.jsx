import React from 'react';
import { motion } from 'framer-motion';
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
import { validateAccountForm } from '@/utils/accountValidation';

const dialogVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.2,
            ease: 'easeIn',
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export const AddAccountDialog = ({
    isOpen,
    onClose,
    onSubmit,
    newAccount,
    setNewAccount,
    formErrors,
    setFormErrors,
}) => {
    const handleSubmit = async () => {
        const errors = validateAccountForm(newAccount);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        await onSubmit();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <motion.div
                    variants={dialogVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            Add New Account
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <motion.div
                            variants={itemVariants}
                            className="grid gap-2"
                        >
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
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-red-500"
                                >
                                    {formErrors.name}
                                </motion.p>
                            )}
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="grid gap-2"
                        >
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
                                placeholder="Enter email"
                            />
                            {formErrors.email && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-red-500"
                                >
                                    {formErrors.email}
                                </motion.p>
                            )}
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="grid gap-2"
                        >
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
                                    formErrors.password ? 'border-red-500' : ''
                                }
                                placeholder="Enter password"
                            />
                            {formErrors.password && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-red-500"
                                >
                                    {formErrors.password}
                                </motion.p>
                            )}
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="grid gap-2"
                        >
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
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-red-500"
                                >
                                    {formErrors.confirmPassword}
                                </motion.p>
                            )}
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="grid gap-2"
                        >
                            <Label
                                htmlFor="role"
                                className="text-sm font-medium"
                            >
                                Role
                            </Label>
                            <Select
                                value={newAccount.role}
                                onValueChange={(value) =>
                                    setNewAccount({
                                        ...newAccount,
                                        role: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="seller">
                                        Seller
                                    </SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </motion.div>
                    </div>
                    <DialogFooter>
                        <motion.div
                            className="flex flex-col gap-2 w-full"
                            variants={itemVariants}
                        >
                            {formErrors.submit && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-red-500 text-center"
                                >
                                    {formErrors.submit}
                                </motion.p>
                            )}
                            <div className="flex gap-2 justify-end">
                                <Button variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit}>
                                    Add Account
                                </Button>
                            </div>
                        </motion.div>
                    </DialogFooter>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};
