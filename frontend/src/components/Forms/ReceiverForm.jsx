import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { validateReceiverInfo } from '@/utils/validation/receiver.validation';
import { toast } from 'sonner';

const errorVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
        opacity: 1,
        height: 'auto',
        transition: { duration: 0.2 },
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.2 },
    },
};

const ReceiverForm = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: {
            number: '',
            street: '',
            ward: '',
            district: '',
            province: '',
        },
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle phone input to only allow numbers
        if (name === 'phone') {
            // Only allow digits
            const numericValue = value.replace(/\D/g, '');
            // Limit to 10 digits
            const truncatedValue = numericValue.slice(0, 10);

            setFormData((prev) => ({
                ...prev,
                [name]: truncatedValue,
            }));

            // Clear error for phone field
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
            return;
        }

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        // Clear error for the field being changed
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setErrors((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: '',
                },
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const validation = validateReceiverInfo({
            ...formData,
            [name]: value,
        });

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            if (validation.errors[parent]?.[child]) {
                setErrors((prev) => ({
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]: validation.errors[parent][child],
                    },
                }));
            }
        } else if (validation.errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: validation.errors[name],
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const validation = validateReceiverInfo(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            const firstError = Object.values(validation.errors).find((error) =>
                typeof error === 'string' ? error : Object.values(error)[0]
            );
            toast.error(
                typeof firstError === 'string'
                    ? firstError
                    : Object.values(firstError)[0]
            );
            setIsSubmitting(false);
            return;
        }

        try {
            await onSubmit(formData);
        } catch (error) {
            toast.error(error.message || 'Failed to save receiver information');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Receiver Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={cn(
                            errors.name &&
                                'border-red-500 focus-visible:ring-red-500'
                        )}
                        placeholder="Enter receiver's name"
                    />
                    <AnimatePresence>
                        {errors.name && (
                            <motion.p
                                key="name-error"
                                className="text-red-500 text-sm overflow-hidden"
                                variants={errorVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {errors.name}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={cn(
                            errors.phone &&
                                'border-red-500 focus-visible:ring-red-500'
                        )}
                        placeholder="Enter 10-digit phone number"
                        required
                    />
                    <AnimatePresence>
                        {errors.phone && (
                            <motion.p
                                key="phone-error"
                                className="text-red-500 text-sm overflow-hidden"
                                variants={errorVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {errors.phone}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                <div className="grid gap-4">
                    <h3 className="font-medium">Address Information</h3>

                    <div className="grid gap-2">
                        <Label htmlFor="address.number">
                            House/Street Number
                        </Label>
                        <Input
                            id="address.number"
                            name="address.number"
                            value={formData.address.number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={cn(
                                errors.address?.number &&
                                    'border-red-500 focus-visible:ring-red-500'
                            )}
                            placeholder="Enter house/street number"
                        />
                        <AnimatePresence>
                            {errors.address?.number && (
                                <motion.p
                                    key="address-number-error"
                                    className="text-red-500 text-sm overflow-hidden"
                                    variants={errorVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {errors.address.number}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="address.street">Street Name</Label>
                        <Input
                            id="address.street"
                            name="address.street"
                            value={formData.address.street}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={cn(
                                errors.address?.street &&
                                    'border-red-500 focus-visible:ring-red-500'
                            )}
                            placeholder="Enter street name"
                        />
                        <AnimatePresence>
                            {errors.address?.street && (
                                <motion.p
                                    key="address-street-error"
                                    className="text-red-500 text-sm overflow-hidden"
                                    variants={errorVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {errors.address.street}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="address.ward">Ward</Label>
                        <Input
                            id="address.ward"
                            name="address.ward"
                            value={formData.address.ward}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={cn(
                                errors.address?.ward &&
                                    'border-red-500 focus-visible:ring-red-500'
                            )}
                            placeholder="Enter ward"
                        />
                        <AnimatePresence>
                            {errors.address?.ward && (
                                <motion.p
                                    key="address-ward-error"
                                    className="text-red-500 text-sm overflow-hidden"
                                    variants={errorVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {errors.address.ward}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="address.district">District</Label>
                        <Input
                            id="address.district"
                            name="address.district"
                            value={formData.address.district}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={cn(
                                errors.address?.district &&
                                    'border-red-500 focus-visible:ring-red-500'
                            )}
                            placeholder="Enter district"
                        />
                        <AnimatePresence>
                            {errors.address?.district && (
                                <motion.p
                                    key="address-district-error"
                                    className="text-red-500 text-sm overflow-hidden"
                                    variants={errorVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {errors.address.district}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="address.province">Province</Label>
                        <Input
                            id="address.province"
                            name="address.province"
                            value={formData.address.province}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={cn(
                                errors.address?.province &&
                                    'border-red-500 focus-visible:ring-red-500'
                            )}
                            placeholder="Enter province"
                        />
                        <AnimatePresence>
                            {errors.address?.province && (
                                <motion.p
                                    key="address-province-error"
                                    className="text-red-500 text-sm overflow-hidden"
                                    variants={errorVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {errors.address.province}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Information'}
                </Button>
            </div>
        </form>
    );
};

export default ReceiverForm;
