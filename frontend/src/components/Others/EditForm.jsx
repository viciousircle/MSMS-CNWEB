import React from 'react';
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
                <Input
                    className="flex-1"
                    name="name"
                    value={editInfo.name}
                    onChange={onInputChange}
                />
            ),
        },
        {
            label: 'Phone',
            component: (
                <PhoneInput value={editInfo.phone} onChange={onPhoneChange} />
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
                />
            ),
        },
    ];

    return (
        <form onSubmit={onSubmit}>
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
                            <div className={field.name ? 'flex-1' : 'flex-1'}>
                                {field.component}
                            </div>
                        </div>
                    ))}
                </div>
                <DialogDescription className="my-4 text-right">
                    Make changes to receiver information. Click save when you're
                    done.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button type="submit" className="w-fit">
                    Save changes
                </Button>
            </DialogFooter>
        </form>
    );
};
