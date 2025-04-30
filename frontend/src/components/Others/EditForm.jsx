import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { useProvinces, useDistricts, useWards } from '@/hooks/useAddress.hook';
import { AddressSelector } from '../Selectors/AddressSelector';
import { PhoneInput } from './PhoneInput';

export const EditForm = ({
    editInfo,
    onInputChange,
    onAddressChange,
    onPhoneChange,
    onSubmit,
}) => {
    const [provinces] = useProvinces();
    const [districts] = useDistricts(editInfo.address.provinceCode);
    const [wards] = useWards(editInfo.address.districtCode);
    const [isFormValid, setIsFormValid] = useState(false);
    const [validationErrors, setValidationErrors] = useState({
        name: false,
        phone: false,
        address: {
            province: false,
            district: false,
            ward: false,
            number: false,
            street: false,
        },
    });

    // Validate form whenever editInfo changes
    useEffect(() => {
        const isValidName = editInfo.name.trim() !== '';
        const isValidPhone = editInfo.phone.trim() !== '';
        const isValidAddress =
            editInfo.address.provinceCode &&
            editInfo.address.districtCode &&
            editInfo.address.wardCode &&
            editInfo.address.number.trim() &&
            editInfo.address.street.trim();

        setIsFormValid(isValidName && isValidPhone && isValidAddress);

        setValidationErrors({
            name: !isValidName,
            phone: !isValidPhone,
            address: {
                province: !editInfo.address.provinceCode,
                district: !editInfo.address.districtCode,
                ward: !editInfo.address.wardCode,
                number: !editInfo.address.number.trim(),
                street: !editInfo.address.street.trim(),
            },
        });
    }, [editInfo.name, editInfo.phone, editInfo.address]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            // Optionally show more prominent validation messages here
            return;
        }
        onSubmit(e);
    };

    const handleProvinceChange = (provinceCode) => {
        const selectedProvince = provinces.find(
            (p) => p.code === parseInt(provinceCode)
        );
        updateAddressFields({
            province: selectedProvince?.name || '',
            provinceCode,
            district: '',
            districtCode: '',
            ward: '',
            wardCode: '',
        });
    };

    const handleDistrictChange = (districtCode) => {
        const selectedDistrict = districts.find(
            (d) => d.code === parseInt(districtCode)
        );
        updateAddressFields({
            district: selectedDistrict?.name || '',
            districtCode,
            ward: '',
            wardCode: '',
        });
    };

    const handleWardChange = (wardCode) => {
        const selectedWard = wards.find((w) => w.code === parseInt(wardCode));
        updateAddressFields({
            ward: selectedWard?.name || '',
            wardCode,
        });
    };

    const updateAddressFields = (updates) => {
        Object.entries(updates).forEach(([name, value]) => {
            onAddressChange({ target: { name, value } });
        });
    };

    const formFields = [
        {
            label: 'Receiver',
            name: 'name',
            component: (
                <div className="flex-1">
                    <Input
                        className={`flex-1 ${
                            validationErrors.name ? 'border-red-500' : ''
                        }`}
                        name="name"
                        value={editInfo.name}
                        onChange={onInputChange}
                        required
                    />
                    {validationErrors.name && (
                        <p className="text-red-500 text-xs mt-1">
                            Receiver name is required
                        </p>
                    )}
                </div>
            ),
        },
        {
            label: 'Phone',
            component: (
                <div className="flex-1">
                    <PhoneInput
                        value={editInfo.phone}
                        onChange={onPhoneChange}
                        className={
                            validationErrors.phone ? 'border-red-500' : ''
                        }
                        required
                    />
                    {validationErrors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                            Phone number is required
                        </p>
                    )}
                </div>
            ),
        },
        {
            label: 'Address',
            component: (
                <AddressSelector
                    address={editInfo.address}
                    provinces={provinces}
                    districts={districts}
                    wards={wards}
                    onProvinceChange={handleProvinceChange}
                    onDistrictChange={handleDistrictChange}
                    onWardChange={handleWardChange}
                    onAddressChange={onAddressChange}
                    requiredFields={{
                        province: true,
                        district: true,
                        ward: true,
                        number: true,
                        street: true,
                    }}
                    validationErrors={validationErrors.address}
                />
            ),
        },
    ];

    return (
        <form onSubmit={handleSubmit}>
            <DialogHeader>
                <DialogTitle>Edit information</DialogTitle>
                <div className="flex flex-col gap-4 mt-4">
                    {formFields.map((field, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 w-full"
                        >
                            <div className="min-w-[120px] text-left pr-4">
                                {field.label}
                            </div>
                            {field.component}
                        </div>
                    ))}
                </div>
                <DialogDescription className="my-4 text-right">
                    Make changes to receiver information. Click save when you're
                    done.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button type="submit" className="w-fit" disabled={!isFormValid}>
                    Save changes
                </Button>
            </DialogFooter>
        </form>
    );
};
