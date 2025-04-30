import React from 'react';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const AddressSelect = ({
    value,
    options,
    placeholder,
    onChange,
    disabled,
    className = 'w-full',
    required = false,
    error = false,
}) => (
    <Select
        value={value || ''}
        onValueChange={onChange}
        disabled={disabled}
        required={required}
    >
        <SelectTrigger
            className={`border shadow-xs rounded-md text-sm whitespace-nowrap py-2 ${className} ${
                error ? 'border-red-500' : ''
            }`}
        >
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="whitespace-nowrap">
            {options.map(({ code, name }) => (
                <SelectItem
                    key={code}
                    value={code.toString()}
                    className="whitespace-nowrap"
                >
                    {name}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

const AddressInput = ({
    name,
    value,
    onChange,
    placeholder,
    required = false,
    error = false,
}) => (
    <Input
        placeholder={placeholder}
        className={`w-full ${error ? 'border-red-500' : ''}`}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
    />
);

export const AddressSelector = ({
    address: { provinceCode, districtCode, wardCode, number, street },
    provinces,
    districts,
    wards,
    onProvinceChange,
    onDistrictChange,
    onWardChange,
    onAddressChange,
    requiredFields = {
        province: false,
        district: false,
        ward: false,
        number: false,
        street: false,
    },
    validationErrors = {
        province: false,
        district: false,
        ward: false,
        number: false,
        street: false,
    },
}) => (
    <div className="gap-2 flex-1 flex flex-col">
        <div className="flex gap-2">
            <div className="flex-1">
                <AddressInput
                    name="number"
                    value={number}
                    onChange={onAddressChange}
                    placeholder="Số nhà"
                    required={requiredFields.number}
                    error={validationErrors.number}
                />
                {validationErrors.number && (
                    <p className="text-red-500 text-xs mt-1">
                        House number is required
                    </p>
                )}
            </div>
            <div className="flex-1">
                <AddressInput
                    name="street"
                    value={street}
                    onChange={onAddressChange}
                    placeholder="Phố"
                    required={requiredFields.street}
                    error={validationErrors.street}
                />
                {validationErrors.street && (
                    <p className="text-red-500 text-xs mt-1">
                        Street is required
                    </p>
                )}
            </div>
        </div>
        <div className="flex gap-2">
            <div className="flex-1">
                <AddressSelect
                    value={provinceCode}
                    options={provinces}
                    placeholder="Tỉnh"
                    onChange={onProvinceChange}
                    required={requiredFields.province}
                    error={validationErrors.province}
                />
                {validationErrors.province && (
                    <p className="text-red-500 text-xs mt-1">
                        Province is required
                    </p>
                )}
            </div>
            <div className="flex-1">
                <AddressSelect
                    value={districtCode}
                    options={districts}
                    placeholder="Huyện"
                    onChange={onDistrictChange}
                    disabled={!provinceCode}
                    required={requiredFields.district}
                    error={validationErrors.district}
                />
                {validationErrors.district && (
                    <p className="text-red-500 text-xs mt-1">
                        District is required
                    </p>
                )}
            </div>
            <div className="flex-1">
                <AddressSelect
                    value={wardCode}
                    options={wards}
                    placeholder="Phường"
                    onChange={onWardChange}
                    disabled={!districtCode}
                    required={requiredFields.ward}
                    error={validationErrors.ward}
                />
                {validationErrors.ward && (
                    <p className="text-red-500 text-xs mt-1">
                        Ward is required
                    </p>
                )}
            </div>
        </div>
    </div>
);
